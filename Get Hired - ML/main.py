import pickle
from flask import Flask, render_template, request, jsonify
from flask_cors import CORS, cross_origin
import numpy as np
from sklearn.feature_extraction import FeatureHasher
from pymongo.mongo_client import MongoClient
from get_hired_database import student_detail_entry, employee_detail_entry
import copy
import warnings
warnings.simplefilter("ignore")
#Undump the model
model1 = pickle.load(open('Get Hired - ML\\Placement_Prediction\\placement_model.pkl', 'rb'))
model2 = pickle.load(open('Get Hired - ML\\Layoff_Prediction\\best_model.pkl', 'rb'))
app = Flask(__name__)
CORS(app)  # This will enable CORS for all routes


def encode(user_subject):
    subject_list = ['Art History', 'Biotechnology', 'Business Administration','Computer Science',
                    'Data Science','Electrical Engineering','Engineering','Finance', 'Marketing',  
                      'Software Engineering']
    
    major_subject_index = subject_list.index(user_subject)
    major_subject_one_hot = [0.0] * len(subject_list)
    major_subject_one_hot[major_subject_index] = 1.0
    print(major_subject_one_hot)
    return major_subject_one_hot

def transform_gpa(gpa):
    trans_gpa = round((np.log([gpa]))[0], 6)
    print(trans_gpa)
    return trans_gpa

def upload_data(features):
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
    student_detail_entry(client, features)

    client.close()

    return 

def preprocess(features):
    user_subjects = features[0]
    gpa = features[1]
    t_skills = features[2]
    s_skills = features[3]
    i_status = features[4]
    no_of_projects = features[5]


    encoded_major_subjects = encode(user_subjects)
    encoded_gpa = transform_gpa(gpa)
    processed_features = [t_skills, s_skills, i_status, no_of_projects, encoded_gpa] + encoded_major_subjects
    return processed_features


def encode_job_titles(user_job_title):
    # Load feature hasher
    feature_hasher = FeatureHasher(n_features=10, input_type='string')


    job_titles = [
        "Software Engineer", "Marketing Manager", "Sales Associate", "Network Administrator",
        "Data Scientist", "Content Creator", "Account Executive", "Help Desk Analyst",
        "Quality Assurance Engineer", "Social Media Manager", "Financial Analyst", "Supply Chain Manager",
        "Recruiter", "Support Specialist", "Accountant", "Logistics Coordinator", "HR Manager",
        "Team Lead", "Investment Analyst", "Inventory Specialist", "Software Developer",
        "Marketing Associate", "Business Development Representative", "Systems Engineer", "UI/UX Designer",
        "Copywriter", "Regional Sales Manager", "Security Analyst", "Machine Learning Engineer",
        "Market Research Analyst", "Account Manager", "Web Developer", "Backend Engineer",
        "Social Media Specialist", "Sales Representative", "Database Administrator", "Full Stack Developer",
        "Content Marketing Manager", "Business Development Specialist", "Software Engineer in Test",
        "Project Manager", "Talent Acquisition Specialist", "Customer Success Manager", "Supply Chain Analyst",
        "Benefits Specialist", "Quality Assurance Analyst", "Investment Banker", "Inventory Control Specialist",
        "Software Architect", "Marketing Director", "National Sales Manager", "Cloud Architect", "Data Engineer",
        "Product Marketing Manager", "Sales Director", "Network Security Engineer", "Front-End Developer",
        "Public Relations Specialist", "Inside Sales Representative", "IT Support Specialist",
        "Search Engine Marketing Specialist", "Business Analyst", "Data Analyst", "DevOps Engineer",
        "Brand Marketing Manager", "Sales Engineer", "Business Systems Analyst", "Budget Analyst",
        "Logistics Manager", "Learning and Development Specialist", "Customer Support Representative", "Controller",
        "Purchasing Manager", "Compensation and Benefits Manager", "Technical Support Specialist", "Risk Analyst",
        "Warehouse Manager", "Product Manager", "Marketing Analyst", "Regional Sales Director",
        "Software Development Manager", "Creative Director", "Sales Operations Manager", "Security Engineer",
        "Web Analyst", "Business Development Manager", "Systems Analyst", "Content Marketing Specialist",
        "Software Development Engineer"
    ]

        # Hash the job titles
        
    hashed_features = feature_hasher.transform([[title] for title in job_titles]).toarray()
    
    job_title_hashed = feature_hasher.transform([[user_job_title]]).toarray()
    return(list(job_title_hashed[0]))




def encode_department(user_department):
    lst_of_department = ["Customer Service", "Engineering", "Finance", "Human Resource", "IT", "Marketing",
                          "Operations", "Sales"]
    user_department_index = lst_of_department.index(user_department)
    user_department_one_hot_encode = [0.0] * len(lst_of_department)
    user_department_one_hot_encode[user_department_index] = 1.0
    return(user_department_one_hot_encode)



def encode_location(user_location):
    lst_of_location = ["Bangalore", "Hyderabad", "Mumbai", "Remote"]
    user_location_index = lst_of_location.index(user_location)
    user_location_one_hot_encode = [0.0] * len(lst_of_location)
    user_location_one_hot_encode[user_location_index] = 1.0
    return(user_location_one_hot_encode)



def upload_data(features):
    
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
    employee_detail_entry(client, features)    
    client.close()
    return



@app.route('/placementPrediction', methods=['POST'])
@cross_origin()  # This will enable CORS for this specific route
def placementPrediction():
    data = request.json
    print("Data received from frontend:", data)
    print(type(data))
    data1 = data['userInput']
    if data1['internship'] == "1":
        data1['internship'] = 1
    else:
        data1['internship'] = 0
    features = [
        data1['major_subject'],
        float(data1['gpa']),
        int(data1['technical_skill']),
        int(data1['soft_skill']),
        int(data1['internship']),
        int(data1['projects'])
    ]

    print(features)

    #! upload data to the database
    deep_copied_list = copy.deepcopy(features)
    upload_data(deep_copied_list)

    processed_features = preprocess(features)

    prediction = model1.predict(np.array([processed_features]))

    print(prediction)

    prediction = prediction.tolist()

    if prediction[0] == 0:
        ans = "Lesser chances of getting placed"
    else:
        ans = "Higher chances of getting placed"
    
    return jsonify({"status": "success", "received_data": ans})
    


@app.route('/layoffPrediction', methods = ['POST'])
@cross_origin
def layoffPrediction():
    data = request.json
    print("Data received from frontend:", data)
    print(type(data))
    data1 = data['userInput']
    if data1['internship'] == "1":
        data1['internship'] = 1
    else:
        data1['internship'] = 0
    features = [
        data1['department'],
        float(data1['job_title']),
        int(data1['years_exp']),
        int(data1['age']),
        int(data1['location']),
        int(data1['severance'],
        int(data1['promotion']))
    ]

    print(features)

    #! upload data to the database
    deep_copied_list = copy.deepcopy(features)
    upload_data(deep_copied_list)

    encoded_departement = encode_department(features[0])
    encoded_job_title = encode_job_titles(features[1])
    encoded_location = encode_location(features[4])

    prediction = model2.predict([features])
    print(prediction)

    prediction = prediction.tolist()



    if prediction[0] == 0:
        ans = "Lesser chances of getting layoff"
    else:
        ans = "Higher chances of getting layoff"
    
    return jsonify({"status": "success", "received_data": ans})
    
    
    return



if __name__ == '__main__':
    app.run(debug=True, port=5000)
