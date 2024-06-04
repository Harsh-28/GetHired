import React from 'react'
import styles from '../style'
import {motion} from 'framer-motion'
import { TypingText } from './CoustomTexts'
import { staggerContainer, fadeIn } from '../utils/motion'
import { arrowdown } from '../assets'
import Explore from './Explore'
const About = () => {
  return (
    <section className={`${styles.padding} relative z-10`}>
    <div className='gradient-02 z-0' />
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{once: false, amount: 0.25}}
    className={`${styles.innerWidth} mx-auto ${styles.flexCenter} flex-col`}
    >
      <TypingText title="| About Get Hired " textStyles="text-center"/>
      <motion.p
      variants={fadeIn('up', 'tween', 0.2, 1)}
      className='mt-[8px] font-normal sm-text-[3px] text-[22px] text-center
       text-[#c7c7c7]'
      >
        <span className=' font-extrabold text-white'>Get Hired </span> 
       integrates the predictive model into a user-friendly web application, enabling seamless interaction and personalized career recommendations.
It forecasts a student's likelihood of securing a job and an employee's chances of job retention in diverse companies.
It Implements an interactive chatbot to engage users, gather skill preferences, suggest suitable job roles and redirect them to a dynamic website featuring a comprehensive repository of study materials tailored to individual career goals.
      </motion.p>
      <motion.img
      variants={fadeIn('up', 'tween', 0.3, 1)}
      src={arrowdown}
      className='w-[18px] h-[20px] object-contain mt-[28px]' />
    </motion.div>
    <Explore />
  </section>
  )
}

export default About
