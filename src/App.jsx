import { useCallback, useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BookingForm from './components/BookingForm.jsx';
import PrivateJet from './components/PrivateJet.jsx';
import Specs from './components/Specs.jsx';
import Charters from './components/Charters.jsx';
import Membership from './components/Membership.jsx';
import Footer from './components/Footer.jsx';
import { AuthModal, BookingModal, ContactModal, InfoModal, PlanModal } from './components/Modals.jsx';
import AdminPage from './admin/AdminPage.jsx';
import { loadUser, saveUser } from './lib/session.js';
import { adminSignOut, isAdminEmail } from './lib/adminAuth.js';
import { auth } from './lib/firebase.js';

export default function App() {
  const [view, setView] = useState('site'); // 'site' | 'admin'
  const [modal, setModal] = useState(null); // { type, data }
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (!auth) return undefined;
    return onAuthStateChanged(auth, (fbUser) => {
      if (fbUser && isAdminEmail(fbUser.email || '')) {
        setUser({ name: 'Admin', email: fbUser.email, isAdmin: true });
      } else {
        setUser((u) => (u && u.isAdmin ? null : u));
        setView('site');
      }
    });
  }, []);

  const closeModal = useCallback(() => setModal(null), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const handleAuth = (nextUser) => {
    setUser(nextUser);
    saveUser(nextUser);
  };

  const handleSignOut = () => {
    adminSignOut();
    setUser(null);
    saveUser(null);
    setView('site');
  };

  // Admin panel: only for the logged-in admin
  if (view === 'admin' && user && user.isAdmin) {
    return <AdminPage onExit={() => setView('site')} onLogout={handleSignOut} />;
  }

  const type = modal ? modal.type : null;

  return (
    <>
      <Header
        user={user}
        onNav={scrollToSection}
        onSignIn={() => setModal({ type: 'signin' })}
        onRegister={() => setModal({ type: 'register' })}
        onSignOut={handleSignOut}
        onAdmin={() => setView('admin')}
      />

      <main>
        <Hero onExplore={() => scrollToSection('private-jet')} />
        <BookingForm onSubmit={(data) => setModal({ type: 'booking', data })} />
        <PrivateJet />
        <Specs />
        <Charters onSelect={() => scrollToSection('booking')} />
        <Membership onChoose={(plan) => setModal({ type: 'plan', data: plan })} />
      </main>

      <Footer onNav={scrollToSection} onInfo={(kind) => setModal({ type: kind })} />

      {(type === 'signin' || type === 'register') && (
        <AuthModal
          mode={type}
          onSwitch={(mode) => setModal({ type: mode })}
          onAuth={handleAuth}
          onClose={closeModal}
        />
      )}
      {type === 'booking' && <BookingModal data={modal.data} onClose={closeModal} />}
      {type === 'plan' && <PlanModal plan={modal.data} onClose={closeModal} />}
      {type === 'contact' && <ContactModal onClose={closeModal} />}
      {(type === 'about' || type === 'news') && <InfoModal kind={type} onClose={closeModal} />}
    </>
  );
}
