import math

# Function to calculate the distance between two points using latitude and longitude
def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    radius = 6371.0

    # Convert latitude and longitude from degrees to radians
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    # Haversine formula
    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Calculate the distance
    distance = radius * c

    return distance

# Function to find the nearest doctor based on user's location
def find_nearest_doctor(user_latitude, user_longitude,mongo):
    nearest_doctor = None
    nearest_distance = float('inf')

    doctors = list(mongo.db.Doctor.find())

    for doctor in doctors:
        doctor_latitude = doctor['latitude']
        doctor_longitude = doctor['longitude']
        distance = haversine(user_latitude, user_longitude, doctor_latitude, doctor_longitude)

        if distance < nearest_distance:
            nearest_distance = distance
            nearest_doctor = doctor

    return nearest_doctor, nearest_distance
