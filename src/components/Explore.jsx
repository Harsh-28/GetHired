import React from "react";
import { useState } from 'react';
import {motion} from 'framer-motion'
import styles from "../styles"
import {staggerContainer} from '../utils/motion'
import { ExploreCard, GetStarted } from '../components';
import {TitleText, TypingText} from '../components/CoustomTexts'
import {exploreWorlds} from '../constants'

const Explore = () => {

  const[active,setActive] = useState('world-2');

  return (
  <section className={`${styles.paddings}`}
  id='explore'>
    <motion.div
    variants={staggerContainer}
    initial="hidden"
    whileInView="show"
    viewport={{once: false, amount:0.25}}
    className={`${styles.innerWidth} mx-auto flex flex-col`}
    > 
    <div className='gradient-03'/>
      <TypingText title="| The Modules" 
      textStyles="text-center"/>
      <TitleText title={<>Choose The Module You Want  
      <br className='md:block hidden'/> to Explore</>} 
      textStyles="text-center"/>
      
      <div className='mt-[50px] flex flex-col lg:flex-row
      min-h-[70vh] gap-5'>
        {exploreWorlds.map((world, index) =>(
          <ExploreCard 
          key={world.id}
          {...world}
          index={index}
          active={active}
          handleClick={setActive}
          handlePath={world.path}
          />
        ))}
      </div>

    </motion.div>
    <GetStarted/>
  </section>
)};



export default Explore