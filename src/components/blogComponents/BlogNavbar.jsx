import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link, useLocation } from 'react-router';
import { FaHome, FaPenNib, FaBookOpen, FaLock, FaUserShield } from 'react-icons/fa';
import { useAdminAuth } from '../../context/AdminAuthContext';

const BlogNavbar = ({ onOpenAdmin }) => {
    const location = useLocation();
    const { isAdmin, setIsAuthModalOpen } = useAdminAuth();
    const [hovered, setHovered] = useState(null);

    const items = [
        { title: 'Home', path: '/', icon: FaHome },
        { title: 'Blogs', path: '/blogs', icon: FaBookOpen },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed top-6 left-0 right-0 z-50 px-4 pointer-events-none"
        >
            <nav className="mx-auto flex max-w-fit items-center gap-1 sm:gap-2 rounded-full border border-white/15 bg-neutral-950/70 backdrop-blur-2xl px-2 sm:px-3 py-1.5 shadow-2xl pointer-events-auto">
                {items.map((item, idx) => {
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.title}
                            to={item.path}
                            onMouseEnter={() => setHovered(idx)}
                            onMouseLeave={() => setHovered(null)}
                            className="relative flex items-center justify-center rounded-full px-3 sm:px-5 py-2 text-xs font-mono uppercase tracking-wider text-white/70 transition hover:text-white"
                        >
                            <span className="relative z-20 flex items-center gap-1.5 whitespace-nowrap">
                                <item.icon className="text-sm" />
                                {item.title}
                            </span>

                            {(hovered === idx || isActive) && (
                                <motion.div
                                    layoutId="navHover"
                                    className={`absolute inset-0 rounded-full ${
                                        isActive ? 'bg-white/15 border border-white/20' : 'bg-white/10'
                                    }`}
                                />
                            )}
                        </Link>
                    );
                })}

                <div className="h-4 w-[1px] bg-white/20 mx-1" />

                {isAdmin ? (
                    <div className="flex items-center gap-1.5">
                        <button
                            onClick={onOpenAdmin}
                            className="relative flex items-center gap-1.5 rounded-full bg-white px-3 sm:px-4 py-2 text-xs font-mono uppercase tracking-wider text-black transition hover:bg-neutral-200 active:scale-95"
                        >
                            <FaPenNib className="text-xs" />
                            <span className="hidden sm:inline">Write</span>
                        </button>
                        <button
                            onClick={() => setIsAuthModalOpen(true)}
                            title="Admin Session"
                            className="flex items-center justify-center rounded-full h-8 w-8 text-emerald-400 hover:text-emerald-300 hover:bg-white/10 transition"
                        >
                            <FaUserShield className="text-sm" />
                        </button>
                    </div>
                ) : (
                    <button
                        onClick={() => setIsAuthModalOpen(true)}
                        title="Admin Login (or Ctrl+Shift+A)"
                        className="flex items-center justify-center rounded-full h-8 w-8 text-white/40 hover:text-white hover:bg-white/10 transition"
                    >
                        <FaLock className="text-xs" />
                    </button>
                )}
            </nav>
        </motion.div>
    );
};

export default BlogNavbar;
