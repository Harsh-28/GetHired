def generate_email(client):
    db = client['get-hired']  
    collection = db['login']
    num_entries = collection.count_documents({})
    data = collection.find({"id": num_entries})
    for i in data:
        return(i['email_id'])
    

def get_user_info(client):
    db = client['get-hired'] 
    coll1 = db['users']

    email = generate_email(client)

    user_detail = coll1.find({"email" : email})

    for i in user_detail:
        return(i["studentDetails"])
    
    

def employee_detail_entry(client, features):
    print(client)
    db = client['get-hired']
    student_table = db['employee_details']
    user_info = get_user_info(client)
    data1 = {
        "id" : user_info,
        "Years of Experience" : features[0],
        "Age" : features[1],
        "Severance" : features[2],
        "Promotion" : features[3],
        "Job Title"  : features[4],
        "Department" : features[5],
        "Location" : features[6]
    }

    student_table.insert_one(data1)
    print("Data inserted succesfully!!!")
