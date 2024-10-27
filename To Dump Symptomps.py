import pandas as pd
from pymongo import MongoClient

# Path to your dataset
csv_file_path = 'server\dataset\Testing.csv'  # Replace with your actual file path

# Load the CSV file
df = pd.read_csv(csv_file_path)

# Initialize MongoDB client and define the database and collection
client = MongoClient('mongodb://localhost:27017/')
db = client['AiM']
symptoms_collection = db['symptoms']

# Insert data into MongoDB
symptoms_collection.drop()  # Optional: Clear existing data
symptoms_collection.insert_many(df.to_dict('records'))

print("Data has been successfully inserted into MongoDB.")
