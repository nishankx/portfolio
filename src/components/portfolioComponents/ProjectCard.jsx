import { motion } from "motion/react";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import { useState } from "react";

const ProjectCard = ({
  title,
  techStack,
  oneLineDesc,
  miniDescription,
  github,
  demo,
  date,
}) => {

  const [hovered, setHovered] = useState(false);

  return (
    <div
  className="relative w-full h-full rounded-3xl overflow-hidden"
  onMouseEnter={() => setHovered(true)}
  onMouseLeave={() => setHovered(false)}
>

      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-between bg-neutral-950 text-white">


        <div>

          <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
            PROJECT
          </p>

          <h1 className="font-impact text-[clamp(2rem,4vw,4rem)] leading-none mt-2">
            {title}
          </h1>

          <p className="mt-3 font-colitez text-white/70 text-lg leading-relaxed">
            {oneLineDesc}
          </p>

        </div>


        <div>

          <h2 className="font-impact uppercase tracking-[.2em] text-lg mb-3">
            Overview
          </h2>

          <p className="font-colitez text-white/75 leading-7">
            {miniDescription}
          </p>

        </div>

        <div>

          <h2 className="font-impact uppercase tracking-[.2em] text-lg mb-3">
            Tech Stack
          </h2>

          <div className="flex flex-wrap gap-2">

            {techStack.map((tech) => (

              <span
                key={tech}
                className="
                  rounded-full
                  border
                  border-white/20
                  px-3
                  py-1
                  font-mono
                  text-xs
                  text-white/80
                "
              >
                {tech}
              </span>

            ))}

          </div>

        </div>


        <div className="flex items-end justify-between">

          <div className="flex gap-3">

            {github && (

              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  border
                  border-white/20
                  px-5
                  py-3
                  transition
                  hover:bg-white/10
                "
              >
                <FaGithub />
                GitHub
              </a>

            )}

            {demo && (

              <a
                href={demo}
                target="_blank"
                rel="noreferrer"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  bg-white
                  px-5
                  py-3
                  text-black
                "
              >
                <HiOutlineExternalLink />
                Live Demo
              </a>

            )}

          </div>

          <div className="text-right">

            <p className="font-mono text-xs uppercase tracking-[.35em] text-white/40">
              Build
            </p>

            <h2 className="mt-2 font-impact text-3xl">
              {date}
            </h2>

          </div>

        </div>

      </div>

      <motion.div
          initial={false}

          animate={{
            opacity: hovered ? 0 : 1,
            scale: hovered ? 0.95 : 1,
            filter: hovered ? "blur(10px)" : "blur(0px)",
          }}
          transition={{
              duration: 0.25,
              ease: "easeInOut",
            }}
          className={`
                      absolute
                      inset-0
                      z-20
                      overflow-hidden
                      rounded-3xl
                      border
                      border-white/15
                      bg-white/10
                      backdrop-blur-2xl
                      shadow-2xl
                      ${hovered ? "pointer-events-none" : "pointer-events-auto"}
                      `}
          >


  <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-white/10 blur-[120px]" />

  <div className="relative flex h-full flex-col items-center justify-center px-8">

    <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
      PROJECT
    </p>

    <h1
      className="
        mt-3
        font-impact
        text-center
        leading-none
        tracking-tight
        text-white
        text-[clamp(2.5rem,6vw,5rem)]
      "
    >
      {title}
    </h1>

    <p
      className="
        mt-5
        max-w-xl
        text-center
        font-colitez
        leading-relaxed
        text-white/70
        text-[clamp(.9rem,1vw,1rem)]
      "
    >
      {oneLineDesc}
    </p>

    <div className="mt-8 flex items-center gap-2">

      <div className="h-[1px] w-12 bg-white/30" />

      <p className="font-mono text-xs uppercase tracking-[.3em] text-white/50">
        Hover to Explore
      </p>

      <div className="h-[1px] w-12 bg-white/30" />

    </div>

  </div>

</motion.div>    </div>
  );
};

export default ProjectCard;