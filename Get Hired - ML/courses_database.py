from pymongo.mongo_client import MongoClient
import json

def read_json(file_path):
    try:
        with open(file_path, 'r') as f:
            data = json.load(f)
            print("Data read from JSON file:")
            print(data)
            return data
    except Exception as e:
        print(f"Error reading JSON file: {e}")
        return []

def load_data(data):
    uri = "mongodb+srv://harshsree677:get-hired1460@cluster0.omdc2dq.mongodb.net/get-hired"

    # Create a new client and connect to the server
    client = MongoClient(uri)
    try:
        # Send a ping to confirm a successful connection
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
    except Exception as e:
        print(f"Error connecting to MongoDB: {e}")
        return

    db = client['get-hired']  
    collection = db['course_details']
    print("Collection accessed")

    collection.insert_many(data)
    print("Data inserted successfully!!!")
    client.close()
# Main function
if __name__ == "__main__":
    # Path to your JSON file
    json_file_path = 'Get Hired - ML\\courses.json'
    
    # Read JSON data from the file
    data = read_json(json_file_path)
    
    # Load data into MongoDB
    load_data(data)
