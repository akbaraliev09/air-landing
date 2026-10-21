const KEY = 'air.user';

export function loadUser() {
  try {
    const raw = sessionStorage.getItem(KEY);
    const user = raw ? JSON.parse(raw) : null;
    return user && !user.isAdmin ? user : null;
  } catch (err) {
    return null;
  }
}

export function saveUser(user) {
  try {
    if (user && !user.isAdmin) sessionStorage.setItem(KEY, JSON.stringify(user));
    else sessionStorage.removeItem(KEY);
  } catch (err) {
    // ignore
  }
}
