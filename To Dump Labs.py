import pandas as pd
from pymongo import MongoClient

# Read the CSV file with proper delimiter and quoting
df = pd.read_csv('server/dataset/Labs.csv', delimiter=',', quotechar='"', skipinitialspace=True)

# Convert the DataFrame to a list of dictionaries
data = df.to_dict(orient='records')

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')  # Adjust the connection string as needed
db = client['AiM']  # Replace with your database name
collection = db['labs']

# Insert the data into the MongoDB collection
collection.insert_many(data)

print("Data inserted successfully into the 'labs' collection.")