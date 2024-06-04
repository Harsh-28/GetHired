import React from 'react';
import { filterData } from '../../../data/data'; // Import your data

const Navbar = ({ domains, setFilteredCourses, activeDomain, setActiveDomain }) => {
  const handleDomainClick = (domain) => {
    setActiveDomain(domain);
    if (domain === 'All') {
      setFilteredCourses(filterData);
    } else {
      const filteredCourses = filterData.filter(course => course.domain === domain);
      setFilteredCourses(filteredCourses);
    }
  };

  return (
    <nav className='flex mb-4'>
      <ul className='flex gap-4 flex-wrap justify-center items-stretch text-richblack-200 cursor-pointer'>
        {domains.map(domain => (
          <li key={domain} onClick={() => handleDomainClick(domain)} className={`px-4 py-2 rounded-lg border-[2px] ${activeDomain === domain ? 'border-white' : 'border-richblack-500'}`}>
          {domain}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar