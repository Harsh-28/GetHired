import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';



const StudentPredictionForm = () => {
  const [formData, setFormData] = useState({
    major_subject: "Business Administration",
    gpa: "1",
    technical_skill: "1",
    soft_skill: "1",
    internship: "No",
    projects: "0",
  });
  const [loading, setLoading] = useState(false)

  function changeHandler(event) {
    const { name, value, checked, type } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }
  const navigate = useNavigate()
  const submitHandler = async (event) => {
    event.preventDefault();
    setLoading(true)
    const response = await fetch('http://localhost:5000/placementPrediction', {
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
        <h1 className="text-4xl leading-10 font-semibold text-richblack-5 flex justify-center">
          Prediction Form
        </h1>
        <form
          className="flex flex-col gap-7 text-white py-14"
          onSubmit={submitHandler}
        >
          <label htmlFor="major_subject" className="lable-style">
            Major Subject : </label>
          
          <select
            id="major_subject"
            name="major_subject"
            value={formData.major_subject}
            onChange={changeHandler}
            className="form-style"
            required
          >
            <option value="Business Administration">
              Business Administration
            </option>
            <option value="Biotechnology">Biotechnology</option>
            <option value="Data Science">Data Science</option>
            <option value="Finance">Finance</option>
            <option value="Marketing">Marketing</option>
            <option value="Art History">Art History</option>
            <option value="Computer Science">Computer Science</option>
            <option value="Engineering">Engineering</option>
            <option value="Electrical Engineering">
              Electrical Engineering
            </option>
            <option value="Software Engineering">Software Engineering</option>
          </select>
          <label htmlFor="gpa" className="lable-style">GPA (0 - 5):</label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            min="1"
            max="5"
            step="0.01"
            value={formData.gpa}
            onChange={changeHandler}
            className="form-style"
            required
          />

          <label htmlFor="technical_skill" className="lable-style">
            Technical Skill Rating (1 - 5):
          </label>
          <input
            type="number"
            id="technical_skill"
            name="technical_skill"
            min="1"
            max="5"
            value={formData.technical_skill}
            onChange={changeHandler}
            className="form-style"
            required
          />

          <label htmlFor="soft_skill" className="lable-style">Soft Skill Rating (1 - 5):</label>
          <input
            type="number"
            id="soft_skill"
            name="soft_skill"
            min="1"
            max="5"
            value={formData.soft_skill}
            onChange={changeHandler}
            className="form-style"
            required
          />

          <label htmlFor="internship" className="lable-style">Internship Done:</label>
          <select
            id="internship"
            name="internship"
            onChange={changeHandler}
            value={formData.internship}
            className="form-style"
            required
          >
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
          <label htmlFor="projects" className="lable-style">Number of Previous Projects:</label>
          <input
            type="number"
            id="projects"
            name="projects"
            min="0"
            onChange={changeHandler}
            value={formData.projects}
            className="form-style"
            required
          />

          <button
            // disabled={loading}
            type="submit"
            className={`rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] 
         ${
           //    !loading &&
           "transition-all duration-200 hover:scale-95 hover:shadow-none"
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

export default StudentPredictionForm;
