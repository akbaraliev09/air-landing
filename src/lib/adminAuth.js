import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth, isFirebaseConfigured } from './firebase.js';

export const ADMIN_EMAIL = String(import.meta.env.VITE_ADMIN_EMAIL || 'airlands652@gmail.com')
  .trim()
  .toLowerCase();

export const isAdminEmail = (email) => String(email).trim().toLowerCase() === ADMIN_EMAIL;

const WRONG_CREDENTIALS = ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found', 'auth/invalid-email'];

export async function adminSignIn(email, password) {
  if (!isFirebaseConfigured) {
    return { ok: false, message: 'Firebase is not configured. Fill the VITE_FIREBASE_* values in .env and restart the dev server.' };
  }
  try {
    await signInWithEmailAndPassword(auth, email.trim(), password);
    return { ok: true };
  } catch (err) {
    const message = WRONG_CREDENTIALS.includes(err.code)
      ? 'Wrong email or password.'
      : `Sign-in failed (${err.code || 'error'}).`;
    return { ok: false, message };
  }
}

export async function adminSignOut() {
  if (!auth) return;
  try {
    await signOut(auth);
  } catch (err) {
  }
}
