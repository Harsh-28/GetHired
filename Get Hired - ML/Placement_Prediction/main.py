import pickle
from flask import Flask, render_template, request, jsonify
import numpy as np
from pymongo.mongo_client import MongoClient
from get_hired_database import student_detail_entry
import copy
#Undump the model
model = pickle.load(open('placement_model.pkl', 'rb'))

# Create object of class Flask
app = Flask(__name__)


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



@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():  
    data = request.form
    features = [
        data['major_subject'],
        float(data['gpa']),
        int(data['technical_skill']),
        int(data['soft_skill']),
        int(data['internship']),
        int(data['projects'])
    ]

    print(features)


    #! upload data to the database
    deep_copied_list = copy.deepcopy(features)
    upload_data(deep_copied_list)
    
    processed_features = preprocess(features)

    prediction = model.predict(np.array([processed_features]))

    print(prediction)

    prediction = prediction.tolist()
    
    return jsonify({'prediction': prediction[0]})


if __name__=='__main__':
    app.run(debug=True)