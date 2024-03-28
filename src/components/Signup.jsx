import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import {toast} from "react-hot-toast"
import { useNavigate } from 'react-router-dom';
import {motion} from 'framer-motion'
import { staggerContainer, fadeIn } from '../utils/motion';
import styles from '../styles';
import {login} from '../assets'


const Signup = ({setIsLoggedIn}) => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:""
    })

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    function changeHandler(event) {

        setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ) )

    }

    function submitHandler(event) {
        event.preventDefault();
        if(formData.password != formData.confirmPassword) {
            toast.error("Passwords do not match");
            return ;
        }

        setIsLoggedIn("true");
        toast.success(' Account Created!')
        const accountData = {
            ...formData
        };

        const finalData = {
            ...accountData
        }

        console.log("printing Final account data ");
        console.log(finalData);

        navigate("/dashboard");

    }


  return (
    
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.25 }}
      className={`${styles.innerWidth} mx-auto flex flex-row lg:flex-row gap-6 mt-8`}
    >
    <motion.div
        variants={fadeIn("right", "tween", 0.2, 1)}
        className={`flex-1 ${styles.flexCenter} `}
      >
        <form onSubmit={submitHandler} className='z-10 gradient-05  sm:p-8 p-4 rounded-[32px] border-[1px] border-[#6a6a6a]'>
            <div className='flex gap-x-4'>
                    <label className='w-full'>
                        <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>First Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="firstName"
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            value={formData.firstName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>

                    <label className='w-full'>
                        <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Last Name<sup className='text-red-500'>*</sup></p>
                        <input
                            required
                            type="text"
                            name="lastName"
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            value={formData.lastName}
                            className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                        />
                    </label>
            </div>
            {/* email Add */}
            <div className='mt-[20px]'>
            <label className='w-full mt-[20px]'>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Email Address<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type="email"
                        name="email"
                        onChange={changeHandler}
                        placeholder="Enter Email Address "
                        value={formData.email}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
            </label>
            </div>
            

            {/* createPassword and Confirm Password */}
            <div className='w-full flex gap-x-4 mt-[20px]'>
                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Create Password<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type= {showPassword ? ("text") : ("password")}
                        name="password"
                        onChange={changeHandler}
                        placeholder="Enter Password"
                        value={formData.password}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span
                     className='absolute right-3 top-[38px] cursor-pointer' 
                    onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? 

                        (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                        (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>

                <label className='w-full relative'>
                    <p className='text-[0.875rem] text-white mb-1 leading-[1.375rem]'>Confirm Password<sup className='text-red-500'>*</sup></p>
                    <input
                        required
                        type= {showConfirmPassword ? ("text") : ("password")}
                        name="confirmPassword"
                        onChange={changeHandler}
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
                    />
                    <span 
                     className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => setShowConfirmPassword((prev) => !prev)}>
                        {showConfirmPassword ?

                         (<AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF'/>) : 

                         (<AiOutlineEye fontSize={24} fill='#AFB2BF'/>)}
                    </span>
                </label>
            </div>
        <button className=' w-full bg-[#25618b] rounded-[8px] font-medium text-dimWhite px-[12px] py-[8px] 
        mt-6 hover:bg-[#1d4a6b] hover:text-white'>
            Create Account
        </button>
        </form>
        </motion.div>
        <motion.div
        variants={fadeIn("left", "tween", 0.2, 1)}
        className={`flex-1 ${styles.flexCenter} `}
      >
        <img src={login} alt="login" className="-ml-[300px] -mt-[100px]"/>
      </motion.div>

    </motion.div>
  )
}

export default Signup
