import { useCallback, useState } from 'react';
import Header from './components/Header.jsx';
import Hero from './components/Hero.jsx';
import BookingForm from './components/BookingForm.jsx';
import PrivateJet from './components/PrivateJet.jsx';
import Specs from './components/Specs.jsx';
import Charters from './components/Charters.jsx';
import Membership from './components/Membership.jsx';
import Footer from './components/Footer.jsx';
import { AuthModal, BookingModal, ContactModal, InfoModal, PlanModal } from './components/Modals.jsx';

export default function App() {
  const [modal, setModal] = useState(null);
  const [user, setUser] = useState(null);

  const closeModal = useCallback(() => setModal(null), []);

  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const type = modal ? modal.type : null;

  return (
    <>
      <Header
        user={user}
        onNav={scrollToSection}
        onSignIn={() => setModal({ type: 'signin' })}
        onRegister={() => setModal({ type: 'register' })}
        onSignOut={() => setUser(null)}
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
          onAuth={setUser}
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
