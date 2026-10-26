import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { broadcastBlogToSubscribers } from '../../libs/blogApi';

const BroadcastModal = ({ isOpen, onClose, blog }) => {
    const [isUpcoming, setIsUpcoming] = useState(false);
    const [customSubject, setCustomSubject] = useState('');
    const [customNote, setCustomNote] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(null); // 'success' | 'error' | null
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (blog) {
            setIsUpcoming(!blog.isPublished);
            setCustomSubject(
                !blog.isPublished
                    ? `Sneak Peek: ${blog.title} [Upcoming] 🚀`
                    : `New Post: ${blog.title} 🚀`
            );
            setCustomNote('');
            setStatus(null);
            setMessage('');
        }
    }, [blog, isOpen]);

    const handleModeToggle = (upcoming) => {
        setIsUpcoming(upcoming);
        if (blog) {
            setCustomSubject(
                upcoming
                    ? `Sneak Peek: ${blog.title} [Upcoming] 🚀`
                    : `New Post: ${blog.title} 🚀`
            );
        }
    };

    const handleBroadcast = async (e) => {
        e.preventDefault();
        if (!blog || loading) return;

        const adminKey = localStorage.getItem('portfolio_admin_key');
        if (!adminKey) {
            setStatus('error');
            setMessage('Admin secret key missing. Please unlock admin mode.');
            return;
        }

        setLoading(true);
        setStatus(null);
        setMessage('');

        try {
            const res = await broadcastBlogToSubscribers(
                blog._id,
                {
                    isUpcoming,
                    customSubject: customSubject.trim() || undefined,
                    customNote: customNote.trim() || undefined,
                },
                adminKey
            );

            setStatus('success');
            setMessage(
                res.message ||
                    `Broadcast dispatched successfully to ${res.sentCount || 0} subscriber(s)!`
            );
            setTimeout(() => {
                onClose();
            }, 1800);
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Failed to broadcast newsletter.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !blog) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="relative w-full max-w-lg rounded-3xl border border-white/20 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl overflow-hidden"
                >
                    {/* Background glow */}
                    <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-emerald-500/10 blur-[100px]" />

                    {/* Header */}
                    <div className="flex items-start justify-between border-b border-white/10 pb-4 mb-5">
                        <div>
                            <span className="font-mono text-[10px] tracking-[.3em] uppercase text-emerald-400 font-semibold flex items-center gap-1.5">
                                <FaPaperPlane className="text-[9px]" /> NEWSLETTER EMAIL BROADCAST
                            </span>
                            <h2 className="mt-1 font-impactImp text-2xl tracking-tight text-white line-clamp-1">
                                {blog.title}
                            </h2>
                        </div>
                        <button
                            onClick={onClose}
                            className="rounded-full p-1 text-white/50 hover:bg-white/10 hover:text-white transition"
                        >
                            <IoClose className="text-xl" />
                        </button>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleBroadcast} className="space-y-4">
                        {/* Broadcast Mode Pill Selector */}
                        <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-2">
                                Broadcast Format
                            </label>
                            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-white/5 border border-white/10">
                                <button
                                    type="button"
                                    onClick={() => handleModeToggle(false)}
                                    className={`py-2 px-3 rounded-xl font-mono text-xs uppercase tracking-wider transition ${
                                        !isUpcoming
                                            ? 'bg-white text-black font-semibold shadow'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    ● Published Post
                                </button>
                                <button
                                    type="button"
                                    onClick={() => handleModeToggle(true)}
                                    className={`py-2 px-3 rounded-xl font-mono text-xs uppercase tracking-wider transition ${
                                        isUpcoming
                                            ? 'bg-amber-400 text-black font-semibold shadow'
                                            : 'text-white/60 hover:text-white'
                                    }`}
                                >
                                    🔮 Upcoming Sneak Peek
                                </button>
                            </div>
                            <p className="mt-1.5 font-colitez text-[11px] text-white/40">
                                {isUpcoming
                                    ? "Will send an exclusive sneak peek teaser to all subscribers before or during launch."
                                    : "Will announce the live article to all active newsletter subscribers."}
                            </p>
                        </div>

                        {/* Subject Line */}
                        <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                                Email Subject Line
                            </label>
                            <input
                                type="text"
                                required
                                value={customSubject}
                                onChange={(e) => setCustomSubject(e.target.value)}
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-mono text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition"
                            />
                        </div>

                        {/* Optional Author Note */}
                        <div>
                            <label className="block font-mono text-[11px] uppercase tracking-wider text-white/60 mb-1">
                                Optional Author's Note to Subscribers
                            </label>
                            <textarea
                                rows={3}
                                value={customNote}
                                onChange={(e) => setCustomNote(e.target.value)}
                                placeholder="Add a personal greeting or context (e.g. 'Dropping this early for newsletter readers! Let me know your thoughts.')"
                                className="w-full rounded-xl border border-white/15 bg-white/5 px-3.5 py-2.5 text-xs font-colitez text-white placeholder-white/30 focus:border-white/40 focus:outline-none transition resize-none"
                            />
                        </div>

                        {/* Status Messages */}
                        {status === 'success' && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-xs font-mono text-emerald-300"
                            >
                                <FaCheckCircle className="text-sm shrink-0" />
                                <span>{message}</span>
                            </motion.div>
                        )}

                        {status === 'error' && (
                            <motion.div
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs font-mono text-red-300"
                            >
                                <FaExclamationCircle className="text-sm shrink-0" />
                                <span>{message}</span>
                            </motion.div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                            <button
                                type="button"
                                onClick={onClose}
                                disabled={loading}
                                className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white transition disabled:opacity-50"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex items-center gap-2 rounded-xl bg-emerald-400 px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black font-semibold hover:bg-emerald-300 transition active:scale-95 disabled:opacity-50"
                            >
                                <FaPaperPlane className={`text-[10px] ${loading ? 'animate-bounce' : ''}`} />
                                {loading ? 'Broadcasting...' : 'Broadcast to Subscribers'}
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default BroadcastModal;
