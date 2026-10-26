import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { bgStyle } from '../../libs/settings';
import { fetchBlogByIdOrSlug } from '../../libs/blogApi';
import { useAdminAuth } from '../../context/AdminAuthContext';
import BlogNavbar from '../../components/blogComponents/BlogNavbar';
import NewsletterCard from '../../components/blogComponents/NewsletterCard';
import BroadcastModal from '../../components/blogComponents/BroadcastModal';
import { FaArrowLeft, FaClock, FaCalendarAlt, FaPen, FaShareAlt, FaPaperPlane } from 'react-icons/fa';

// Helper to render markdown content with clean styling matching the design
const renderContent = (content) => {
    if (!content) return null;

    const lines = content.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBuffer = [];
    let paragraphBuffer = [];

    const flushParagraph = (key) => {
        if (paragraphBuffer.length > 0) {
            elements.push(
                <p key={key} className="font-colitez text-lg sm:text-xl text-white/80 leading-relaxed my-4">
                    {paragraphBuffer.join(' ')}
                </p>
            );
            paragraphBuffer = [];
        }
    };

    lines.forEach((line, idx) => {
        const trimmed = line.trim();

        if (trimmed.startsWith('```')) {
            flushParagraph(`p-${idx}`);
            if (inCodeBlock) {
                elements.push(
                    <pre
                        key={`code-${idx}`}
                        className="my-6 overflow-x-auto rounded-2xl border border-white/15 bg-white/5 p-5 font-mono text-xs sm:text-sm text-neutral-200"
                    >
                        <code>{codeBuffer.join('\n')}</code>
                    </pre>
                );
                codeBuffer = [];
                inCodeBlock = false;
            } else {
                inCodeBlock = true;
            }
            return;
        }

        if (inCodeBlock) {
            codeBuffer.push(line);
            return;
        }

        if (trimmed.startsWith('# ')) {
            flushParagraph(`p-${idx}`);
            elements.push(
                <h1 key={`h1-${idx}`} className="font-impactImp text-3xl sm:text-5xl mt-10 mb-4 text-white">
                    {trimmed.replace('# ', '')}
                </h1>
            );
            return;
        }

        if (trimmed.startsWith('## ')) {
            flushParagraph(`p-${idx}`);
            elements.push(
                <h2 key={`h2-${idx}`} className="font-impactImp text-2xl sm:text-4xl mt-8 mb-3 text-white">
                    {trimmed.replace('## ', '')}
                </h2>
            );
            return;
        }

        if (trimmed.startsWith('### ')) {
            flushParagraph(`p-${idx}`);
            elements.push(
                <h3 key={`h3-${idx}`} className="font-impactImp text-xl sm:text-2xl mt-6 mb-2 text-white/90">
                    {trimmed.replace('### ', '')}
                </h3>
            );
            return;
        }

        if (trimmed.startsWith('> ')) {
            flushParagraph(`p-${idx}`);
            elements.push(
                <blockquote
                    key={`quote-${idx}`}
                    className="my-6 border-l-2 border-white pl-5 py-1 font-colitez text-xl text-white/90 italic"
                >
                    {trimmed.replace('> ', '')}
                </blockquote>
            );
            return;
        }

        if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            flushParagraph(`p-${idx}`);
            elements.push(
                <li key={`li-${idx}`} className="font-colitez text-lg text-white/80 ml-6 list-disc my-1">
                    {trimmed.replace(/^[-*]\s+/, '')}
                </li>
            );
            return;
        }

        if (!trimmed) {
            flushParagraph(`p-${idx}`);
        } else {
            paragraphBuffer.push(line);
        }
    });

    flushParagraph('p-final');
    return elements;
};

const BlogDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { isAdmin, openEditor } = useAdminAuth();
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [copied, setCopied] = useState(false);
    const [broadcastOpen, setBroadcastOpen] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
        const loadBlog = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchBlogByIdOrSlug(slug);
                if (!data) {
                    setError('Article not found.');
                } else {
                    setBlog(data);
                }
            } catch (err) {
                setError('Failed to load article.');
            } finally {
                setLoading(false);
            }
        };

        loadBlog();
    }, [slug]);

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formattedDate = blog?.createdAt
        ? new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
          })
        : '';

    return (
        <div style={bgStyle} className="relative min-h-screen text-white overflow-hidden px-[clamp(1rem,4vw,4rem)] py-24 sm:py-28">
            <BlogNavbar onOpenAdmin={() => openEditor()} isAdmin={isAdmin} />

            {/* Ambient Lighting */}
            <div className="pointer-events-none absolute left-1/2 top-40 -z-10 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-white/5 blur-[250px]" />

            <div className="max-w-4xl mx-auto">
                {/* Back to blogs link */}
                <Link
                    to="/blogs"
                    className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-white/50 hover:text-white transition mb-8"
                >
                    <FaArrowLeft className="text-[10px]" /> Back to all blogs
                </Link>

                {/* Loading State */}
                {loading && (
                    <div className="space-y-6 animate-pulse">
                        <div className="h-6 w-32 rounded bg-white/10" />
                        <div className="h-16 w-3/4 rounded bg-white/10" />
                        <div className="h-4 w-48 rounded bg-white/10" />
                        <div className="h-80 w-full rounded-3xl bg-white/5 mt-10" />
                    </div>
                )}

                {/* Error State */}
                {!loading && error && (
                    <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-12 text-center my-12">
                        <p className="font-colitez text-2xl text-red-300">{error}</p>
                        <Link
                            to="/blogs"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 font-mono text-xs uppercase text-black hover:bg-neutral-200 transition"
                        >
                            Return to Blogs
                        </Link>
                    </div>
                )}

                {/* Article Reader View */}
                {!loading && blog && (
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Tags and Meta */}
                        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6 mb-8">
                            <div className="flex flex-wrap items-center gap-2">
                                {blog.tags &&
                                    blog.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="rounded-full border border-white/20 bg-white/5 px-3 py-1 font-mono text-xs text-white/80"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                            </div>

                            <div className="flex items-center gap-4 text-xs font-mono text-white/40">
                                <span className="flex items-center gap-1.5">
                                    <FaCalendarAlt className="text-[10px]" />
                                    {formattedDate}
                                </span>
                                {blog.readTime && (
                                    <span className="flex items-center gap-1.5">
                                        <FaClock className="text-[10px]" />
                                        {blog.readTime}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <h1 className="font-impactImp text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-tight text-white mb-6">
                            {blog.title}
                        </h1>

                        {/* Author Bar & Actions */}
                        <div className="flex items-center justify-between py-4 border-y border-white/10 mb-10 text-white/60">
                            <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-full bg-white text-black font-impactImp flex items-center justify-center text-sm">
                                    N
                                </div>
                                <div>
                                    <p className="font-mono text-xs text-white uppercase tracking-wider">Nishan</p>
                                    <p className="font-colitez text-xs text-white/50">Author</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handleShare}
                                    className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
                                >
                                    <FaShareAlt className="text-xs" />
                                    {copied ? 'Copied Link!' : 'Share'}
                                </button>
                                {isAdmin && (
                                    <>
                                        <button
                                            onClick={() => setBroadcastOpen(true)}
                                            className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-300 hover:bg-emerald-500/20 transition shadow-sm"
                                            title="Broadcast this blog to newsletter subscribers"
                                        >
                                            <FaPaperPlane className="text-[10px]" /> Broadcast
                                        </button>
                                        <button
                                            onClick={() => openEditor(blog, (updated) => setBlog(updated), () => navigate('/blogs'))}
                                            className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 hover:bg-white/10 hover:text-white transition"
                                        >
                                            <FaPen className="text-xs" /> Edit
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Broadcast Modal */}
                        <BroadcastModal
                            isOpen={broadcastOpen}
                            onClose={() => setBroadcastOpen(false)}
                            blog={blog}
                        />

                        {/* Optional Cover Image */}
                        {blog.coverImage && (
                            <div className="mb-12 overflow-hidden rounded-3xl border border-white/15">
                                <img
                                    src={blog.coverImage}
                                    alt={blog.title}
                                    className="w-full max-h-[500px] object-cover"
                                />
                            </div>
                        )}

                        {/* Excerpt callout */}
                        {blog.excerpt && (
                            <div className="my-8 rounded-2xl border border-white/15 bg-white/5 p-6">
                                <p className="font-colitez text-xl text-white/90 italic leading-relaxed">
                                    "{blog.excerpt}"
                                </p>
                            </div>
                        )}

                        {/* Full Content Body */}
                        <div className="prose prose-invert max-w-none my-10">
                            {renderContent(blog.content)}
                        </div>

                        {/* Newsletter Subscription Section */}
                        <div className="my-16">
                            <NewsletterCard
                                source={`blog_article_${blog.slug || blog._id}`}
                                title="Liked this piece? Get the next one."
                                subtitle="I share deep dives on full-stack systems, 3D graphics, and lessons learned while building. Straight to your inbox."
                            />
                        </div>

                        {/* Footer Navigation */}
                        <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                            <Link
                                to="/blogs"
                                className="inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs uppercase tracking-wider text-white hover:bg-white/10 transition"
                            >
                                <FaArrowLeft className="text-xs" /> All Blogs
                            </Link>

                            <button
                                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                className="font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white transition"
                            >
                                Back to Top ↑
                            </button>
                        </div>
                    </motion.article>
                )}
            </div>
        </div>
    );
};

export default BlogDetailPage;
