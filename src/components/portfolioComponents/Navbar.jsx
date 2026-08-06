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

        className='fixed z-50 w-full bottom-20 left-0'>
            <nav className='max-w-xl mx-auto flex backdrop-blur-xl rounded-full bg-white/10'>
                
                {navItems.map((item, idx) => (
                    
                    <button
                        key={item.title}
                        onMouseEnter={() => handleHover(idx)}
                        onMouseLeave={handleLeave}
                        onClick={() => handleClick(item.id)}
                        className='relative w-full inline-block py-3 text-center text-xs text-neutral-500'>

                            <span className='relative flex gap-2 z-20 justify-center items-center group-hover:text-neutral-400 text-neutral-500'>
                                <item.icon className='text-xl'/>{item.title}
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
