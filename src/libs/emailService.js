import emailjs from '@emailjs/browser';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Optional custom template IDs if created in EmailJS dashboard, falls back to default
const WELCOME_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_WELCOME_TEMPLATE_ID || TEMPLATE_ID;
const BROADCAST_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_BROADCAST_TEMPLATE_ID || TEMPLATE_ID;

/**
 * Sends a welcome onboarding email to a newly subscribed user directly from the browser
 */
export async function sendWelcomeOnboardingEmail(recipientEmail) {
    if (!SERVICE_ID || !PUBLIC_KEY) {
        console.warn('[EmailJS] Service ID or Public Key missing in environment.');
        return false;
    }

    try {
        const username = recipientEmail.split('@')[0];
        const res = await emailjs.send(
            SERVICE_ID,
            WELCOME_TEMPLATE_ID,
            {
                to_email: recipientEmail,
                email: recipientEmail,
                user_email: recipientEmail,
                to_name: username,
                name: username,
                subject: "Welcome to Nishan's Newsletter 🚀",
                title: "Welcome to Nishan's Newsletter",
                message: "Thank you for subscribing to my newsletter! You will receive engineering deep dives, architectural insights, and unfiltered build logs directly to your inbox.",
            },
            PUBLIC_KEY
        );
        console.log('[EmailJS] Welcome email delivered successfully:', res.status, res.text);
        return true;
    } catch (err) {
        console.error('[EmailJS] Welcome email failed:', err);
        return false;
    }
}

/**
 * Broadcasts a blog post notification to a subscriber directly from the browser
 */
export async function broadcastArticleEmail(blog, recipientEmail) {
    if (!SERVICE_ID || !PUBLIC_KEY) {
        console.warn('[EmailJS] Service ID or Public Key missing in environment.');
        return false;
    }

    const postUrl = `${window.location.origin}/blogs/${blog.slug || blog._id}`;
    const username = recipientEmail.split('@')[0];

    try {
        const res = await emailjs.send(
            SERVICE_ID,
            BROADCAST_TEMPLATE_ID,
            {
                to_email: recipientEmail,
                email: recipientEmail,
                user_email: recipientEmail,
                to_name: username,
                name: username,
                subject: `New Article: ${blog.title}`,
                title: blog.title,
                article_title: blog.title,
                article_url: postUrl,
                article_excerpt: blog.excerpt || '',
                message: `I've just published a new article: "${blog.title}".\n\n${blog.excerpt || ''}\n\nRead the full piece here:\n${postUrl}`,
            },
            PUBLIC_KEY
        );
        console.log(`[EmailJS] Broadcast delivered to ${recipientEmail}:`, res.status);
        return true;
    } catch (err) {
        console.error(`[EmailJS] Broadcast failed for ${recipientEmail}:`, err);
        return false;
    }
}
