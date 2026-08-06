import React, { useRef } from "react";
import ProjectCard from "../ProjectCard";
import projects from "../../../libs/projectLib";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

const bgStyle = {
  backgroundColor: "#000",
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

const Projects = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 105%", "center 85%"],
  });

  const scroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.45,
  });

  const sectionY = useTransform(scroll, [0, 1], [0, 0]);
  const sectionScale = useTransform(scroll, [0, 1], [0.96, 1]);
  const sectionOpacity = useTransform(scroll, [0, 0.25], [0, 1]);

  const sectionBlur = useTransform(scroll, [0, 0.2], [16, 0]);
  const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`;

  const bgY = useTransform(scroll, [0, 1], [0, -140]);

  const glowScale = useTransform(scroll, [0, 1], [0.8, 1.25]);
  const glowOpacity = useTransform(scroll, [0, 1], [0.08, 0.28]);

  const headingY = useTransform(scroll,[0,.25],[40,0]);
  const headingOpacity = useTransform(scroll, [0, 0.2], [0, 1]);
  const headingScale = useTransform(scroll, [0, 0.35], [0.9, 1]);
  const headingRotate = useTransform(scroll, [0, 0.35], [6, 0]);

  const headingBlur = useTransform(scroll, [0, 0.2], [18, 0]);

  const headingFilter = useMotionTemplate`blur(${headingBlur}px)`;

  const underlineScale = useTransform(scroll,[0.15, 0.45],[0, 1]);


  const gridY = useTransform(scroll, [0.2, 0.8], [1, 0]);

  const gridOpacity = useTransform(scroll, [0.15, 0.4], [0, 1]);

  const gridScale = useTransform(scroll, [0.2, 0.8], [0.96, 1]);

  const gridRotateX = useTransform(scroll, [0.15, 0.6], [8, 0]); 
  
  return (
    <motion.section
      ref={ref}
      style={{
        ...bgStyle,
        backgroundPositionY: bgY,
      }}
      className="relative min-h-screen overflow-hidden px-[clamp(1rem,3vw,3rem)] py-16 text-white"
    >
  
      <motion.div
        style={{
          scale: glowScale,
          opacity: glowOpacity,
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[65rem] w-[65rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[220px]"/>


      <motion.div
        style={{
            opacity: sectionOpacity,
        }}
        >
      
        <motion.div
          style={{
            y: headingY,
            scale: headingScale,
            rotate: headingRotate,
            opacity: headingOpacity,
            filter: headingFilter,
          }}
          className="mb-14"
        >
          <h1 className=" font-impact text-[clamp(4rem,9vw,8rem)] leading-none">
            Projects
          </h1>

          <motion.div
            style={{
              scaleX: underlineScale,
              originX: 0,
            }}
            className="mt-4 h-[2px] w-72 bg-white"
          />
        </motion.div>

        <motion.div
          style={{
            opacity: gridOpacity,
            scale: gridScale,
            rotateX: gridRotateX,
            transformPerspective: 1800,
            transformStyle: "preserve-3d",
          }}
          className="
            grid
            grid-cols-1
            gap-5
            auto-rows-[40rem]
            lg:grid-cols-2
          ">
            {projects.map((project, index) => {

                    const cardRef = useRef(null);
                    const { scrollYProgress } = useScroll({
                      target: cardRef,
                      offset: ["start 95%", "center 60%"],
                    });
              
                    const progress = useSpring(scrollYProgress, {
                      stiffness: 120,
                      damping: 22,
                    });
              
                    const y = useTransform(progress, [0, 1], [400, 0]);
                    const rotateX = useTransform(progress, [0, 1], [75, 0]);
                    const rotateY = useTransform(progress,[0, 1],[index % 2 === 0 ? -20 : 20, 0]);
                    const rotateZ = useTransform(progress,[0, 1],[index % 2 === 0 ? -5 : 5, 0]);
                    const scale = useTransform(progress, [0, 1], [0.82, 1]);
                    const opacity = useTransform(progress, [0, .35], [0, 1]);
                    const blur = useTransform(progress, [0, 1], [24, 0]);
                    const filter = useMotionTemplate`blur(${blur}px)`;

                      return (
                        <motion.div
                          ref={cardRef}
                          key={project.id}
                          style={{
                            y,
                            rotateX,
                            rotateY,
                            rotateZ,
                            scale,
                            opacity,
                            filter,
                            transformPerspective: 2000,
                            transformStyle: "preserve-3d",
                          }}
                          className={`
                            h-full
                            ${
                              index === 0
                                ? "lg:col-span-2"
                                : index === 3
                                ? "lg:row-span-2"
                                : ""
                            }
                          `}
                        >
                          <ProjectCard {...project} />
                        </motion.div>
                      );
                    })}
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{
          delay: 0.8,
          duration: 1.2,
        }}
        className="
          pointer-events-none
          absolute
          bottom-0
          left-0
          h-40
          w-full
          bg-gradient-to-t
          from-black
          via-black/40
          to-transparent
        "
      />
    </motion.section>
  );
};

export default Projects;