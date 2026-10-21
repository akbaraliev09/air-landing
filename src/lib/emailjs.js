import { ORDER_TYPES, detailsToText, formatDateTime } from './orders.js';

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export const ADMIN_NOTIFY_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'airlands652@gmail.com';

export const isEmailConfigured = Boolean(SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY);

export async function sendOrderEmail(order) {
  if (!isEmailConfigured) return { ok: false, reason: 'not_configured' };

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: SERVICE_ID,
        template_id: TEMPLATE_ID,
        user_id: PUBLIC_KEY,
        template_params: {
          to_email: ADMIN_NOTIFY_EMAIL,
          order_id: order.id,
          order_type: ORDER_TYPES[order.type] || order.type,
          customer_name: order.customer.name,
          customer_email: order.customer.email,
          reply_to: order.customer.email,
          details: detailsToText(order),
          created_at: formatDateTime(order.createdAt),
        },
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return { ok: false, reason: text || `HTTP ${response.status}` };
    }
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: 'network' };
  }
}
