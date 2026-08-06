import { motion } from "motion/react";

const cardStyle = {
  backgroundColor: "#000",
  backgroundImage:
    "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
  backgroundSize: "26px 26px",
};

const SkillCard = ({ techType, technologies, large = false }) => {

  return (
    <div
      className={`
        relative
        flex-1
        overflow-hidden
        rounded-md
        bg-neutral-900
        ${large ? "min-h-[18rem]" : "min-h-[16rem]"}
      `}
    >


      <div className="absolute inset-0 z-10 flex items-center justify-center p-4 sm:p-6 lg:p-8">

        <div
          className="
            grid
            w-full
            max-w-xl
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-4
            place-items-center
            gap-4
            sm:gap-6
            lg:gap-8
          "
        >
          {technologies.map(({ name, icon: Icon, color }) => (
            <div
              key={name}
              className="flex items-center justify-center"
              title={name}
            >
              {Icon ? (
                <Icon
                  color={color}
                  className="
                    text-[2rem]
                    sm:text-[2.5rem]
                    lg:text-[4rem]
                    transition-transform
                    duration-300
                    hover:scale-110
                  "
                />
              ) : (
                <span className="text-xs text-red-500">
                  {name}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>


      <motion.div
        initial={{
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}

       whileTap={{
        opacity:0,
       }}
       
       whileHover={{
          opacity: 0,
          scale: 0.98,
          filter: "blur(6px)",
        }}
        transition={{
          duration: 0.22,
          ease: "easeInOut",
        }}
        style={cardStyle}
        className="
                  absolute
                  inset-0
                  z-20
                  flex
                  flex-col
                  items-center
                  justify-center
                  rounded-md
                  bg-neutral-900/95
                  backdrop-blur-xl
                  border
                  border-white/10
                  p-6
                  sm:p-8
                  text-center
                  text-white
                  "
      >
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.45em] text-white/40">
          CATEGORY
        </p>

        <h2
          className="
            font-miloner
            leading-tight
            text-[clamp(1.4rem,3vw,3rem)]
          "
        >
          {techType}
        </h2>

        <div className="mt-8 flex items-center gap-2">

          <div className="h-px w-10 bg-white/25" />

          <span className="hover-label font-mono text-[11px] uppercase tracking-[0.35em] text-white/50">
          </span>

          <div className="h-px w-10 bg-white/25" />

        </div>

      </motion.div>


      <div className="pointer-events-none absolute bottom-4 left-0 right-0 z-0 hidden px-4 md:block">

        <div className="flex flex-wrap justify-center gap-2">

          {technologies.map(({ name }) => (
            <span
              key={name}
              className="
                rounded-full
                border
                border-white/10
                bg-white/5
                px-2
                py-1
                font-mono
                text-[10px]
                text-white/50
              "
            >
              {name}
            </span>
          ))}

        </div>

      </div>
    </div>
  );
};

export default SkillCard;