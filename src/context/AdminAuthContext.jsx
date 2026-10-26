import React, { createContext, useContext, useState, useEffect } from 'react';
import AdminAuthModal from '../components/blogComponents/AdminAuthModal';
import AdminBlogModal from '../components/blogComponents/AdminBlogModal';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    // Persistent admin session from localStorage
    const [isAdmin, setIsAdmin] = useState(() => {
        return Boolean(localStorage.getItem('portfolio_admin_key'));
    });

    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isEditorModalOpen, setIsEditorModalOpen] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [saveCallback, setSaveCallback] = useState(null);
    const [deleteCallback, setDeleteCallback] = useState(null);

    // Global keyboard shortcut: Ctrl + Shift + A (or Cmd + Shift + A)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.code === 'KeyA')) {
                e.preventDefault();
                setIsAuthModalOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleLoginSuccess = (key) => {
        setIsAdmin(true);
    };

    const handleLogout = () => {
        setIsAdmin(false);
    };

    const openEditor = (blog = null, onSaved = null, onDeleted = null) => {
        setEditingBlog(blog);
        setSaveCallback(() => onSaved);
        setDeleteCallback(() => onDeleted);
        setIsEditorModalOpen(true);
    };

    const closeEditor = () => {
        setIsEditorModalOpen(false);
        setEditingBlog(null);
    };

    return (
        <AdminAuthContext.Provider
            value={{
                isAdmin,
                setIsAdmin,
                isAuthModalOpen,
                setIsAuthModalOpen,
                openEditor,
                closeEditor,
                logout: handleLogout,
            }}
        >
            {children}

            {/* Auth Login / Logout Modal */}
            <AdminAuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                isAdmin={isAdmin}
                onLoginSuccess={handleLoginSuccess}
                onLogout={handleLogout}
                onOpenEditor={() => openEditor()}
            />

            {/* Article Writing & Editing Modal */}
            <AdminBlogModal
                isOpen={isEditorModalOpen}
                existingBlog={editingBlog}
                onClose={closeEditor}
                onSaved={(savedBlog) => {
                    if (saveCallback) saveCallback(savedBlog);
                }}
                onDeleted={(deletedId) => {
                    if (deleteCallback) deleteCallback(deletedId);
                }}
            />
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
