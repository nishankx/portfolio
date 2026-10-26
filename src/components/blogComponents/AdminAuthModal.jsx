import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IoClose } from 'react-icons/io5';
import { FaKey, FaSignOutAlt, FaPenNib, FaCheckCircle } from 'react-icons/fa';
import { verifyAdminKey } from '../../libs/blogApi';

const AdminAuthModal = ({
    isOpen,
    onClose,
    isAdmin,
    onLoginSuccess,
    onLogout,
    onOpenEditor,
}) => {
    const [keyInput, setKeyInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        if (!keyInput.trim()) {
            setError('Please enter your secret key.');
            return;
        }

        setLoading(true);
        try {
            await verifyAdminKey(keyInput.trim());
            localStorage.setItem('portfolio_admin_key', keyInput.trim());
            onLoginSuccess(keyInput.trim());
            setKeyInput('');
            onClose();
        } catch (err) {
            setError(err.message || 'Verification failed. Incorrect key.');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('portfolio_admin_key');
        onLogout();
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    onClick={(e) => {
                        if (e.target === e.currentTarget) onClose();
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md rounded-3xl border border-white/20 bg-neutral-950 p-6 sm:p-8 text-white shadow-2xl"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between pb-4 border-b border-white/10">
                            <div>
                                <p className="font-mono uppercase tracking-[.35em] text-xs text-white/40">
                                    {isAdmin ? 'AUTHENTICATED' : 'RESTRICTED'}
                                </p>
                                <h2 className="mt-1 font-impactImp text-3xl tracking-tight">
                                    {isAdmin ? 'Admin Session' : 'Admin Unlock'}
                                </h2>
                            </div>
                            <button
                                onClick={onClose}
                                className="rounded-full p-2 text-white/50 hover:bg-white/10 hover:text-white transition"
                            >
                                <IoClose className="text-2xl" />
                            </button>
                        </div>

                        {/* Logged in state view */}
                        {isAdmin ? (
                            <div className="mt-6 space-y-6">
                                <div className="flex items-start gap-3 rounded-2xl border border-green-500/20 bg-green-500/10 p-4">
                                    <FaCheckCircle className="text-green-400 text-lg mt-0.5 shrink-0" />
                                    <div>
                                        <p className="font-mono text-xs uppercase tracking-wider text-green-300 font-semibold">
                                            Admin Mode Active
                                        </p>
                                        <p className="font-colitez text-white/70 text-sm mt-1">
                                            The Write and Edit buttons are visible and active on your browser.
                                        </p>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            onClose();
                                            if (onOpenEditor) onOpenEditor();
                                        }}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-mono text-xs uppercase tracking-wider text-black hover:bg-neutral-200 transition font-medium active:scale-98"
                                    >
                                        <FaPenNib className="text-xs" /> Write New Article
                                    </button>

                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-5 py-3 font-mono text-xs uppercase tracking-wider text-red-400 hover:bg-red-500/10 transition active:scale-98"
                                    >
                                        <FaSignOutAlt className="text-xs" /> Logout & Lock
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* Login Form view */
                            <form onSubmit={handleLogin} className="mt-6 space-y-5">
                                <p className="font-colitez text-white/70 text-sm leading-relaxed">
                                    Enter your admin secret key to unlock authoring tools. Once logged in, your session stays active until you log out.
                                </p>

                                {error && (
                                    <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300 font-mono">
                                        {error}
                                    </div>
                                )}

                                <div>
                                    <label className="block font-mono text-xs uppercase tracking-wider text-white/60 mb-1 flex items-center gap-1.5">
                                        <FaKey className="text-xs text-white/40" /> Secret Key
                                    </label>
                                    <input
                                        type="password"
                                        value={keyInput}
                                        onChange={(e) => setKeyInput(e.target.value)}
                                        placeholder="Enter ADMIN_SECRET_KEY"
                                        autoFocus
                                        className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-2.5 text-sm font-mono text-white placeholder-white/30 focus:border-white/50 focus:outline-none transition"
                                    />
                                </div>

                                <div className="flex items-center justify-end gap-3 pt-2">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="rounded-xl border border-white/20 px-4 py-2.5 text-xs font-mono uppercase tracking-wider text-white/70 hover:bg-white/10 hover:text-white transition"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="rounded-xl bg-white px-6 py-2.5 text-xs font-mono uppercase tracking-wider text-black hover:bg-neutral-200 transition font-medium active:scale-95 disabled:opacity-50"
                                    >
                                        {loading ? 'Verifying...' : 'Unlock'}
                                    </button>
                                </div>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default AdminAuthModal;
