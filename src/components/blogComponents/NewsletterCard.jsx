import React, { useState } from 'react';
import { motion } from 'motion/react';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { subscribeToNewsletter } from '../../libs/blogApi';

const NewsletterCard = ({
    title = 'Join the Newsletter',
    subtitle = 'Get notified whenever I publish a new blog.',
    className = '',
}) => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email.trim())) {
            setError('Please enter a valid email address.');
            return;
        }

        setLoading(true);
        try {
            await subscribeToNewsletter(email.trim());
            setSuccess(true);
            setEmail('');
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className={`relative overflow-hidden rounded-3xl border border-white/15 bg-neutral-950/80 p-8 sm:p-12 text-white shadow-2xl backdrop-blur-xl ${className}`}
        >
            {/* Subtle Ambient Glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-emerald-500/10 blur-[100px]" />

            <div className="relative z-10 max-w-2xl mx-auto text-center">
                <p className="font-mono uppercase tracking-[.3em] text-xs text-white/40 mb-2 flex items-center justify-center gap-2">
                    <FaPaperPlane className="text-[10px]" /> STAY UPDATED
                </p>
                <h3 className="font-impactImp text-3xl sm:text-4xl tracking-tight text-white mb-3">
                    {title}
                </h3>
                <p className="font-colitez text-white/70 text-base sm:text-lg mb-8 leading-relaxed max-w-xl mx-auto">
                    {subtitle}
                </p>

                {success ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center justify-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-emerald-300 font-mono text-sm"
                    >
                        <FaCheckCircle className="text-emerald-400 text-lg shrink-0" />
                        <span>You're subscribed! Check your inbox for your welcome email.</span>
                    </motion.div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your.email@example.com"
                            required
                            disabled={loading}
                            className="flex-1 rounded-2xl border border-white/20 bg-white/5 px-5 py-3 font-mono text-sm text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition disabled:opacity-50"
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-7 py-3 font-mono text-xs uppercase tracking-wider text-black font-semibold hover:bg-neutral-200 active:scale-95 transition disabled:opacity-50"
                        >
                            {loading ? 'Subscribing...' : 'Subscribe'}
                        </button>
                    </form>
                )}

                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 font-mono text-xs text-red-400"
                    >
                        {error}
                    </motion.p>
                )}
            </div>
        </div>
    );
};

export default NewsletterCard;
