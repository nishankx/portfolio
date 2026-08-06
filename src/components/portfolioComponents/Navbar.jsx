import React, { useState } from 'react'
import { motion } from 'motion/react'
import navItems from '../../libs/NavItems'



const Navbar = () => {
    
    const [hovered, setHovered] = useState(null);
    
    const handleHover = (idx) => setHovered(idx);
    const handleLeave = () => setHovered(null);
    const handleClick = (id) => {
        document.getElementById(id).scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        })
    }

    
    
    return (
    <motion.div
        initial={{
            opacity: 0,
            scale: 0.95,
            y:0,
        }}

        animate={{
            opacity: 1,
            scale: 1,
            y:10,
        }}

        transition={{
            duration: 3,
            ease: 'easeInOut'
        }}

        className="fixed z-50 w-full bottom-10 sm:bottom-20 lg:bottom-30 left-0 px-3">
            <nav className="mx-auto flex max-w-fit rounded-full bg-white/10 backdrop-blur-xl px-1.5 sm:px-2 py-1">
                
                {navItems.map((item, idx) => (
                    
                    <button
                        key={item.title}
                        onMouseEnter={() => handleHover(idx)}
                        onMouseLeave={handleLeave}
                        onClick={() => handleClick(item.id)}
                        className="relative flex items-center justify-center rounded-full px-2 sm:px-4 py-2 text-[10px] sm:text-xs text-neutral-500">

                            <span className="relative z-20 flex items-center justify-center gap-1 sm:gap-2 whitespace-nowrap text-neutral-500">
                                <item.icon className="text-base sm:text-xl" />{item.title}
                            </span>
                            
                            {hovered === idx && (
                                <motion.div 
                                layoutId="hover"
                                className='absolute inset-0 rounded-full w-full h-full bg-white'></motion.div>
                            )}
                            
                    </button>

                ))}
            </nav>
    </motion.div>
  )
}

export default Navbar;
