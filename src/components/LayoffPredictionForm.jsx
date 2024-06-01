
import React, { useState } from "react";
import { useNavigate } from "react-router";

import axios from "axios"; 

const LayoffPredictionForm = () => {
  const [formData, setFormData] = useState({
    department: "Finance",
    job_title: "Software Engineer",
    years_exp: "1",
    age: "25",
    location: "Bangalore",
    severance: "Yes",
    promotion: "Yes",
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  const submitHandler = async (event) => {
    console.log(formData)
    event.preventDefault();
    setLoading(true)
    const response = await fetch('http://localhost:5000/layoffPrediction', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: formData }),
    });
    const data = await response.json();
    console.log('Response from backend:', data);
    setLoading(false)
    navigate('/result', { state: { data: data.received_data } });
};

  return (
    <div className="flex justify-center">
      <div className={`border border-richblack-600 text-richblack-300 rounded-xl p-7 w-[35%] flex flex-col
       ${
        loading ? ("hidden") : ("block")
      }`}>
        <h1 className={`text-4xl leading-10 font-semibold text-richblack-5 flex justify-center`}>
          Layoff Prediction Form
        </h1>
        <form 
          className="flex flex-col gap-7 text-white py-14"
          onSubmit={submitHandler}
        >
          <label htmlFor="department" className=" lable-style">Department:</label>
          <select 
          className="form-style"
          id="department" 
          name="department" 
          value={formData.department}
          onChange={changeHandler}
          required>
                <option value="Finance">Finance</option>
                <option value="HumanResource">Human Resource</option>
                <option value="IT">IT</option>
                <option value="Marketing">Marketing</option>
                <option value="Operation">Operations</option>
                <option value="Sales">Sales</option>
                <option value="CustomerService">Customer Service</option>
                <option value="Engineering">Engineering</option>
          </select>

          <label htmlFor="job_title" className="lable-style">Job Title:</label>
          <select 
          className="form-style" 
          id="job_title" 
          name="job_title" 
          value={formData.job_title}
          onChange={changeHandler}
          required>
                    <option>Software Engineer</option>
                    <option>Marketing Manager</option>
                    <option>Sales Associate</option>
                    <option>Network Administrator</option>
                    <option>Data Scientist</option>
                    <option>Content Creator</option>
                    <option>Account Executive</option>
                    <option>Help Desk Analyst</option>
                    <option>Quality Assurance Engineer</option>
                    <option>Social Media Manager</option>
                    <option>Financial Analyst</option>
                    <option>Supply Chain Manager</option>
                    <option>Recruiter</option>
                    <option>Support Specialist</option>
                    <option>Accountant</option>
                    <option>Logistics Coordinator</option>
                    <option>HR Manager</option>
                    <option>Team Lead</option>
                    <option>Investment Analyst</option>
                    <option>Inventory Specialist</option>
                    <option>Software Developer</option>
                    <option>Marketing Associate</option>
                    <option>Business Development Representative</option>
                    <option>Systems Engineer</option>
                    <option>UI/UX Designer</option>
                    <option>Copywriter</option>
                    <option>Regional Sales Manager</option>
                    <option>Security Analyst</option>
                    <option>Machine Learning Engineer</option>
                    <option>Market Research Analyst</option>
                    <option>Account Manager</option>
                    <option>Web Developer</option>
                    <option>Backend Engineer</option>
                    <option>Social Media Specialist</option>
                    <option>Sales Representative</option>
                    <option>Database Administrator</option>
                    <option>Full Stack Developer</option>
                    <option>Content Marketing Manager</option>
                    <option>Business Development Specialist</option>
                    <option>Software Engineer in Test</option>
                    <option>Project Manager</option>
                    <option>Talent Acquisition Specialist</option>
                    <option>Customer Success Manager</option>
                    <option>Supply Chain Analyst</option>
                    <option>Benefits Specialist</option>
                    <option>Quality Assurance Analyst</option>
                    <option>Investment Banker</option>
                    <option>Inventory Control Specialist</option>
                    <option>Software Architect</option>
                    <option>Marketing Director</option>
                    <option>National Sales Manager</option>
                    <option>Cloud Architect</option>
                    <option>Data Engineer</option>
                    <option>Product Marketing Manager</option>
                    <option>Sales Director</option>
                    <option>Network Security Engineer</option>
                    <option>Front-End Developer</option>
                    <option>Public Relations Specialist</option>
                    <option>Inside Sales Representative</option>
                    <option>IT Support Specialist</option>
                    <option>Search Engine Marketing Specialist</option>
                    <option>Business Analyst</option>
                    <option>Data Analyst</option>
                    <option>DevOps Engineer</option>
                    <option>Brand Marketing Manager</option>
                    <option>Sales Engineer</option>
                    <option>Business Systems Analyst</option>
                    <option>Budget Analyst</option>
                    <option>Logistics Manager</option>
                    <option>Learning and Development Specialist</option>
                    <option>Customer Support Representative</option>
                    <option>Controller</option>
                    <option>Purchasing Manager</option>
                    <option>Compensation and Benefits Manager</option>
                    <option>Technical Support Specialist</option>
                    <option>Risk Analyst</option>
                    <option>Warehouse Manager</option>
                    <option>Product Manager</option>
                    <option>Marketing Analyst</option>
                    <option>Regional Sales Director</option>
                    <option>Software Development Manager</option>
                    <option>Creative Director</option>
                    <option>Sales Operations Manager</option>
                    <option>Security Engineer</option>
                    <option>Web Analyst</option>
                    <option>Business Development Manager</option>
                    <option>Systems Analyst</option>
                    <option>Content Marketing Specialist</option>
                    <option>Software Development Engineer</option>
                </select>
          <label htmlFor="years_exp" className="lable-style">
          Years of Experience:
          </label>
          <input
            type="number"
            id="years_exp"
            name="years_exp"
            min="1"
            max="30"
            value={formData.years_exp}
            onChange={changeHandler}
            className="form-style"
            required
          />

          <label htmlFor="age" className="lable-style">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            min="25"
            max="50"
            step="1"
            value={formData.age}
            onChange={changeHandler}
            className="form-style"
            required
          />

          <label htmlFor="location" className="lable-style">Location:</label>
          <select
            id="location"
            name="location"
            onChange={changeHandler}
            value={formData.location}
            className="form-style"
            required
          >
            <option value="Bangalore">Bangalore</option>
            <option value="Hydrabad">Hyderabad</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Remote">Remote</option>
          </select>

          <label htmlFor="severance" className="lable-style">Severance Package Granted:</label>
          <select
            id="severance"
            name="severance"
            onChange={changeHandler}
            value={formData.severance}
            className="form-style"
            required
          >
            <option>Yes</option>
            <option>No</option>
          </select>

          <label htmlFor="promotion" className="lable-style">Promotion Granted:</label>
          <select
            id="promotion"
            name="promotion"
            onChange={changeHandler}
            value={formData.promotion}
            className="form-style"
            required
          >
            <option >Yes</option>
            <option >No</option>
          </select>

          <button
            disabled={loading}
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
              !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none "
         }  disabled:bg-richblack-500 sm:text-[16px] `}
          >
            Predict Now
          </button>
        </form>
        
      </div>
      {loading && <div className="spinner flex justify-center items-center"></div>}
    </div>
  );
};

export default LayoffPredictionForm;
