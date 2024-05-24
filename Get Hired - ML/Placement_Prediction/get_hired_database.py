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
    
    

def student_detail_entry(client, features):
    print(client)
    db = client['get-hired']
    student_table = db['student_details']
    user_info = get_user_info(client)
    if features[4] == 0:
        features[4] = "No"
    else:
        features[4] = "Yes"
    data1 = {
        "id" : user_info,
        "Major" : features[0],
        "GPA" : features[1],
        "Technical skills rating(1-5)" : features[2],
        "Soft skills rating(1-5)" : features[3],
        "Internship"  : features[4],
        "Previous Projects" : features[5]
    }

    student_table.insert_one(data1)
    print("Data inserted succesfully!!!")
