import React from "react";
import styles from "../style";
import {motion} from "framer-motion"
import { staggerContainer,textVariant, slideIn } from "../utils/motion";
import { cover,stamp } from "../assets";  
import About from "./About";

const Hero = () => {
  return (
    <section className={`${styles.padding} sm:pl-16 pl-16`}>
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{once: false, amount:0.25}}
    className={`${styles.innerWidth} mx-auto flex flex-col overflow-hidden`}
    >
      <div className=' flex justify-center items-center flex-col relative z-[2]'>
        <motion.h1
        variants={textVariant(1.1)}
        className='font-bold lg:text-[144px] md:text-[100px] sm:text-[60px] 
        text-[44px] lg:leading-[158.4px] md:leading-[114.4px] sm:leading-[74.4px] 
        leading-[64.4px] uppercase text-white'>
          GET HIRED
        </motion.h1>
        <motion.div 
        variants={textVariant(1.2)}
        className='flex flex-row justify-center items-center'
        >
        </motion.div>
      </div>

      <motion.div
      variants={slideIn('right', 'tween', 0.2, 1)}
      className='relative w-full md:-mt-[20px] -mt-[12px]'
      >
        <div className=' absolute w-full h-[300px] hero-gradient
        rounded-tl-[140px] z-[0] -top-[30px] ' />
          <img src={cover}
          className=' w-full sm:h-[500px] h-[350px] object-cover
          rounded-tl-[140px] z-10 relative'/>

          <a href='#explore'
          className='w-full flex justify-end sm:-mt-[70px] -mt-[50px]
          pr-[40px] relative z-10'>
            <img src={stamp}
            className='sm:w-[155px] w-[100px]
            sm:h-[150px] h-[100px] object-contain'/>
          </a>
      </motion.div>
    </motion.div>
    <About />
  </section>
  

  );
};

export default Hero;
