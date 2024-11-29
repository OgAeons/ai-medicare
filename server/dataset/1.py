import pandas as pd

# Read the CSV file
df = pd.read_csv('Training.csv', header=None, names=['Prognosis'])

# Get unique prognosis values
unique_prognosis = df['Prognosis'].unique()

# Print the unique prognosis values
print(unique_prognosis)