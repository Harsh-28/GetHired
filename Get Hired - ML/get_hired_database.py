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


def employee_detail_entry(client, features):
    print(client)
    # data1['department'],
    #     float(data1['job_title']),
    #     int(data1['years_exp']),
    #     int(data1['age']),
    #     int(data1['location']),
    #     int(data1['severance'],
    #     int(data1['promotion']))
    db = client['get-hired']
    student_table = db['employee_details']
    user_info = get_user_info(client)
    data1 = {
        "id" : user_info,
        "Years of Experience" : features[2],
        "Age" : features[3],
        "Severance" : features[5],
        "Promotion" : features[6],
        "Job Title"  : features[1],
        "Department" : features[0],
        "Location" : features[4]
    }

    student_table.insert_one(data1)
    print("Data inserted succesfully!!!")
