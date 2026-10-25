import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
import { HiArrowUpRight } from 'react-icons/hi2';
import { FaClock } from 'react-icons/fa';

const BlogCard = ({ blog }) => {
    const [hovered, setHovered] = useState(false);
    const identifier = blog.slug || blog._id;
    const formattedDate = blog.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
          })
        : '';

    return (
        <Link
            to={`/blogs/${identifier}`}
            className="group relative block w-full h-full"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="relative flex flex-col justify-between h-full min-h-[380px] rounded-3xl border border-white/15 bg-neutral-950 p-6 sm:p-8 text-white overflow-hidden transition-all duration-300 group-hover:border-white/30">
                {/* Background ambient glow on hover */}
                <div
                    className={`pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-[100px] transition-opacity duration-500 ${
                        hovered ? 'opacity-100' : 'opacity-40'
                    }`}
                />

                {/* Top Section: Tag and Date */}
                <div>
                    <div className="flex items-center justify-between gap-4">
                        <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
                            {blog.tags && blog.tags.length > 0 ? blog.tags[0] : 'ARTICLE'}
                        </p>
                        <span className="font-mono text-xs text-white/40">{formattedDate}</span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-4 font-impactImp text-2xl sm:text-3xl lg:text-4xl leading-tight tracking-tight text-white group-hover:text-neutral-200 transition">
                        {blog.title}
                    </h2>

                    {/* Excerpt */}
                    <p className="mt-3 font-colitez text-white/70 text-base sm:text-lg leading-relaxed line-clamp-3">
                        {blog.excerpt || (blog.content ? blog.content.substring(0, 140) + '...' : '')}
                    </p>
                </div>

                {/* Bottom Section: Tags, Read Time, and Action */}
                <div className="mt-6 pt-6 border-t border-white/10 flex items-end justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {blog.tags &&
                            blog.tags.slice(0, 3).map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded-full border border-white/20 bg-white/5 px-3 py-0.5 font-mono text-[11px] text-white/80"
                                >
                                    #{tag}
                                </span>
                            ))}

                        {blog.readTime && (
                            <span className="flex items-center gap-1 font-mono text-xs text-white/50 ml-1">
                                <FaClock className="text-[10px]" />
                                {blog.readTime}
                            </span>
                        )}
                    </div>

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/20 bg-white/5 text-white transition-transform duration-300 group-hover:bg-white group-hover:text-black group-hover:scale-105">
                        <HiArrowUpRight className="text-lg" />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default BlogCard;
