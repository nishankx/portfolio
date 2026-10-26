import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { bgStyle } from '../../libs/settings';
import { fetchBlogs } from '../../libs/blogApi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import BlogNavbar from '../../components/blogComponents/BlogNavbar';
import BlogCard from '../../components/blogComponents/BlogCard';
import NewsletterCard from '../../components/blogComponents/NewsletterCard';
import { FaSearch, FaPenNib, FaRedo } from 'react-icons/fa';

const BlogsPage = () => {
    const { isAdmin, openEditor } = useAdminAuth();
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState('ALL');

    const loadBlogs = async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await fetchBlogs();
            setBlogs(data);
        } catch (err) {
            setError('Unable to load articles. Please ensure the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadBlogs();
    }, []);

    // Extract unique tags from loaded blogs
    const allTags = ['ALL', ...new Set(blogs.flatMap((b) => b.tags || []))];

    // Filter blogs based on search term and selected tag
    const filteredBlogs = blogs.filter((blog) => {
        const matchesTag =
            selectedTag === 'ALL' || (blog.tags && blog.tags.includes(selectedTag));
        const matchesSearch =
            blog.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.excerpt?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            blog.content?.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesTag && matchesSearch;
    });

    const handleBlogSaved = (newOrUpdated) => {
        setBlogs((prev) => {
            const index = prev.findIndex((b) => b._id === newOrUpdated._id);
            if (index !== -1) {
                const next = [...prev];
                next[index] = newOrUpdated;
                return next;
            }
            return [newOrUpdated, ...prev];
        });
    };

    return (
        <div style={bgStyle} className="relative min-h-screen text-white overflow-hidden px-[clamp(1rem,4vw,4rem)] py-24 sm:py-28">
            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[50rem] w-[50rem] -translate-x-1/2 rounded-full bg-white/5 blur-[220px]" />

            {/* Navigation Bar */}
            <BlogNavbar onOpenAdmin={() => openEditor(null, handleBlogSaved)} isAdmin={isAdmin} />

            {/* Header Section */}
            <header className="max-w-6xl mx-auto mb-14">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
                        THOUGHTS & WRITE-UPS
                    </p>
                    <h1 className="mt-2 font-impactImp text-[clamp(3.5rem,8vw,7rem)] leading-none tracking-tight">
                        Blogs
                    </h1>
                    <div className="mt-4 h-[2px] w-72 bg-white" />
                    <p className="mt-5 max-w-2xl font-colitez text-white/70 text-lg sm:text-xl leading-relaxed">
                        Documenting the questions I ask, the things I build, the ideas I explore, and the person I become along the way
                    </p>
                </motion.div>

                {/* Search & Tag Filter Bar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    className="mt-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-8"
                >
                    {/* Tag filter pills */}
                    <div className="flex flex-wrap items-center gap-2">
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(tag)}
                                className={`rounded-full px-4 py-1.5 font-mono text-xs uppercase tracking-wider transition ${
                                    selectedTag === tag
                                        ? 'bg-white text-black font-medium'
                                        : 'border border-white/15 bg-white/5 text-white/70 hover:border-white/30 hover:text-white'
                                }`}
                            >
                                {tag}
                            </button>
                        ))}
                    </div>

                    {/* Search Input */}
                    <div className="relative min-w-[260px] sm:min-w-[320px]">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 text-xs" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search blogs..."
                            className="w-full rounded-full border border-white/15 bg-white/5 pl-10 pr-4 py-2 font-mono text-xs text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition"
                        />
                    </div>
                </motion.div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-6xl mx-auto">
                {/* Loading State */}
                {loading && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3].map((n) => (
                            <div
                                key={n}
                                className="h-[380px] rounded-3xl border border-white/10 bg-white/5 animate-pulse p-8"
                            />
                        ))}
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center max-w-lg mx-auto">
                        <p className="font-colitez text-lg text-red-300">{error}</p>
                        <button
                            onClick={loadBlogs}
                            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs uppercase text-black hover:bg-neutral-200 transition"
                        >
                            <FaRedo className="text-xs" /> Retry
                        </button>
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && filteredBlogs.length === 0 && (
                    <div className="rounded-3xl border border-white/15 bg-white/5 p-12 text-center max-w-md mx-auto">
                        <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
                            NO POSTS FOUND
                        </p>
                        <p className="mt-3 font-colitez text-white/70 text-lg">
                            {searchTerm || selectedTag !== 'ALL'
                                ? 'No blogs match your search or filter.'
                                : 'No blogs published yet.'}
                        </p>
                        {isAdmin && (
                            <button
                                onClick={() => openEditor(null, handleBlogSaved)}
                                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs uppercase text-black hover:bg-neutral-200 transition"
                            >
                                <FaPenNib className="text-xs" /> Write First Blog
                            </button>
                        )}
                    </div>
                )}

                {/* Blog Cards Grid */}
                {!loading && !error && filteredBlogs.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog, idx) => (
                            <motion.div
                                key={blog._id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.08, duration: 0.5 }}
                            >
                                <BlogCard blog={blog} />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Newsletter Subscription Section */}
                <div className="mt-20">
                    <NewsletterCard />
                </div>
            </main>
        </div>
    );
};

export default BlogsPage;
