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
        <span className=' font-extrabold text-white'>Lorem </span> 
         ipsum dolor sit amet consectetur adipisicing elit. 
        Autem aut illum cumque nobis pariatur incidunt animi 
        ipsum molestias neque laudantium consequatur tempora praesentium 
        facere deleniti sequi nulla mollitia, obcaecati non.
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. 
        Officia dolore consectetur odio, nemo perferendis a unde 
        eligendi commodi laboriosam. Dolore velit laudantium hic? Est 
        repudiandae temporibus incidunt expedita, rerum quibusdam.
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
