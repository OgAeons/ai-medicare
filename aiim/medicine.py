import pandas as pd

df_unfiltered = pd.read_csv('Dataset/medicine_dataset.csv', low_memory=False)
df_unfiltered = df_unfiltered.iloc[:, [0, 1, 2, 3, 4, 7, 8, 9, 49]]
df = df_unfiltered.dropna()

def get_medicine_details(partial_name):
    matching_rows = df[df['name'].str.contains(partial_name, case=False, na=False)]

    if not matching_rows.empty:
        if matching_rows.shape[0] > 1:
            # If multiple matches found, return a list of dictionaries
            matches = []
            for _, row in matching_rows.iterrows():
                match = {
                    'name': row['name'],
                    'use': row['use0'],
                    'side_effects': [
                        row['sideEffect0'],
                        row['sideEffect1'],
                        row['sideEffect2']
                    ],
                    'substitutes': [
                        row['substitute0'],
                        row['substitute1'],
                        row['substitute2']
                    ]
                }
                matches.append(match)
            return matches
        else:
            # If only one match found, return a single dictionary
            selected_row = matching_rows.iloc[0]
            return {
                'name': selected_row['name'],
                'use': selected_row['use0'],
                'side_effects': [
                    selected_row['sideEffect0'],
                    selected_row['sideEffect1'],
                    selected_row['sideEffect2']
                ],
                'substitutes': [
                    selected_row['substitute0'],
                    selected_row['substitute1'],
                    selected_row['substitute2']
                ]
            }
    else:
        return {"error": "No matches found."}

