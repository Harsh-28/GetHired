from flask import Flask, render_template, request, jsonify
import numpy as np
from sklearn.preprocessing import OneHotEncoder
from sklearn.feature_extraction import FeatureHasher
import pickle

app = Flask(__name__)

# Load the trained model
model = pickle.load(open('Layoff_Prediction\\best_model.pkl', 'rb'))


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



# Routes
@app.route('/')
def index():
    return render_template('index.html')


@app.route('/predict', methods=['POST'])
def predict():
    # Get form data
    department = request.form['department']
    job_title = request.form['job_title']
    years_exp = float(request.form['years_exp'])
    age = float(request.form['age'])
    location = request.form['location']
    severance = int(request.form['severance'])
    promotion = int(request.form['promotion'])

    encoded_departement = encode_department(department)
    encoded_job_title = encode_job_titles(job_title)
    encoded_location = encode_location(location)

    features = [years_exp, age, severance, promotion] + encoded_job_title + encoded_departement + encoded_location
    print(features)

    # return render_template('index.html')
    # # Predict
    prediction = model.predict([features])

    prediction_label = "Yes" if prediction[0] == 1 else "No"

    return jsonify({'prediction': prediction_label})

    

if __name__ == '__main__':
    app.run(debug=True)
