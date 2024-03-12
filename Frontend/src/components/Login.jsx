import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "../utils/motion";
import styles from "../styles";
import {  login } from "../assets";

const LoginForm = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    setIsLoggedIn(true);
    toast.success("Logged In");
    console.log("Printing the formData ");
    console.log(formData);
    navigate("/dashboard");
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-row lg:flex-row gap-6 ml-56 mt-8`}
    > 

      <form
        onSubmit={submitHandler}
        className="flex flex-col w-[400px] gap-y-4 z-50  h-full gradient-05 sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6a6a6a] "
      >
        <label className="w-full">
          <p className="text-[0.875rem] text-dimWhite mb-1 leading-[1.375rem]">
            Email Address<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter email address"
            name="email"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />
        </label>

        <label className="w-full relative">
          <p className="text-[0.875rem] text-dimWhite mb-1 leading-[1.375rem]">
            Password<sup className="text-pink-200">*</sup>
          </p>
          <input
            required
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={changeHandler}
            placeholder="Enter Password"
            name="password"
            className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
          />

          <span
            className="absolute right-3 top-[38px] cursor-pointer"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? (
              <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>

          <Link to="#">
            <p className="text-xs mt-1 text-blue-100 max-w-max ml-auto">
              Forgot Password?
            </p>
          </Link>
        </label>

        <button className="bg-[#25618b] rounded-[8px] font-medium text-white px-[12px] py-[8px] 
        mt-6 hover:bg-[#1d4a6b] hover:text-dimWhite">
          Sign In
        </button>
      </form>

      <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className={`flex-1 ${styles.flexCenter} `}
      >
        <img src={login} alt="login" className="-ml-[300px] -mt-[100px]"/>
      </motion.div>

    </motion.div>
  );
};

export default LoginForm;
