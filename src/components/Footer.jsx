import Logo from './Logo.jsx';

export default function Footer({ onNav, onInfo }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__logo">
          <Logo light />
        </div>

        <div className="footer__bar">
          <nav className="footer__links" aria-label="Footer navigation">
            <button type="button" onClick={() => onNav('private-jet')}>
              Services
            </button>
            <button type="button" onClick={() => onInfo('about')}>
              About Us
            </button>
            <button type="button" onClick={() => onInfo('news')}>
              News
            </button>
            <button type="button" onClick={() => onInfo('contact')}>
              Contact
            </button>
          </nav>
          <p>&copy; 2021 Air. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
