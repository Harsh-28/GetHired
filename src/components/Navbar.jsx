
import React from "react";
import logo from '../assets/logo.png'
import { Link, matchPath } from "react-router-dom";
import ProfileDropdown from "./core/Auth/ProfileDropDown";
import { useSelector } from "react-redux";
import {NavbarLinks} from '../data/navbar-links'
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import styles from "../styles";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({path:route}, location.pathname);
}
  const {token} = useSelector( (state) => state.auth );
    return (
      <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative z-[10]`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01 opacity-20" />

      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className= 'relative z-[10]'
      >
      <div className='flex h-16 items-center justify-center border-b-[1px] border-b-richblack-700'>
        <div className='flex w-11/12 max-w-maxContent items-center justify-between' >
          <Link to="/" className="flex items-center">
            <img src={logo} alt="logo" width={160} height={42} loading='lazy'/>
          </Link>

          <nav>
            <ul className='flex gap-x-6 text-richblack-25'>
              {
                NavbarLinks.map( (link, index) => (
                  <li key={index}>
                  {
                    <Link to={link?.path}>
                      <p className= {`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}>
                        {link.title}
                      </p>
                    </Link>
                    }
                  </li>
                ))
              }              
            </ul>
          </nav>
          
          <div className="flex items-center gap-3 lg:order-2">
            {token === null && (
              <Link
                to="/login"
                className="hover:text-white text-dimWhite
                font-medium text-sm lg:px-5 
               lg:py-2.5 mr-2 focus:outline-none border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md"
              >
                Log in
              </Link>
            )}
            {token === null && (
              <Link to="/signup" >
                <button
                  type="button"
                  className='hover:text-white text-dimWhite
                  font-medium text-sm lg:px-5 
                 lg:py-2.5 mr-2 focus:outline-none border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] text-richblack-100 rounded-md'
                >
                  <span
                    className=" font-medium text-[15px]"
                  >
                    {" "}
                    Sign up
                  </span>
                </button>
              </Link>
            )}
            {token !== null && 
              <ProfileDropdown />
            }
          </div>
        </div>
      </div>
      </motion.nav>
    </motion.nav>
      
  );
}
export default Navbar;
