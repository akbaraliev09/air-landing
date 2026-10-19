import { useState } from 'react';
import Modal from './Modal.jsx';
import { INFO_TEXTS } from '../data/content.js';

export function AuthModal({ mode, onSwitch, onAuth, onClose }) {
  const isRegister = mode === 'register';

  const submit = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const name = String(form.get('name') || '').trim();
    onAuth({ name: name || email.split('@')[0], email });
    onClose();
  };

  return (
    <Modal title={isRegister ? 'Register' : 'Sign In'} onClose={onClose}>
      <form className="form" onSubmit={submit}>
        {isRegister && (
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
        )}
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
        <label>
          Password
          <input name="password" type="password" required minLength={6} autoComplete={isRegister ? 'new-password' : 'current-password'} />
        </label>
        <button type="submit" className="btn btn--block">
          {isRegister ? 'Create account' : 'Sign In'}
        </button>
        <p className="form-note">Front-end demo: your data is not sent anywhere.</p>
        <button type="button" className="link-btn link-btn--underline" onClick={() => onSwitch(isRegister ? 'signin' : 'register')}>
          {isRegister ? 'Already have an account? Sign In' : 'No account yet? Register'}
        </button>
      </form>
    </Modal>
  );
}

function Done({ text, onClose }) {
  return (
    <div className="modal__done">
      <p>{text}</p>
      <button type="button" className="btn btn--block" onClick={onClose}>
        Close
      </button>
    </div>
  );
}

export function BookingModal({ data, onClose }) {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Modal title="Your flight request" onClose={onClose}>
      {sent ? (
        <Done text="Request sent. We will contact you by email soon." onClose={onClose} />
      ) : (
        <>
          <dl className="summary">
            <dt>Route</dt>
            <dd>
              {data.from.code} to {data.to.code}
            </dd>
            <dt>Trip</dt>
            <dd>{data.tripType}</dd>
            <dt>Flight type</dt>
            <dd>{data.flightType}</dd>
            <dt>Passengers</dt>
            <dd>{data.persons}</dd>
            <dt>Departure</dt>
            <dd>{data.departure}</dd>
            {data.ret && (
              <>
                <dt>Return</dt>
                <dd>{data.ret}</dd>
              </>
            )}
            {data.requirements && (
              <>
                <dt>Requirements</dt>
                <dd>{data.requirements}</dd>
              </>
            )}
          </dl>
          <form className="form" onSubmit={submit}>
            <label>
              Name
              <input name="name" type="text" required autoComplete="name" />
            </label>
            <label>
              Email
              <input name="email" type="email" required autoComplete="email" />
            </label>
            <button type="submit" className="btn btn--block">
              Send request
            </button>
          </form>
        </>
      )}
    </Modal>
  );
}

export function PlanModal({ plan, onClose }) {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Modal title={`${plan.name} membership`} onClose={onClose}>
      {sent ? (
        <Done text={`Thank you! We will send the ${plan.name} membership details to your email.`} onClose={onClose} />
      ) : (
        <form className="form" onSubmit={submit}>
          <p className="modal__price">
            <strong>${plan.price}</strong>/month
          </p>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <button type="submit" className="btn btn--block">
            Confirm
          </button>
        </form>
      )}
    </Modal>
  );
}

export function ContactModal({ onClose }) {
  const [sent, setSent] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <Modal title="Contact" onClose={onClose}>
      {sent ? (
        <Done text="Message sent. Thank you!" onClose={onClose} />
      ) : (
        <form className="form" onSubmit={submit}>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Message
            <textarea name="message" rows="4" required />
          </label>
          <button type="submit" className="btn btn--block">
            Send
          </button>
        </form>
      )}
    </Modal>
  );
}

export function InfoModal({ kind, onClose }) {
  const info = INFO_TEXTS[kind];
  return (
    <Modal title={info.title} onClose={onClose}>
      <p className="modal__text">{info.text}</p>
    </Modal>
  );
}
