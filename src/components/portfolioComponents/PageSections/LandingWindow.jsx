import React, { useRef } from 'react'
import { motion,useScroll,useTransform,useSpring,useMotionTemplate,scale } from "motion/react";
import art from '/assets/images/Nishan_WA.png'
import Hero from '../KeyModel/Hero'
import { rotate } from 'three/src/nodes/utils/RotateNode.js'
import { bgStyle } from '../../../libs/settings'


const initialState = {
    opacity: 0,
    scale: 0.85,
    filter: 'blur(10px)',
}

const animateState = {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: 'easeInOut'
    }
}

const hoverAction = {
    rotateX: 25,
    rotateY: 10,
    y: -10,
    transition: {
      duration: 0.3,
      ease: 'easeInOut'
    }
}

const tapAction = {
    y: 20,
    transition: {
      duration: 0.2,
      ease: 'easeInOut'
    }  
}


const LandingWindow = () => {

  // hooks
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start 80%', 'end 20%'],
  });
  
  const smoothScroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 25,
    mass: 0.4,
  });

  const transitionY = useTransform(smoothScroll, [0,1], [-200, 200])
  const transitionH = useTransform(smoothScroll, [0,1], [200, -200])
  const blur = useTransform(smoothScroll, [0,0.5,1], [10,0,10])
  const opacityContent = useTransform(smoothScroll, [0,0.5,1], [0,1,0])
  const rotateH = useTransform(smoothScroll, [0,1], [0,45])
  const scaleH = useTransform(smoothScroll, [1, 0.5, 1], [0.9, 1, 0.9]);
  
  return (

    <div 
    style={bgStyle}
    className=' relative h-screen flex justify-center items-center bg-black'>
      
      
      <motion.div
        ref={ref}
        initial={initialState}
        animate={animateState}
        whileHover={hoverAction}
        whileTap={tapAction}
        style={{
          translateZ: 100,
          y: transitionY,
          opacity: opacityContent,
          scale: scale,
        }}
        
        className='relative text-[clamp(4rem,18vw,15rem)] rounded-xl flex flex-col justify-center items-center font-impactImp text-neutral-950 p-4'>
          <img className='absolute rounded-md z-10 w-full h-full' src='/assets/images/card.jpg'></img>
          <div className='z-20'>I AM</div>
          <img className="absolute z-30 max-w-full object-contain" src={art}></img>
      
      </motion.div>
      
      
      <motion.button
        initial={initialState}
        animate={animateState}
        whileHover={{
          y: -10
        }}
        whileTap={tapAction}
        style={{
          translateZ: 100,
          y: transitionH,
          rotate: rotateH,
          scale: scaleH,
          
        }}       
        className="
absolute

w-40 h-40
sm:w-48 sm:h-48
md:w-64 md:h-64
lg:w-80 lg:h-80

left-1/2
top-1/2

translate-x-8
sm:translate-x-14
md:translate-x-40
lg:translate-x-72

translate-y-12
sm:translate-y-16
md:translate-y-32
">
        
          <Hero />
      
      </motion.button>
    
    </div>
  )
}

export default LandingWindow;
