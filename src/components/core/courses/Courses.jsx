import React from "react";
import Navbar from "./Navbar";
import { filterData } from "../../../data/data";

const Courses = () => {
  // Extract unique domain names from filterData
  const domains = ['All', ...new Set(filterData.map(course => course.domain))];
  const [filteredCourses, setFilteredCourses] = React.useState(filterData);
  const [activeDomain, setActiveDomain] = React.useState('All');

   return (
    <div className="flex flex-wrap gap-4 min-h-screen flex-col">
      <Navbar domains={domains} setFilteredCourses={setFilteredCourses} activeDomain={activeDomain} setActiveDomain={setActiveDomain} className="pb-[20px]"/>
      <div className="flex gap-x-16 gap-y-10 flex-wrap justify-center items-center">
        {filteredCourses.map(course => (
          <div key={course._id} className="w-[390px] h-[200px] glassmorphism rounded-xl bg-opacity-15 overflow-hidden flex flex-col justify-center items-center text-white gap-3 border-[1px] text-[14px]">
            <h2 className="flex justify-center ">{course.course}</h2>
            <p>Provider: {course.provider}</p>
            <p>Domain: {course.domain}</p>
            <div className="flex justify-center">
              <a href={course.link} className=" rounded-md bg-yellow-50 font-medium w-24 px-6 text-center mt-2 text-[14px] text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)]">Enroll Now</a>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
