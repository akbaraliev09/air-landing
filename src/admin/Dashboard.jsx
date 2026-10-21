import { useEffect, useMemo, useState } from 'react';
import Logo from '../components/Logo.jsx';
import Modal from '../components/Modal.jsx';
import { ADMIN_EMAIL } from '../lib/adminAuth.js';
import { isEmailConfigured } from '../lib/emailjs.js';
import { isFirebaseConfigured } from '../lib/firebase.js';
import { deleteOrderRemote, subscribeOrders, updateOrderStatus } from '../lib/ordersDb.js';
import { ORDER_TYPES, STATUSES, detailsToText, formatDateTime } from '../lib/orders.js';

const csvCell = (value) => `"${String(value ?? '').replace(/"/g, '""')}"`;

function exportCsv(list) {
  const header = ['ID', 'Date', 'Type', 'Status', 'Name', 'Email', 'Details', 'Email notification'];
  const rows = list.map((o) => [
    o.id,
    o.createdAt,
    ORDER_TYPES[o.type] || o.type,
    STATUSES[o.status] || o.status,
    o.customer.name,
    o.customer.email,
    detailsToText(o).replace(/\n/g, ' | '),
    o.emailStatus,
  ]);
  const csv = '\uFEFF' + [header, ...rows].map((r) => r.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = 'air-orders.csv';
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const EMAIL_LABELS = { sent: 'Email sent', failed: 'Email failed', pending: 'Pending' };

export default function Dashboard({ onExit, onLogout }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [actionError, setActionError] = useState('');
  const [type, setType] = useState('all');
  const [status, setStatus] = useState('all');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribeOrders(
      (list) => {
        setOrders(list);
        setLoading(false);
        setLoadError('');
      },
      (err) => {
        setLoading(false);
        setLoadError(
          err && err.code === 'permission-denied'
            ? 'No permission to read orders. Check the Firestore rules and that you are logged in with the admin e-mail.'
            : `Could not load orders (${(err && err.code) || 'error'}).`
        );
      }
    );
    return unsubscribe;
  }, []);

  const selected = orders.find((o) => o.id === selectedId) || null;

  const counts = useMemo(() => {
    const c = { total: orders.length, new: 0, in_progress: 0, done: 0 };
    orders.forEach((o) => {
      if (c[o.status] !== undefined) c[o.status] += 1;
    });
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      if (type !== 'all' && o.type !== type) return false;
      if (status !== 'all' && o.status !== status) return false;
      if (!q) return true;
      const haystack = `${o.id} ${o.customer.name} ${o.customer.email} ${o.summary}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [orders, type, status, query]);

  const changeStatus = (id, next) => {
    setActionError('');
    updateOrderStatus(id, next).catch(() => setActionError('Could not change the status. Check your connection and the Firestore rules.'));
  };

  const remove = (id) => {
    if (!window.confirm('Delete this order? This cannot be undone.')) return;
    setActionError('');
    deleteOrderRemote(id).catch(() => setActionError('Could not delete the order. Check your connection and the Firestore rules.'));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div className="admin">
      <header className="admin__bar">
        <div className="container admin__bar-inner">
          <div className="admin__brand">
            <Logo />
            <span>Admin panel</span>
          </div>
          <div className="admin__actions">
            <span className="admin__who">{ADMIN_EMAIL}</span>
            <button type="button" className="btn btn--small btn--ghost" onClick={onExit}>
              Website
            </button>
            <button type="button" className="btn btn--small" onClick={onLogout}>
              Log out
            </button>
          </div>
        </div>
      </header>

      <main className="container admin__main">
        {!isFirebaseConfigured && (
          <p className="admin__notice" role="alert">
            Database is not configured: orders from customers cannot be saved here. Fill the VITE_FIREBASE_* values in .env and restart the dev server.
          </p>
        )}
        {!isEmailConfigured && (
          <p className="admin__notice" role="alert">
            EmailJS is not configured: e-mail notifications are off. Fill the VITE_EMAILJS_* values in .env and restart the dev server.
          </p>
        )}
        {loadError && (
          <p className="admin__notice admin__notice--error" role="alert">
            {loadError}
          </p>
        )}
        {actionError && (
          <p className="admin__notice admin__notice--error" role="alert">
            {actionError}
          </p>
        )}

        <div className="admin__stats">
          <div className="stat">
            <strong>{counts.total}</strong>
            <span>All orders</span>
          </div>
          <div className="stat">
            <strong>{counts.new}</strong>
            <span>New</span>
          </div>
          <div className="stat">
            <strong>{counts.in_progress}</strong>
            <span>In progress</span>
          </div>
          <div className="stat">
            <strong>{counts.done}</strong>
            <span>Done</span>
          </div>
        </div>

        <div className="admin__filters">
          <input
            type="search"
            placeholder="Search by name, email, ID..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search orders"
          />
          <select value={type} onChange={(e) => setType(e.target.value)} aria-label="Filter by type">
            <option value="all">All types</option>
            {Object.entries(ORDER_TYPES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Filter by status">
            <option value="all">All statuses</option>
            {Object.entries(STATUSES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
          <button type="button" className="btn btn--small btn--ghost" disabled={!filtered.length} onClick={() => exportCsv(filtered)}>
            Export CSV
          </button>
        </div>

        <div className="admin__table-wrap">
          {loading ? (
            <p className="admin__empty">Loading orders...</p>
          ) : filtered.length === 0 ? (
            <p className="admin__empty">{orders.length === 0 ? 'No orders yet. New orders from customers will appear here.' : 'No orders match your filters.'}</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Customer</th>
                  <th>Details</th>
                  <th>Status</th>
                  <th>Email</th>
                  <th aria-label="Actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((o) => (
                  <tr key={o.id}>
                    <td className="nowrap">{formatDateTime(o.createdAt)}</td>
                    <td className="nowrap">{ORDER_TYPES[o.type] || o.type}</td>
                    <td>
                      <strong>{o.customer.name}</strong>
                      <br />
                      <a href={`mailto:${o.customer.email}`}>{o.customer.email}</a>
                    </td>
                    <td className="admin__summary">{o.summary}</td>
                    <td>
                      <select
                        className={`status status--${o.status}`}
                        value={o.status}
                        onChange={(e) => changeStatus(o.id, e.target.value)}
                        aria-label={`Status of ${o.id}`}
                      >
                        {Object.entries(STATUSES).map(([key, label]) => (
                          <option key={key} value={key}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <span className={`badge badge--${o.emailStatus}`}>{EMAIL_LABELS[o.emailStatus] || o.emailStatus}</span>
                    </td>
                    <td className="nowrap admin__row-actions">
                      <button type="button" className="link-btn" onClick={() => setSelectedId(o.id)}>
                        View
                      </button>
                      <button type="button" className="link-btn link-btn--danger" onClick={() => remove(o.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {selected && (
        <Modal title={`Order ${selected.id}`} onClose={() => setSelectedId(null)}>
          <dl className="summary">
            <dt>Date</dt>
            <dd>{formatDateTime(selected.createdAt)}</dd>
            <dt>Type</dt>
            <dd>{ORDER_TYPES[selected.type] || selected.type}</dd>
            <dt>Name</dt>
            <dd>{selected.customer.name}</dd>
            <dt>Email</dt>
            <dd>
              <a href={`mailto:${selected.customer.email}`}>{selected.customer.email}</a>
            </dd>
            {selected.details.map((d) => (
              <FragmentRow key={d.label} label={d.label} value={d.value} />
            ))}
          </dl>
          <label className="form admin__modal-status">
            <span>Status</span>
            <select value={selected.status} onChange={(e) => changeStatus(selected.id, e.target.value)}>
              {Object.entries(STATUSES).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </Modal>
      )}
    </div>
  );
}

function FragmentRow({ label, value }) {
  return (
    <>
      <dt>{label}</dt>
      <dd className="pre-wrap">{value}</dd>
    </>
  );
}
