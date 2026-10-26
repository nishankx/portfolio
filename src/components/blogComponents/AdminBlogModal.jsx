import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaLock, FaKey, FaTrash, FaPaperPlane } from 'react-icons/fa';
import { createBlog, updateBlog, deleteBlog } from '../../libs/blogApi';

const AdminBlogModal = ({ isOpen, onClose, existingBlog = null, onSaved, onDeleted }) => {
    const [adminKey, setAdminKey] = useState('');
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState('');
    const [tags, setTags] = useState('');
    const [coverImage, setCoverImage] = useState('');
    const [isPublished, setIsPublished] = useState(true);
    const [notifySubscribers, setNotifySubscribers] = useState(false);
    const [customNote, setCustomNote] = useState('');

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Load stored admin key from localStorage
        const storedKey = localStorage.getItem('portfolio_admin_key');
        if (storedKey) setAdminKey(storedKey);

        if (existingBlog) {
            setTitle(existingBlog.title || '');
            setSlug(existingBlog.slug || '');
            setExcerpt(existingBlog.excerpt || '');
            setContent(existingBlog.content || '');
            setTags(existingBlog.tags ? existingBlog.tags.join(', ') : '');
            setCoverImage(existingBlog.coverImage || '');
            setIsPublished(existingBlog.isPublished !== undefined ? existingBlog.isPublished : true);
            setNotifySubscribers(false);
        } else {
            setTitle('');
            setSlug('');
            setExcerpt('');
            setContent('');
            setTags('');
            setCoverImage('');
            setIsPublished(true);
            setNotifySubscribers(true);
        }
        setError('');
        setSuccessMessage('');
    }, [existingBlog, isOpen]);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!adminKey.trim()) {
            setError('Please provide your Admin Secret Key.');
            return;
        }

        if (!title.trim() || !content.trim()) {
            setError('Title and Content are required.');
            return;
        }

        setLoading(true);
        // Persist admin key in localStorage for convenience
        localStorage.setItem('portfolio_admin_key', adminKey.trim());

        const parsedTags = tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

        const payload = {
            title: title.trim(),
            content: content.trim(),
            excerpt: excerpt.trim() || undefined,
            slug: slug.trim() || undefined,
            coverImage: coverImage.trim() || undefined,
            tags: parsedTags,
            isPublished,
            notifySubscribers: Boolean(notifySubscribers),
            isUpcoming: !isPublished,
            customNote: customNote.trim() || undefined,
        };

        try {
            if (existingBlog) {
                const updated = await updateBlog(existingBlog._id, payload, adminKey.trim());
                setSuccessMessage(
                    notifySubscribers
                        ? (isPublished ? 'Post updated & newsletter subscribers notified!' : 'Post updated & upcoming preview broadcasted!')
                        : 'Post updated successfully!'
                );
                setTimeout(() => {
                    if (onSaved) onSaved(updated);
                    onClose();
                }, 900);
            } else {
                const created = await createBlog(payload, adminKey.trim());
                setSuccessMessage(
                    notifySubscribers
                        ? (isPublished ? 'Post published & newsletter subscribers notified!' : 'Post created & upcoming preview broadcasted!')
                        : 'Post created successfully!'
                );
                setTimeout(() => {
                    if (onSaved) onSaved(created);
                    onClose();
                }, 900);
            }
        } catch (err) {
            setError(err.message || 'Operation failed');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        if (!existingBlog) return;
        if (!window.confirm('Are you sure you want to permanently delete this blog?')) return;

        setLoading(true);
        try {
            await deleteBlog(existingBlog._id, adminKey.trim());
            setSuccessMessage('Post deleted.');
            setTimeout(() => {
                if (onDeleted) onDeleted(existingBlog._id);
                onClose();
            }, 600);
        } catch (err) {
            setError(err.message || 'Failed to delete blog');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/20 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/10">
                        <div>
                            <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
                                ADMIN CONSOLE
                            </p>
                            <h2 className="mt-1 font-impactImp text-3xl tracking-tight">
                                {existingBlog ? 'Edit Article' : 'Write New Article'}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition"
                        >
                            <IoClose className="text-2xl" />
                        </button>
                    </div>

                    {/* Messages */}
                    {error && (
                        <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300 font-mono">
                            {error}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mt-4 rounded-xl border border-green-500/30 bg-green-500/10 p-3 text-sm text-green-300 font-mono">
                            {successMessage}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                        {/* Admin Key */}
                        <div>
                            <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1 flex items-center gap-1.5">
                                <FaKey className="text-xs text-white/40" /> Admin Secret Key
                            </label>
                            <input
                                type="password"
                                value={adminKey}
                                onChange={(e) => setAdminKey(e.target.value)}
                                placeholder="Enter your ADMIN_SECRET_KEY"
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                            />
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1">
                                Title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="e.g. Scaling Machine Learning Pipelines in Production"
                                required
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-base font-colitez text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                            />
                        </div>

                        {/* Slug & Tags row */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1">
                                    Custom Slug (optional)
                                </label>
                                <input
                                    type="text"
                                    value={slug}
                                    onChange={(e) => setSlug(e.target.value)}
                                    placeholder="e.g. scaling-ml-pipelines"
                                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1">
                                    Tags (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={tags}
                                    onChange={(e) => setTags(e.target.value)}
                                    placeholder="e.g. ML, Python, Architecture"
                                    className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                                />
                            </div>
                        </div>

                        {/* Excerpt */}
                        <div>
                            <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1">
                                Excerpt / Short Summary
                            </label>
                            <textarea
                                value={excerpt}
                                onChange={(e) => setExcerpt(e.target.value)}
                                rows={2}
                                placeholder="A brief one or two-line summary shown on card previews..."
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-colitez text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition resize-none"
                            />
                        </div>

                        {/* Cover Image URL */}
                        <div>
                            <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1">
                                Cover Image URL (optional)
                            </label>
                            <input
                                type="url"
                                value={coverImage}
                                onChange={(e) => setCoverImage(e.target.value)}
                                placeholder="https://..."
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-mono text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                            />
                        </div>

                        {/* Content */}
                        <div>
                            <div className="flex justify-between items-center mb-1">
                                <label className="block font-mono text-xs uppercase tracking-wider text-white/60">
                                    Content (Markdown supported) *
                                </label>
                                <span className="font-mono text-[11px] text-white/40">
                                    {content.trim().split(/\s+/).filter(Boolean).length} words
                                </span>
                            </div>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                rows={10}
                                placeholder="Write your full article here using standard markdown..."
                                required
                                className="w-full rounded-xl border border-white/15 bg-white/5 p-4 font-mono text-sm leading-relaxed text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                            />
                        </div>

                        {/* Publish & Newsletter Toggles */}
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
                            <label className="flex items-center gap-3 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    id="isPublished"
                                    checked={isPublished}
                                    onChange={(e) => {
                                        setIsPublished(e.target.checked);
                                    }}
                                    className="h-4 w-4 rounded border-white/20 bg-white/10 text-white accent-white cursor-pointer"
                                />
                                <div>
                                    <span className="font-mono text-xs uppercase tracking-wider text-white">
                                        Publish Immediately
                                    </span>
                                    <p className="font-colitez text-xs text-white/50">
                                        {isPublished
                                            ? "Article will be live and visible to all visitors."
                                            : "Draft/Upcoming (unlisted, not visible to public visitors)."}
                                    </p>
                                </div>
                            </label>

                            <div className="space-y-2">
                                <label className="flex items-start gap-3 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        id="notifySubscribers"
                                        checked={notifySubscribers}
                                        onChange={(e) => setNotifySubscribers(e.target.checked)}
                                        className="mt-0.5 h-4 w-4 rounded border-white/20 bg-white/10 text-emerald-400 accent-emerald-500 cursor-pointer"
                                    />
                                    <div>
                                        <span className={`font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 ${isPublished ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            <FaPaperPlane className="text-[10px]" />
                                            {isPublished
                                                ? "Broadcast new article to subscribers via Email"
                                                : "Broadcast as upcoming sneak peek to subscribers via Email"}
                                        </span>
                                        <p className="font-colitez text-xs text-white/50">
                                            {isPublished
                                                ? "Sends an automated write-up announcement to all active subscribers."
                                                : "Broadcasts an exclusive preview teaser of this upcoming post."}
                                        </p>
                                    </div>
                                </label>

                                {notifySubscribers && (
                                    <div className="pl-7 pt-1">
                                        <input
                                            type="text"
                                            value={customNote}
                                            onChange={(e) => setCustomNote(e.target.value)}
                                            placeholder="Optional note for subscribers (e.g. 'Dropping next week, here is an early look!')"
                                            className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-mono text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition"
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/10">
                            {existingBlog ? (
                                <button
                                    type="button"
                                    onClick={handleDelete}
                                    disabled={loading}
                                    className="flex items-center gap-2 rounded-xl border border-red-500/30 px-4 py-2.5 text-xs font-mono text-red-400 hover:bg-red-500/10 transition"
                                >
                                    <FaTrash className="text-xs" /> Delete
                                </button>
                            ) : <div />}

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    disabled={loading}
                                    className="rounded-xl border border-white/20 px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="rounded-xl bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black hover:bg-neutral-200 transition font-medium active:scale-95 disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : existingBlog ? 'Update Post' : 'Publish Post'}
                                </button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default AdminBlogModal;
