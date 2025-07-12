from typing import List, Dict, Tuple

def estimate_fuel_cost(distance_meters: float, fuel_price: float, mileage_kmpl: float) -> float:
    """
    Estimate fuel cost using distance and mileage.
    """
    km = distance_meters / 1000
    liters_needed = km / mileage_kmpl
    return liters_needed * fuel_price


def estimate_spoilage_risk(duration_seconds: float) -> float:
    """
    Assign a spoilage score based on time taken (in hours).
    More time = higher spoilage risk.
    """
    hours = duration_seconds / 3600
    return hours  # Simple model: longer time = more spoilage


def score_route(route: Dict, fuel_price: float, mileage: float,
                weights: Dict[str, float]) -> Tuple[float, float, float, float]:
    """
    Score a route and return total score, fuel cost, toll cost, and total cost.
    """
    distance = route["distance"]
    duration = route["duration"]

    fuel_cost = estimate_fuel_cost(distance, fuel_price, mileage)
    time_score = duration / 60  # time in minutes
    spoilage_score = estimate_spoilage_risk(duration)

    toll_cost = (distance / 1000) * 1.5  # ₹1.5 per km (assumed)
    total_score = (
        weights["fuel"] * fuel_cost +
        weights["time"] * time_score +
        weights["spoilage"] * spoilage_score
    )

    return total_score, fuel_cost, toll_cost, fuel_cost + toll_cost


def get_best_route(routes: List[Dict], fuel_price: float, mileage: float,
                   weights: Dict[str, float]) -> Tuple[int, Dict, float, float, float]:
    """
    Returns index of best route, route object, and cost breakdown.
    """
    best_index = 0
    best_score = float("inf")
    best_route = None
    best_fuel_cost = 0
    best_toll_cost = 0
    best_total_cost = 0

    for i, route in enumerate(routes):
        score, fuel_cost, toll_cost, total_cost = score_route(route, fuel_price, mileage, weights)
        print(f"Route {i}: Score={score:.2f}, Fuel Cost=₹{fuel_cost:.2f}, Toll=₹{toll_cost:.2f}, Total=₹{total_cost:.2f}")

        if score < best_score:
            best_score = score
            best_index = i
            best_route = route
            best_fuel_cost = fuel_cost
            best_toll_cost = toll_cost
            best_total_cost = total_cost

    return best_index, best_route, best_fuel_cost, best_toll_cost, best_total_cost
