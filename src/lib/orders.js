export const ORDER_TYPES = {
  flight: 'Flight request',
  membership: 'Membership',
  contact: 'Message',
};

export const STATUSES = {
  new: 'New',
  in_progress: 'In progress',
  done: 'Done',
  cancelled: 'Cancelled',
};

function makeId() {
  const time = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 5).toUpperCase();
  return `AIR-${time}${rand}`;
}

// details: array of { label, value }
export function createOrder({ type, customer, summary, details }) {
  return {
    id: makeId(),
    type,
    status: 'new',
    createdAt: new Date().toISOString(),
    customer,
    summary,
    details,
    emailStatus: 'pending', // pending | sent | failed
  };
}

export function detailsToText(order) {
  return order.details.map((d) => `${d.label}: ${d.value}`).join('\n');
}

export function formatDateTime(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
