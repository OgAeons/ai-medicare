import pandas as pd

df_unfiltered = pd.read_csv('dataset/medicine_dataset.csv', low_memory=False)
df_unfiltered = df_unfiltered.iloc[:, [0, 1, 2, 3, 4, 7, 8, 9, 49]]
df = df_unfiltered.dropna()

def get_medicine_details(partial_name):
    matching_rows = df[df['name'].str.contains(partial_name, case=False, na=False)]

    if not matching_rows.empty:
        if matching_rows.shape[0] > 1:
            # Multiple matches
            matches = []
            for _, row in matching_rows.iterrows():
                match = {
                    'name': row['name'],
                    'use': row['use0'],
                    'side_effects': [
                        row['sideEffect0'] or "",
                        row['sideEffect1'] or "",
                        row['sideEffect2'] or ""
                    ],
                    'substitutes': [
                        row['substitute0'] or "",
                        row['substitute1'] or "",
                        row['substitute2'] or ""
                    ]
                }
                matches.append(match)
            return matches
        else:
            # Single match
            selected_row = matching_rows.iloc[0]
            return {
                'name': selected_row['name'],
                'use': selected_row['use0'],
                'side_effects': [
                    selected_row['sideEffect0'] or "",
                    selected_row['sideEffect1'] or "",
                    selected_row['sideEffect2'] or ""
                ],
                'substitutes': [
                    selected_row['substitute0'] or "",
                    selected_row['substitute1'] or "",
                    selected_row['substitute2'] or ""
                ]
            }
    else:
        return {"error": "No matches found."}
