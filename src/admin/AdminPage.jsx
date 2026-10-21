import { useEffect } from 'react';
import Dashboard from './Dashboard.jsx';

export default function AdminPage({ onExit, onLogout }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = 'AIR | Admin';
    window.scrollTo(0, 0);
    return () => {
      document.title = prevTitle;
    };
  }, []);

  return <Dashboard onExit={onExit} onLogout={onLogout} />;
}
