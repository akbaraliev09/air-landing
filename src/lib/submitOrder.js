import { createOrder } from './orders.js';
import { sendOrderEmail } from './emailjs.js';
import { saveOrderRemote } from './ordersDb.js';

export async function submitOrder({ type, customer, summary, details, existing = null }) {
  const order = existing
    ? { ...existing, customer, summary, details }
    : createOrder({ type, customer, summary, details });

  const emailResult = await sendOrderEmail(order);
  order.emailStatus = emailResult.ok ? 'sent' : 'failed';

  const dbResult = await saveOrderRemote(order);

  if (emailResult.ok || dbResult.ok) return { ok: true, order };

  if (import.meta.env.DEV) console.warn('[AIR] order not delivered:', { email: emailResult.reason, database: dbResult.reason });
  const hint = import.meta.env.DEV ? ` (DEV: email: ${emailResult.reason}; database: ${dbResult.reason})` : '';
  return {
    ok: false,
    order,
    message: `We could not send your request. Please try again in a few minutes.${hint}`,
  };
}
