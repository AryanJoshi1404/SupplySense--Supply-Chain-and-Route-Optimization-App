from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import psycopg2
from psycopg2.extras import RealDictCursor
import json
from datetime import datetime, timedelta
import os
from typing import List, Tuple, Dict, Any
import re

app = Flask(__name__)
CORS(app)

# Database configuration - Update these with your actual database credentials
DB_CONFIG = {
    'host': os.getenv('DB_HOST'),
    'database': os.getenv('DB_NAME'),
    'user': os.getenv('DB_USER'),
    'password': os.getenv('DB_PASS'),
    'port': int(os.getenv('DB_PORT', 5432))
}

class RecommendationEngine:
    def __init__(self, csv_path: str):
        """Initialize the recommendation engine with event-product mapping."""
        self.calendar_df = pd.read_csv(csv_path)
        self._preprocess_data()
    
    def _preprocess_data(self):
        """Preprocess dates and parse product lists."""
        self.calendar_df["start_date"] = pd.to_datetime(self.calendar_df["start_date"])
        self.calendar_df["end_date"] = pd.to_datetime(self.calendar_df["end_date"])
        self.calendar_df["products"] = self.calendar_df["products"].apply(eval)
    
    def recommend_items_for_date(self, input_date_str: str, lookahead_days: int = 30, top_n: int = 20) -> List[Tuple[str, float]]:
        """
        Recommends top items to store based on input date by evaluating upcoming events.
        
        Args:
            input_date_str (str): The input date in 'YYYY-MM-DD' format.
            lookahead_days (int): How far ahead to check for events (default: 30 days).
            top_n (int): Number of top products to return (default: 20).
        
        Returns:
            List of (product, score) tuples sorted by score descending.
        """
        input_date = datetime.strptime(input_date_str, "%Y-%m-%d")
        future_date = input_date + timedelta(days=lookahead_days)

        # Filter events overlapping with the lookahead window
        active_events = self.calendar_df[
            (self.calendar_df["start_date"] <= future_date) & 
            (self.calendar_df["end_date"] >= input_date)
        ].copy()

        if active_events.empty:
            return []

        # Calculate dynamic weights based on proximity
        dynamic_weights = []
        for _, row in active_events.iterrows():
            start_diff = max((row["start_date"] - input_date).days, 0)
            proximity_factor = max(0.0, 1.0 - (start_diff / lookahead_days))
            dynamic_weight = round(row["weight"] * proximity_factor, 4)
            dynamic_weights.append(dynamic_weight)

        # Normalize weights to sum to 1
        total_weight = sum(dynamic_weights)
        if total_weight == 0:
            return []
        
        active_events["adjusted_weight"] = [w / total_weight for w in dynamic_weights]

        # Aggregate product scores
        product_scores = {}
        for _, row in active_events.iterrows():
            for product in row["products"]:
                product_scores[product] = product_scores.get(product, 0) + row["adjusted_weight"]

        # Sort and return top products
        recommended_products = sorted(product_scores.items(), key=lambda x: x[1], reverse=True)
        return recommended_products[:top_n]

class DatabaseManager:
    def __init__(self, db_config: Dict[str, Any]):
        """Initialize database connection."""
        self.db_config = db_config
    
    def get_connection(self):
        """Get database connection."""
        return psycopg2.connect(**self.db_config)
    
    def get_product_images(self, product_names: List[str]) -> Dict[str, str]:
        """
        Get product images from database.
        
        Args:
            product_names (List[str]): List of product names
            
        Returns:
            Dict[str, str]: Dictionary mapping product names to image URLs
        """
        try:
            conn = self.get_connection()
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            # Create placeholder string for SQL IN clause
            placeholders = ','.join(['%s'] * len(product_names))
            query = f"""
                SELECT item_name, image_url 
                FROM item_images 
                WHERE item_name = ANY(%s)
            """
            
            cursor.execute(query, (product_names,))
            results = cursor.fetchall()
            
            # Convert to dictionary
            product_images = {}
            for row in results:
                product_images[row['item_name']] = row['image_url']
            
            cursor.close()
            conn.close()
            
            return product_images
            
        except Exception as e:
            print(f"Database error: {e}")
            return {}

# Initialize components
recommendation_engine = RecommendationEngine("india_2025_event_product_weights_updated.csv")
db_manager = DatabaseManager(DB_CONFIG)

