import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import { BurgerIcon } from './Icons.jsx';
import { NAV_LINKS } from '../data/content.js';

export default function Header({ user, onNav, onSignIn, onRegister, onSignOut }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const go = (e, id) => {
    e.preventDefault();
    setOpen(false);
    onNav(id);
  };

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''} ${open ? 'header--open' : ''}`}>
      <div className="container header__inner">
        <a href="#home" className="logo" aria-label="AIR, go to top" onClick={(e) => go(e, 'home')}>
          <Logo />
        </a>

        <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`} onClick={(e) => go(e, link.id)}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="header__auth">
          {user ? (
            <>
              <span className="header__user">Hi, {user.name}</span>
              <button type="button" className="btn btn--small" onClick={onSignOut}>
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button type="button" className="link-btn header__register" onClick={onRegister}>
                Register
              </button>
              <button type="button" className="btn btn--small" onClick={onSignIn}>
                Sign In
              </button>
            </>
          )}
          <button
            type="button"
            className="burger"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <BurgerIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
