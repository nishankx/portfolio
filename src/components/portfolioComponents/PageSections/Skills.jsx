import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionTemplate,
} from "motion/react";

import skills from "../../../libs/skillLib";
import SkillCard from "../SkillCard";

const cardStyle = {
  backgroundColor: "#000",
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

const Skills = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 15%"],
  });

  const scroll = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.45,
  });

  const headingY = useTransform(scroll, [0, 0.35], [120, 0]);
  const headingOpacity = useTransform(scroll, [0, 0.2], [0, 1]);
  const headingScale = useTransform(scroll, [0, 0.35], [0.9, 1]);
  const headingRotate = useTransform(scroll, [0, 0.35], [6, 0]);

  const headingBlur = useTransform(scroll, [0, 0.2], [18, 0]);

  const headingFilter = useMotionTemplate`blur(${headingBlur}px)`;

  const underlineScale = useTransform(scroll,[0.15, 0.45],[0, 1]);

  return (
    <section
      ref={ref}
      style={cardStyle}
      className="py-16"
    >
      <div className="px-[clamp(.75rem,2vw,2.5rem)]">
        <motion.div
          style={{
            y: headingY,
            opacity: headingOpacity,
            scale: headingScale,
            rotate: headingRotate,
            filter: headingFilter,
          }}
          className="mb-14"
        >
          <h1 className="mt-3 font-impact text-[clamp(4rem,9vw,8rem)] leading-none text-white">
            Skills
          </h1>

          <motion.div
            style={{
              scaleX: underlineScale,
              originX: 0,
            }}
            className="mt-4 h-[2px] w-72 bg-white"
          />
        </motion.div>

        <div className="flex flex-col gap-[1px] rounded-md bg-neutral-300 p-[1px]">


          <SkillCard
            {...skills[0]}
            large
          />

          <div className="flex flex-col lg:flex-row gap-[1px]">
            <SkillCard {...skills[1]} />
            <SkillCard {...skills[2]} />
          </div>


          <div className="flex flex-col lg:flex-row gap-[1px]">
            <SkillCard {...skills[3]} />
            <SkillCard {...skills[4]} />
          </div>

        </div>

      </div>
    </section>
  );
};

export default Skills;