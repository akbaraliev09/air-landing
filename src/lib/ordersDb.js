import { collection, deleteDoc, doc, onSnapshot, orderBy, query, setDoc, updateDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from './firebase.js';

const withTimeout = (promise, ms) =>
  Promise.race([promise, new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), ms))]);

export async function saveOrderRemote(order) {
  if (!isFirebaseConfigured) return { ok: false, reason: 'not_configured' };
  try {
    await withTimeout(setDoc(doc(db, 'orders', order.id), order), 10000);
    return { ok: true };
  } catch (err) {
    return { ok: false, reason: err.code || err.message || 'error' };
  }
}

export function subscribeOrders(onData, onError) {
  if (!isFirebaseConfigured) {
    onData([]);
    return () => {};
  }
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
  return onSnapshot(
    q,
    (snap) => onData(snap.docs.map((d) => ({ ...d.data(), id: d.id }))),
    onError
  );
}

export const updateOrderStatus = (id, status) => updateDoc(doc(db, 'orders', id), { status });

export const deleteOrderRemote = (id) => deleteDoc(doc(db, 'orders', id));
