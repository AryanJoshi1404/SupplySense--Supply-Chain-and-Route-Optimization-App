from flask import Flask, request, jsonify
from services.osrm_client import get_coordinates_from_location, get_route
from models.route_optimizer import get_best_route
from flask_cors import CORS  

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}) 

@app.route('/optimize', methods=['POST'])
def optimize():
    data = request.json
    start = data.get('start')
    end = data.get('end')
    fuel_type = data.get('fuel_type', 'petrol')

    if not start or not end:
        return jsonify({'error': 'Start and end locations required'}), 400

    # Example config — you can make this dynamic too
    FUEL_PRICES = {'petrol': 105.0, 'diesel': 95.0}
    MILEAGE = 15.0  # in km/l
    WEIGHTS = {'fuel': 0.4, 'time': 0.45, 'spoilage': 0.15}

    try:
        start_coords = get_coordinates_from_location(start)
        end_coords = get_coordinates_from_location(end)
        routes = get_route(start_coords, end_coords)
        print(f"Total routes fetched: {len(routes)}")


        fuel_price = FUEL_PRICES.get(fuel_type, 105.0)

        best_index, best_route, fuel_cost, toll_cost, total_cost = get_best_route(
            routes, fuel_price, MILEAGE, WEIGHTS
        )

        best_route_km = best_route.copy()
        best_route_km['distance_km'] = round(best_route['distance'] / 1000, 2)
        best_route_km['duration_hr'] = round(best_route['duration'] / 3600, 2)

        return jsonify({
            "start": start,
            "end": end,
            "best_route": best_route_km,
            "fuel_cost": round(fuel_cost, 2),
            "toll_cost": round(toll_cost, 2),
            "total_cost": round(total_cost, 2)
        })

    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
