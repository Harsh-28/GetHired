import { useState } from "react";
import { motion } from "framer-motion";
import { navVariants } from "../utils/motion";
import styles from "../styles";
import { Link, NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import { profile } from "../assets";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;

  return (
    <motion.nav
      variants={navVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative z-[10]`}
    >
      <div className="absolute w-[50%] inset-0 gradient-01" />

      <motion.nav
        variants={navVariants}
        initial="hidden"
        whileInView="show"
        className={`${styles.xPaddings} py-8 relative z-[10]`}
      >
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <h2 className=" font-extrabold text-[24px] leading-7 text-white ">
              GET HIRED
            </h2>
          </Link>
          <div className="flex items-center lg:order-2">
            {!isLoggedIn && (
              <Link
                to="/login"
                className="hover:text-white text-dimWhite
                font-medium rounded-lg text-sm px-4 lg:px-5 
               py-2 lg:py-2.5 mr-2 focus:outline-none"
              >
                Log in
              </Link>
            )}
            {!isLoggedIn && (
              <Link to="/signup" className="text-white">
                <button
                  type="button"
                  className="flex
          items-center h-fit py-3 px-5 bg-[#25618b] hover:bg-[#1d4a6b]
          rounded-[32px] gap-[12px]"
                >
                  <span
                    className="font-sm text-[13px]
          text-white"
                  >
                    {" "}
                    GET STARTED
                  </span>
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/dashboard">
                <button
                  className="text-white py-[8px] 
                    px-[12px] rounded-[8px] "
                >
                  Dashboard
                </button>
              </Link>
            )}
            {isLoggedIn && (
              <Link to="/">
                <div
                  onClick={() => {
                    setIsLoggedIn(false);
                    toast.success("Logged Out");
                  }}
                  className=" text-white py-[8px] 
                    px-[12px] rounded-[8px] "
                >
                  Logout
                </div>
              </Link>
            )}
            
          </div>
        </div>
      </motion.nav>
    </motion.nav>
  );
};

export default Navbar;
