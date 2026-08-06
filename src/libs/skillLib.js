import {
  SiC,
  SiCplusplus,
  SiPython,
  SiOpenjdk,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,

  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiThreedotjs,

  SiNodedotjs,
  SiExpress,
  SiDjango,
  SiFastapi,

  SiMysql,
  SiMongodb,
  SiSqlite,
  SiSupabase,

  SiFigma,
  SiPostman,
  SiFirebase,
  SiVite,
  SiLinux,
  SiGit,
  SiGithub,
  SiVercel,
} from "react-icons/si";


const skills = [
  {
    id: 1,
    techType: "Programming Languages",
    technologies: [
      { name: "C", icon: SiC, color: "#A8B9CC" },
      { name: "C++", icon: SiCplusplus, color: "#00599C" },
      { name: "Python", icon: SiPython, color: "#3776AB" },
      { name: "Java", icon: SiOpenjdk, color: "#EA2D2E" },
      { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
    ],
  },

  {
    id: 2,
    techType: "Frontend Development",
    technologies: [
      { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
      { name: "CSS3", icon: SiCss, color: "#1572B6" },
      { name: "React", icon: SiReact, color: "#61DAFB" },
      { name: "Motion", icon: SiFramer, color: "#0055FF" },
      { name: "Next.js", icon: SiNextdotjs, color: "#FFFFFF" },
      { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
      { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
    ],
  },

  {
    id: 3,
    techType: "Backend Development",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs, color: "#5FA04E" },
      { name: "Express", icon: SiExpress, color: "#FFFFFF" },
      { name: "FastAPI", icon: SiFastapi, color: "#009688" },
      { name: "Django", icon: SiDjango, color: "#092E20" },
    ],
  },

  {
    id: 4,
    techType: "Databases",
    technologies: [
      { name: "MySQL", icon: SiMysql, color: "#4479A1" },
      { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
      { name: "SQLite", icon: SiSqlite, color: "#003B57" },
      { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
    ],
  },

  {
    id: 5,
    techType: "Developer Tools",
    technologies: [
      { name: "Figma", icon: SiFigma, color: "#F24E1E" },
      { name: "Postman", icon: SiPostman, color: "#FF6C37" },
      { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
      { name: "Vite", icon: SiVite, color: "#646CFF" },
      { name: "Linux", icon: SiLinux, color: "#FCC624" },
      { name: "Git", icon: SiGit, color: "#F05032" },
      { name: "GitHub", icon: SiGithub, color: "#FFFFFF" },
      { name: "Vercel", icon: SiVercel, color: "#FFFFFF" },
    ],
  },
];

export default skills;