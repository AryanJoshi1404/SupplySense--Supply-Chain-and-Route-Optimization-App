import requests

OSRM_BASE_URL = "http://router.project-osrm.org"

def get_coordinates_from_location(location_name):
    """Use Nominatim to get latitude and longitude for a location name."""
    nominatim_url = "https://nominatim.openstreetmap.org/search"
    params = {
        "q": location_name,
        "format": "json",
        "limit": 1
    }
    response = requests.get(nominatim_url, params=params, headers={'User-Agent': 'mf-optimizer'})
    data = response.json()

    if not data:
        raise ValueError(f"Location not found: {location_name}")

    lat = float(data[0]['lat'])
    lon = float(data[0]['lon'])
    return lat, lon


def get_route(start_coords, end_coords):
    coordinates = f"{start_coords[1]},{start_coords[0]};{end_coords[1]},{end_coords[0]}"
    url = f"{OSRM_BASE_URL}/route/v1/driving/{coordinates}"

    params = {
        "overview": "full",
        "geometries": "geojson",
        "alternatives": "true",
        "steps": "false"
    }

    response = requests.get(url, params=params)
    data = response.json()

    if data.get('code') != 'Ok':
        raise ValueError("Routing failed")

    return data['routes']
