import React from "react";
import { fetchJobs } from "../data/jobData";

const JobRoles = () => {
  const [jobs, setJobs] = React.useState(fetchJobs);
  const [activeDomain, setActiveDomain] = React.useState('All');

  return (
    <div className="flex flex-wrap gap-4 min-h-screen flex-col">
      <div className="flex gap-x-16 gap-y-10 flex-wrap justify-center items-center">
        {jobs.map(jobs => (
          <div key={jobs._id} className="w-[400px] h-[220px] glassmorphism rounded-xl bg-opacity-15 overflow-hidden flex flex-col justify-center items-center text-white gap-3 border-[1px] text-[14px]">
            <h2 className="flex justify-center text-[20px]">{jobs.company}</h2>
            <p>Tittle: {jobs.job_title}</p>
            <p>Location: {jobs.location}</p>
            <p className="text-[12px] flex flex-wrap">Discription: {jobs.job_description}</p>
          </div>
        ))}
      </div>
      <p className="text-white flex justify-center mt-16 text-[18px]"><span className=" text-pink-500 text-[18px]">*</span>To apply go to the company offical website</p>
    </div>
  );
};

export default JobRoles;
