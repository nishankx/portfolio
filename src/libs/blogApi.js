const RAW_API_URL = import.meta.env.VITE_API_URL || 'https://blogsite-jyzb.onrender.com';
const API_BASE_URL = RAW_API_URL.replace(/\/+$/, '');

export async function verifyAdminKey(adminKey) {
    const res = await fetch(`${API_BASE_URL}/blogs/auth/verify`, {
        headers: {
            'x-admin-key': adminKey,
        },
    });
    if (!res.ok) {
        throw new Error("Invalid Admin Secret Key");
    }
    return true;
}

export async function fetchBlogs(params = {}) {
    try {
        const query = new URLSearchParams(params).toString();
        const url = `${API_BASE_URL}/blogs${query ? `?${query}` : ''}`;
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`Failed to fetch blogs: ${res.statusText}`);
        }
        const data = await res.json();
        return data.blogs || data.blog || [];
    } catch (err) {
        console.error("fetchBlogs error:", err);
        throw err;
    }
}

export async function fetchBlogByIdOrSlug(idOrSlug) {
    try {
        const res = await fetch(`${API_BASE_URL}/blogs/${idOrSlug}`);
        if (!res.ok) {
            if (res.status === 404) return null;
            throw new Error(`Failed to fetch blog: ${res.statusText}`);
        }
        const data = await res.json();
        return data.blog;
    } catch (err) {
        console.error("fetchBlogByIdOrSlug error:", err);
        throw err;
    }
}

export async function createBlog(blogData, adminKey) {
    const res = await fetch(`${API_BASE_URL}/blogs`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey,
        },
        body: JSON.stringify(blogData),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to create blog');
    }
    return data.savedBlog || data.blog;
}

export async function updateBlog(id, blogData, adminKey) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey,
        },
        body: JSON.stringify(blogData),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to update blog');
    }
    return data.updatedBlog || data.blog;
}

export async function deleteBlog(id, adminKey) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            'x-admin-key': adminKey,
        },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to delete blog');
    }
    return data;
}

export async function subscribeToNewsletter(email) {
    const res = await fetch(`${API_BASE_URL}/newsletter/subscribe`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to subscribe to newsletter');
    }
    return data;
}

export async function broadcastBlogToSubscribers(id, adminKey) {
    const res = await fetch(`${API_BASE_URL}/blogs/${id}/broadcast`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-admin-key': adminKey,
        },
    });
    const data = await res.json();
    if (!res.ok) {
        throw new Error(data.message || 'Failed to broadcast blog to subscribers');
    }
    return data;
}


