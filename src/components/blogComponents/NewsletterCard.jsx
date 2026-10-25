import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { subscribeToNewsletter } from '../../libs/blogApi';

const NewsletterCard = ({ source = 'blog_page', title, subtitle, className = '' }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email.trim() || status === 'loading') return;

        setStatus('loading');
        setMessage('');

        try {
            const res = await subscribeToNewsletter(email.trim(), source);
            setStatus('success');
            setMessage(res.message || "You're subscribed! Check your inbox soon.");
            setEmail('');
        } catch (err) {
            setStatus('error');
            setMessage(err.message || 'Something went wrong. Please try again.');
        }
    };

    return (
        <section
            className={`relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/70 p-8 sm:p-12 backdrop-blur-xl shadow-2xl transition-all duration-300 hover:border-white/25 ${className}`}
        >
            {/* Ambient Background Glows */}
            <div className="pointer-events-none absolute -right-20 -top-20 -z-10 h-72 w-72 rounded-full bg-white/5 blur-[120px]" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 -z-10 h-72 w-72 rounded-full bg-emerald-500/10 blur-[140px]" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                {/* Eyebrow badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 backdrop-blur-md mb-5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                    </span>
                    <span className="font-mono text-[11px] tracking-[.3em] uppercase text-white/70">
                        DISPATCHES & WRITE-UPS
                    </span>
                </div>

                {/* Main Heading */}
                <h3 className="font-impactImp text-3xl sm:text-5xl tracking-tight text-white leading-tight">
                    {title || "Never miss a new essay or build."}
                </h3>

                {/* Subtitle */}
                <p className="mt-4 font-colitez text-white/70 text-base sm:text-lg leading-relaxed max-w-xl mx-auto">
                    {subtitle ||
                        "Engineering deep dives, software design thoughts, and unfiltered build logs delivered straight to your inbox. No spam, ever."}
                </p>

                {/* Form / State */}
                <div className="mt-8">
                    <AnimatePresence mode="wait">
                        {status === 'success' ? (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-white"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400">
                                    <FaCheckCircle className="text-2xl" />
                                </div>
                                <h4 className="font-impactImp text-2xl tracking-wide text-white">
                                    You're on the list!
                                </h4>
                                <p className="font-mono text-xs text-white/80 max-w-md text-center">
                                    {message}
                                </p>
                                <button
                                    onClick={() => setStatus('idle')}
                                    className="mt-2 font-mono text-[11px] uppercase tracking-wider text-white/50 hover:text-white transition underline underline-offset-4"
                                >
                                    Subscribe another email
                                </button>
                            </motion.div>
                        ) : (
                            <motion.form
                                key="form"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >
                                <div className="flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto">
                                    {/* Email Input Field */}
                                    <div className="relative w-full">
                                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-white/40">
                                            <FaEnvelope className="text-sm" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            value={email}
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                if (status === 'error') setStatus('idle');
                                            }}
                                            placeholder="Enter your email address..."
                                            className="w-full rounded-2xl border border-white/20 bg-white/5 pl-11 pr-4 py-3.5 font-mono text-xs text-white placeholder-white/40 outline-none backdrop-blur-md transition-all duration-200 focus:border-white focus:bg-white/10 focus:ring-2 focus:ring-white/20"
                                            disabled={status === 'loading'}
                                        />
                                    </div>

                                    {/* Submit Action Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'loading'}
                                        className="group relative inline-flex w-full sm:w-auto items-center justify-center gap-2 overflow-hidden rounded-2xl bg-white px-7 py-3.5 font-mono text-xs uppercase tracking-wider text-black font-semibold transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                                    >
                                        {status === 'loading' ? (
                                            <div className="flex items-center gap-2">
                                                <svg
                                                    className="h-4 w-4 animate-spin text-black"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8v8H4z"
                                                    />
                                                </svg>
                                                <span>Subscribing...</span>
                                            </div>
                                        ) : (
                                            <>
                                                <span>Subscribe</span>
                                                <FaPaperPlane className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Error alert message */}
                                {status === 'error' && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="inline-flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs font-mono text-red-300"
                                    >
                                        <FaExclamationCircle className="text-sm shrink-0" />
                                        <span>{message}</span>
                                    </motion.div>
                                )}

                                {/* Trust badge */}
                                <p className="font-mono text-[11px] text-white/40 tracking-wider">
                                    🔒 No spam guaranteed. Unsubscribe anytime with a single click.
                                </p>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default NewsletterCard;
