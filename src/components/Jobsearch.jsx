import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import JobRoles from './JobRoles';

const Jobsearch = () => {
    const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

    const handleClick = async () => {
      try {
          setLoading(true);
          const response = await fetch('http://localhost:4000/api/v1/jobdata');
          const data = await response.json();
          setMessage(data.message);
          setLoading(false);
          // navigate('/job-search/job-roles')
          window.location.reload();

      } catch (error) {
          console.error('Error fetching data from backend:', error);
          setMessage('Failed to fetch data');
      }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-20'>
    <button onClick={handleClick}
    className='group flex justify-center px-16 py-3 mt-12 w-fit rounded-full bg-yellow-100 font-bold text-richblack-700 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] transition-all duration-200 hover:scale-95 hover:drop-shadow-none overflow-x-hidden '
    >Jobsearch</button>
    {loading && <div className="spinner flex justify-center items-center"/>}
    <JobRoles/>
    </div>

  )
}

export default Jobsearch