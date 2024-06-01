import os
import json

def combine_json_files(input_folder, output_file):
    # Initialize an empty list to hold the data from all JSON files
    combined_data = []

    # Iterate over all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith('.json'):
            file_path = os.path.join(input_folder, filename)
            try:
                with open(file_path, 'r') as f:
                    data = json.load(f)
                    combined_data.append(data)
            except json.JSONDecodeError as e:
                print(f"Error decoding JSON from file {file_path}: {e}")

    lst = []
    for i in combined_data:
        for j in i:
            lst.append(j)

    # Write the combined data to the output file
    with open(output_file, 'w') as f:
        json.dump(lst, f, indent=4)



# Specify the input folder containing the JSON files and the output file path
input_folder = 'Management System\complete_data'
output_file = 'Management System\\combined.json'

# Call the function to combine the JSON files
combine_json_files(input_folder, output_file)