def determine_category_from_name(product_name: str) -> str:
    """Determine product category based on product name patterns."""
    name_lower = product_name.lower()
    
    # Define category keywords
    category_keywords = {
        'Staples': ['rice', 'wheat', 'flour', 'pasta', 'bread', 'cereals', 'oats', 'quinoa'],
        'Dairy': ['milk', 'cheese', 'yogurt', 'butter', 'cream'],
        'Protein': ['eggs', 'chicken', 'fish', 'meat', 'protein', 'beans', 'lentils'],
        'Oils & Fats': ['oil', 'ghee', 'butter', 'coconut oil', 'olive oil'],
        'Spices & Seasonings': ['salt', 'pepper', 'spices', 'herbs', 'masala', 'turmeric'],
        'Beverages': ['tea', 'coffee', 'juice', 'water', 'milk', 'kombucha', 'matcha'],
        'Fruits': ['apple', 'banana', 'orange', 'fruits', 'berries', 'mango'],
        'Vegetables': ['vegetables', 'onion', 'potato', 'tomato', 'carrot', 'spinach'],
        'Sweets & Snacks': ['sugar', 'honey', 'chocolate', 'snacks', 'biscuits', 'cookies'],
        'Health & Wellness': ['supplements', 'vitamins', 'immunity', 'probiotic', 'organic'],
        'Hygiene': ['soap', 'shampoo', 'toothpaste', 'sanitizer', 'tissue', 'toilet paper'],
        'Kitchen': ['utensils', 'containers', 'bottles', 'accessories', 'cookware']
    }
    
    # Check for matches using word boundaries
    for category, keywords in category_keywords.items():
        for keyword in keywords:
            if re.search(r'\b' + re.escape(keyword) + r'\b', name_lower):
                return category
    
    return 'General'

def convert_score_to_demand(score: float) -> str:
    """Convert ML model score to demand level."""
    if score >= 0.5:
        return "High"
    elif score >= 0.3:
        return "Medium"
    else:
        return "Low"

# def get_trending_status(score: float) -> str:
#     """Determine if item is trending based on score."""
#     return "Rising" if score >= 0.5 else "Stable"

@app.route('/api/recommendations', methods=['GET'])
def get_recommendations():
    """Get product recommendations for current date."""
    try:
        # Get current date automatically
        current_date = datetime.now().strftime("%Y-%m-%d")
        
        # Allow override via query parameter for testing
        date_param = request.args.get('date')
        if date_param:
            current_date = date_param
        
        # Get recommendations from ML model
        recommendations = recommendation_engine.recommend_items_for_date(current_date)
        
        if not recommendations:
            return jsonify({
                'status': 'success',
                'data': {
                    'essentials': [],
                    'trends': [],
                    'date': current_date,
                    'message': 'No recommendations found for this date'
                }
            })
        
        # Extract product names
        product_names = [item[0] for item in recommendations]
        
        # Get product images from database
        product_images = db_manager.get_product_images(product_names)
        
        # Process recommendations
        essentials = []
        trends = []
        
        for i, (product_name, score) in enumerate(recommendations):
            # Get image from database
            image_url = product_images.get(product_name, 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&h=300&fit=crop&auto=format')
            
            # Convert score to demand level
            demand = convert_score_to_demand(score)
            
            # Determine category based on product name patterns
            category = determine_category_from_name(product_name)
            
            product_data = {
                'id': str(i + 1),
                'name': product_name,
                'category': category,
                'demand': demand,
                'score': round(score, 3),
                'image': image_url
            }
            
            # Put everything into essentials
            essentials.append(product_data)

            # Leave trends empty
            trends = []

        
        return jsonify({
            'status': 'success',
            'data': {
                'essentials': essentials,
                'trends': trends,
                'date': current_date,
                'total_recommendations': len(recommendations)
            }
        })
        
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/recommendations/<date>', methods=['GET'])
def get_recommendations_for_date(date):
    """Get product recommendations for a specific date."""
    try:
        # Validate date format
        datetime.strptime(date, "%Y-%m-%d")
        
        # Get recommendations from ML model
        recommendations = recommendation_engine.recommend_items_for_date(date)
        
        if not recommendations:
            return jsonify({
                'status': 'success',
                'data': {
                    'essentials': [],
                    'trends': [],
                    'date': date,
                    'message': 'No recommendations found for this date'
                }
            })
        
        # Extract product names
        product_names = [item[0] for item in recommendations]
        
        # Get product images from database
        product_images = db_manager.get_product_images(product_names)
        
        # Process recommendations
        essentials = []
        trends = []
        
        for i, (product_name, score) in enumerate(recommendations):
            # Get image from database
            image_url = product_images.get(product_name, 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=400&h=300&fit=crop&auto=format')
            
            # Convert score to demand level
            demand = convert_score_to_demand(score)
            
            # Determine category based on product name patterns
            category = determine_category_from_name(product_name)
            
            product_data = {
                'id': str(i + 1),
                'name': product_name,
                'category': category,
                'demand': demand,
                'score': round(score, 3),
                'image': image_url
            }
            
            # Split into essentials and trends based on score
            # Put everything into essentials
            essentials.append(product_data)

            # Leave trends empty
            trends = []

        
        return jsonify({
            'status': 'success',
            'data': {
                'essentials': essentials,
                'trends': trends,
                'date': date,
                'total_recommendations': len(recommendations)
            }
        })
        
    except ValueError:
        return jsonify({
            'status': 'error',
            'message': 'Invalid date format. Use YYYY-MM-DD'
        }), 400
    except Exception as e:
        return jsonify({
            'status': 'error',
            'message': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.now().isoformat(),
        'service': 'Recommendation API'
    })

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)