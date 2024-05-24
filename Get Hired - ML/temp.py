import json 

def read_json(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
        return data
    
def load_data(data):
    from pymongo.mongo_client import MongoClient

    uri = "mongodb+srv://harshsree677:get-hired1460@cluster0.omdc2dq.mongodb.net/get-hired"

    # Create a new client and connect to the server
    client = MongoClient(uri)
    #!client is used to establish a new connection with python and mongodb
    # Send a ping to confirm a successful connection
    try:
        client.admin.command('ping')
        print("Pinged your deployment. You successfully connected to MongoDB!")
        
    except Exception as e:
        print(e)

    db = client['get-hired']  
    collection = db['job_details']

    collection.insert_many(data)
    print("Data inserted successfully!!!")
    client.close()


# Main function
if __name__ == "__main__":
    # Path to your JSON file
    json_file_path = 'C:\\Users\\hp\\Desktop\\MajorProject\\temp.json'
    
    # Read JSON data from the file
    data = read_json(json_file_path)
    
    load_data(data)