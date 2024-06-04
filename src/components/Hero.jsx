import React from "react";
import styles from "../style";
import {motion} from "framer-motion"
import { staggerContainer,textVariant, slideIn } from "../utils/motion";
import { cover,stamp } from "../assets"; 
import Banner from '../assets/banner.mp4' 
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
      className='relative w-11/12  md:-mt-[20px] -mt-[12px] '
      >
        <div className=' absolute w-full hero-gradient
        z-[0] -top-[30px] -right-[30px] h-[500px] rounded-tr-[80px]' />
          <video src={Banner} muted autoPlay loop
           className='w-full sm:h-[500px] h-[350px] object-cover
           rounded-tr-[50px] z-10 relative'/>
      </motion.div>
    </motion.div>
    <About />
  </section>
  

  );
};

export default Hero;
