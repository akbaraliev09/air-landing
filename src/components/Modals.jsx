import { useRef, useState } from 'react';
import Modal from './Modal.jsx';
import { INFO_TEXTS } from '../data/content.js';
import { submitOrder } from '../lib/submitOrder.js';
import { adminSignIn, isAdminEmail } from '../lib/adminAuth.js';

export function AuthModal({ mode, onSwitch, onAuth, onClose }) {
  const isRegister = mode === 'register';
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '').trim();
    const name = String(form.get('name') || '').trim();
    const password = String(form.get('password') || '');

    if (isAdminEmail(email)) {
      setBusy(true);
      setError('');
      const result = await adminSignIn(email, password);
      setBusy(false);
      if (!result.ok) {
        setError(result.message);
        return;
      }
      onAuth({ name: name || 'Admin', email, isAdmin: true });
      onClose();
      return;
    }

    onAuth({ name: name || email.split('@')[0], email, isAdmin: false });
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
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <button type="submit" className="btn btn--block" disabled={busy}>
          {busy ? 'Please wait...' : isRegister ? 'Create account' : 'Sign In'}
        </button>
        <p className="form-note">Front-end demo: regular accounts are not stored anywhere.</p>
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

function useOrderSubmit() {
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');
  const orderRef = useRef(null);

  const send = async (payload) => {
    if (status === 'sending') return;
    setStatus('sending');
    setError('');
    const result = await submitOrder({ ...payload, existing: orderRef.current });
    orderRef.current = result.order;
    if (result.ok) {
      setStatus('sent');
    } else {
      setStatus('error');
      setError(result.message);
    }
  };

  return { status, error, send, markSent: () => setStatus('sent') };
}

function readForm(e) {
  const form = new FormData(e.currentTarget);
  return {
    name: String(form.get('name') || '').trim(),
    email: String(form.get('email') || '').trim(),
    message: String(form.get('message') || '').trim(),
    spam: Boolean(form.get('hp_x7q')), // hidden honeypot field
  };
}

function Honeypot() {
  return <input className="hp" name="hp_x7q" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />;
}

function SubmitRow({ status, error, label }) {
  return (
    <>
      {status === 'error' && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="btn btn--block" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending...' : label}
      </button>
    </>
  );
}

export function BookingModal({ data, onClose }) {
  const { status, error, send, markSent } = useOrderSubmit();

  const submit = (e) => {
    e.preventDefault();
    const { name, email, spam } = readForm(e);
    if (spam) {
      markSent();
      return;
    }

    const details = [
      { label: 'Route', value: `${data.from.code} (${data.from.name}) to ${data.to.code} (${data.to.name})` },
      { label: 'Trip', value: data.tripType },
      { label: 'Flight type', value: data.flightType },
      { label: 'Passengers', value: data.persons },
      { label: 'Departure', value: data.departure },
    ];
    if (data.ret) details.push({ label: 'Return', value: data.ret });
    if (data.requirements) details.push({ label: 'Requirements', value: data.requirements });

    send({
      type: 'flight',
      customer: { name, email },
      summary: `${data.from.code} to ${data.to.code}, ${data.departure}`,
      details,
    });
  };

  return (
    <Modal title="Your flight request" onClose={onClose}>
      {status === 'sent' ? (
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
            <Honeypot />
            <SubmitRow status={status} error={error} label="Send request" />
          </form>
        </>
      )}
    </Modal>
  );
}

export function PlanModal({ plan, onClose }) {
  const { status, error, send, markSent } = useOrderSubmit();

  const submit = (e) => {
    e.preventDefault();
    const { name, email, spam } = readForm(e);
    if (spam) {
      markSent();
      return;
    }
    send({
      type: 'membership',
      customer: { name, email },
      summary: `${plan.name} plan, $${plan.price}/month`,
      details: [
        { label: 'Plan', value: plan.name },
        { label: 'Price', value: `$${plan.price}/month` },
      ],
    });
  };

  return (
    <Modal title={`${plan.name} membership`} onClose={onClose}>
      {status === 'sent' ? (
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
          <Honeypot />
          <SubmitRow status={status} error={error} label="Confirm" />
        </form>
      )}
    </Modal>
  );
}

export function ContactModal({ onClose }) {
  const { status, error, send, markSent } = useOrderSubmit();

  const submit = (e) => {
    e.preventDefault();
    const { name, email, message, spam } = readForm(e);
    if (spam) {
      markSent();
      return;
    }
    send({
      type: 'contact',
      customer: { name, email },
      summary: message.length > 70 ? `${message.slice(0, 70)}...` : message,
      details: [{ label: 'Message', value: message }],
    });
  };

  return (
    <Modal title="Contact" onClose={onClose}>
      {status === 'sent' ? (
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
          <Honeypot />
          <SubmitRow status={status} error={error} label="Send" />
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
