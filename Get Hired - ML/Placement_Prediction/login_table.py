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
collection = db['login']  
counter_collection = db['counters']



# Function to get the next value for the counter
def get_next_sequence_value(sequence_name):
    counter_doc = counter_collection.find_one_and_update(
        {'_id': sequence_name},
        {'$inc': {'sequence_value': 1}},
        upsert=True,
        return_document=True
    )
    return counter_doc['sequence_value']

# Function to insert a document with auto-incrementing id
def insert_document(email_id):
    id_value = get_next_sequence_value('id')
    document = {
        'id': id_value,
        'email_id': email_id
    }
    collection.insert_one(document)
    print("Document inserted successfully.")




insert_document("harshsree677@gmail.com")
