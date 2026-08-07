import React, { useEffect, useRef } from 'react'
import {motion, useAnimate, stagger} from 'motion/react'
import {GitHubCalendar} from 'react-github-calendar'
import { FaInstagramSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaCloudDownloadAlt } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { useState } from "react";
import emailjs from "@emailjs/browser"
import { useScroll,useTransform,useSpring,useMotionTemplate } from "motion/react";


const text = `I'm a ML Engineer & Full Stack Developer based in Bengaluru, India who loves turning ideas into fast, scalable products. I care deeply about clean code, great UX, and building things that actually matter. Currently working on Scalable Web Applications and diving deep into Machine Learning & Deep Learning. When I'm not coding, you'll find me working on my startup or cooking myself some michelin-star grade food.`

const bgStyle = {
    backgroundColor: "#000",
    backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)`,
    backgroundSize: "26px 26px",
  }
const About = () => {
    const [formData, setFormData] = useState({
      message: "",
      });

    const handleChange = (e) => {
      setFormData({
          message: e.target.value,
      });
    };

    const sendEmail = async (e) => {
            e.preventDefault();

            try {
                await emailjs.send(
                    import.meta.env.VITE_EMAILJS_SERVICE_ID,
                    import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
                    {
                        message: formData.message,
                    },
                    import.meta.env.VITE_EMAILJS_PUBLIC_KEY
                );

                alert("Message Sent!");

                setFormData({
                    message: "",
                });

            } catch (err) {
                console.error(err);
                alert("Failed to send message.");
            }
        };

        const [scope,animate] = useAnimate()

        
    const ref = useRef(null);
    const {scrollYProgress} = useScroll({
      target: ref,
      offset: ['start 80%', 'end 20%'],
    });
    
    const scroll = useSpring(scrollYProgress, {
      stiffness: 120,
      damping: 25,
      mass: 0.4,
    });

  const sectionY=useTransform(scroll,[0,1],[100,0]);
  const sectionScale=useTransform(scroll,[0,1],[.95,1]);
  const sectionOpacity=useTransform(scroll,[0,.2],[0,1]);

  const sectionBlur=useTransform(scroll,[0,.2],[15,0]);
  const sectionFilter=useMotionTemplate`blur(${sectionBlur}px)`;

  const imageY=useTransform(scroll,[0,1],[-150,150]);
  const imageScale=useTransform(scroll,[0,1],[1.15,1]);
  const imageRotate=useTransform(scroll,[0,1],[-6,6]);
  

  const headingY=useTransform(scroll,[0,.4],[80,0]);
  const headingOpacity=useTransform(scroll,[0,.2],[0,1]);
  const headingRotate=useTransform(scroll,[0,.4],[8,0]);

  const textY=useTransform(scroll,[.15,.6],[60,0]);
  const textOpacity=useTransform(scroll,[.15,.4],[0,1]);

  const textBlur=useTransform(scroll,[.15,.4],[10,0]);
  const textFilter=useMotionTemplate`blur(${textBlur}px)`;

  const calY=useTransform(scroll,[.3,.8],[60,0]);
  const calOpacity=useTransform(scroll,[.3,.6],[0,1]);
  const calScale=useTransform(scroll,[.3,.8],[.95,1]);

  const btnY=useTransform(scroll,[.45,.9],[60,0]);
  const btnOpacity=useTransform(scroll,[.45,.7],[0,1]);
  const btnScale=useTransform(scroll,[.45,.9],[.9,1]);

  const formY=useTransform(scroll,[0,1],[70,0]);
  const formOpacity=useTransform(scroll,[0,.85],[0,1]);
  const formScale=useTransform(scroll,[0,1],[.95,1]);

  const bgY=useTransform(scroll,[0,1],[0,-120]);

  return (
  <motion.div
    ref={ref}
    style={{
      ...bgStyle,
      backgroundPositionY: bgY,
    }}
    className='relative overflow-x-hidden bg-black pb-48 px-12'>

    <motion.div
      style={{
        y: sectionY,
        scale: sectionScale,
        opacity: sectionOpacity,
        filter: sectionFilter,
      }}
      className='flex flex-col lg:flex-row'>

      <motion.div
        style={{
          y: imageY,
          scale: imageScale,
          rotate: imageRotate,
        }}
        className='grayscale flex justify-center items-center'>

        <img src='/assets/images/profile-pic-bg.png' />

      </motion.div>

      <div className='flex-1'>

        <motion.h1
          style={{
            y: headingY,
            rotate: headingRotate,
            opacity: headingOpacity,
          }}
          className='text-white font-impactImp pt-10 mb-3 text-7xl lg:text-8xl'>

          NISHAN KASHYAP.

        </motion.h1>

        <motion.div
          style={{
            y: textY,
            opacity: textOpacity,
            filter: textFilter,
          }}
          className='text-white max-w-2xl'>

          {text.split(" ").map((word,index)=>(
            <motion.span
              key={word+index}
              className='inline-block'>
              {word}&nbsp;
            </motion.span>
          ))}

        </motion.div>

        <motion.div
          style={{
            y: calY,
            scale: calScale,
            opacity: calOpacity,
          }}
          className='bg-black text-white pt-10 mb-5'>

          <GitHubCalendar
            username="nishankx"
            showTotalCount={false}
          />

        </motion.div>

      <motion.div
      style={{
        y: formY,
        opacity: formOpacity,
        scale: formScale
      }}
      >  
        <motion.div
          
          className='flex gap-1 items-center flex-wrap lg:justify-start sm:justify-center'>

          <div>
            <a
              href="mailto:nishankashyapofficial@gmail.com"
              className='text-white flex backdrop-blur-xl bg-neutral-500/100 rounded-md p-3 hover:scale-105 hover:bg-white/20 transition'>

              <MdEmail className='text-2xl'/>

              <span className='px-2'>
                nishankashyapofficial@gmail.com
              </span>

            </a>
          </div>

          <div className='flex flex-wrap mx-2 gap-2 my-3 items-center'>

            <a href='https://instagram.com/nishankxp' target="_blank">
              <FaInstagramSquare className='backdrop-blur-xl bg-neutral-600/100 px-2 rounded-md text-5xl hover:bg-white/20 hover:scale-110 transition text-white'/>
            </a>

            <a href='https://x.com/nishankx' target="_blank">
              <FaSquareXTwitter className='backdrop-blur-xl bg-neutral-600/100 px-2 rounded-md text-5xl hover:bg-white/20 hover:scale-110 transition text-white'/>
            </a>

            <a href='https://www.linkedin.com/in/nishankx' target="_blank">
              <FaLinkedin className='backdrop-blur-xl bg-neutral-600/100 px-2 rounded-md text-5xl hover:bg-white/20 hover:scale-110 transition text-white'/>
            </a>

            <a href='https://github.com/nishankx' target="_blank">
              <FaGithub className='backdrop-blur-xl bg-neutral-600/100 px-2 rounded-md text-5xl hover:bg-white/20 hover:scale-110 transition text-white'/>
            </a>

            <a
              href='/assets/docs/RESUME.pdf'
              download
              className='flex w-fit backdrop-blur-xl ml-1 bg-neutral-600/100 items-center px-2 rounded-md gap-1 text-white hover:bg-white/20 hover:scale-110 transition'>

              <FaCloudDownloadAlt className='text-5xl'/>

              <p className='text-3xl'>
                Resume
              </p>

            </a>

          </div>

        </motion.div>

        <motion.form
          className='flex lg:justify-start sm:justify-center'
          onSubmit={sendEmail}>

          <input
            id="textMe"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Send a Text"
            className="focus:outline-none w-1/2 py-2 px-5 rounded-2xl lg:w-2/3 bg-white text-neutral-500"
          />

          <button
            type="submit"
            className="ml-3 px-5 py-2 rounded-xl bg-white text-neutral-700 hover:bg-neutral-300 hover:scale-110 transition">

            Send

          </button>

        </motion.form>
      </motion.div>

      </div>

    </motion.div>

  </motion.div>
);
}

export default About;
