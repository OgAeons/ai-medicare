#====================================================================================================
# This script reads the dataset/doctors-by-specialtiy.csv file and reduces the number of entries to 100.
#====================================================================================================
import pandas as pd
import random

# Read the CSV file
df = pd.read_csv('dataset/doctors-by-specialtiy.csv', header=None, names=['ID', 'Name', 'Specialty'])

# Get unique specialties
unique_specialties = df['Specialty'].unique()

# Ensure each specialty is represented at least once
selected_entries = []
for specialty in unique_specialties:
    specialty_entries = df[df['Specialty'] == specialty]
    selected_entries.append(specialty_entries.sample(n=1))

# Combine the selected entries
selected_df = pd.concat(selected_entries)

# Calculate the number of additional entries needed
num_additional_entries = 100 - len(selected_df)

# Ensure num_additional_entries is non-negative
if num_additional_entries > 0:
    # Randomly select additional entries to reach 100
    remaining_entries = df.drop(selected_df.index)
    additional_entries = remaining_entries.sample(n=num_additional_entries)
    # Combine all entries to get the final DataFrame
    final_df = pd.concat([selected_df, additional_entries])
else:
    final_df = selected_df

# Save the result to a new CSV file
final_df.to_csv('dataset/doctors-by-specialtiy-reduced.csv', index=False, header=False)