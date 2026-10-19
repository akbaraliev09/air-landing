import { useEffect, useMemo, useRef, useState } from 'react';
import Dropdown from './Dropdown.jsx';
import { ArrowRight, CalendarSmall, SwapIcon } from './Icons.jsx';
import { AIRPORTS, FLIGHT_TYPES, PERSONS, TRIP_TYPES } from '../data/content.js';
import { addDays, formatDate, fromISO, startOfDay, toISO } from '../utils/dates.js';

function AirportField({ label, value, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const onDown = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  return (
    <div className="field" ref={ref}>
      <button type="button" className="field__btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        <span className="field__label">{label}</span>
        <span className="field__big">{value.code}</span>
        <span className="field__small">{value.name}</span>
      </button>
      {open && (
        <ul className="dropdown__menu dropdown__menu--wide">
          {AIRPORTS.map((airport) => (
            <li key={airport.code}>
              <button
                type="button"
                className={airport.code === value.code ? 'is-active' : ''}
                onClick={() => {
                  onChange(airport);
                  setOpen(false);
                }}
              >
                <strong>{airport.code}</strong> {airport.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DateField({ label, date, min, disabled, onPrev, onNext, onPick }) {
  const inputRef = useRef(null);

  const openPicker = () => {
    const el = inputRef.current;
    if (!el) return;
    try {
      if (el.showPicker) el.showPicker();
      else el.focus();
    } catch (err) {
      el.focus();
    }
  };

  return (
    <div className={`date ${disabled ? 'date--disabled' : ''}`}>
      <span className="field__label">{label}</span>
      <div className="date__row">
        <span className="field__big date__value">{formatDate(date)}</span>
        <button
          type="button"
          className="icon-btn"
          disabled={disabled}
          aria-label={`Choose ${label.toLowerCase()} date`}
          onClick={openPicker}
        >
          <CalendarSmall />
        </button>
        <input
          ref={inputRef}
          className="date__input"
          type="date"
          tabIndex={-1}
          aria-hidden="true"
          min={toISO(min)}
          value={toISO(date)}
          onChange={(e) => {
            if (e.target.value) onPick(fromISO(e.target.value));
          }}
        />
      </div>
      <div className="date__nav">
        <button type="button" disabled={disabled} onClick={onPrev}>
          Prev
        </button>
        <button type="button" disabled={disabled} onClick={onNext}>
          Next
        </button>
      </div>
    </div>
  );
}

export default function BookingForm({ onSubmit }) {
  const today = useMemo(() => startOfDay(new Date()), []);

  const [tripType, setTripType] = useState('Round Trip');
  const [flightType, setFlightType] = useState('Flight Type');
  const [persons, setPersons] = useState('Person');
  const [from, setFrom] = useState(AIRPORTS[0]);
  const [to, setTo] = useState(AIRPORTS[1]);
  const [departure, setDeparture] = useState(() => addDays(today, 3));
  const [ret, setRet] = useState(() => addDays(today, 7));
  const [showReq, setShowReq] = useState(false);
  const [requirements, setRequirements] = useState('');
  const [error, setError] = useState('');

  const isRound = tripType === 'Round Trip';

  const changeDeparture = (d) => {
    const next = d < today ? today : d;
    setDeparture(next);
    if (ret < next) setRet(next);
  };

  const changeReturn = (d) => {
    setRet(d < departure ? departure : d);
  };

  const swap = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSubmit = () => {
    if (from.code === to.code) {
      setError('Choose different departure and arrival airports.');
      return;
    }
    if (flightType === 'Flight Type') {
      setError('Select a flight type.');
      return;
    }
    if (persons === 'Person') {
      setError('Select the number of passengers.');
      return;
    }
    setError('');
    onSubmit({
      tripType,
      flightType,
      persons,
      from,
      to,
      departure: formatDate(departure),
      ret: isRound ? formatDate(ret) : null,
      requirements: requirements.trim(),
    });
  };

  return (
    <section id="booking" className="booking">
      <div className="container">
        <div className="booking__card">
          <div className="booking__options">
            <Dropdown value={tripType} options={TRIP_TYPES} onChange={setTripType} />
            <Dropdown value={flightType} options={FLIGHT_TYPES} onChange={setFlightType} />
            <Dropdown value={persons} options={PERSONS} onChange={setPersons} />
          </div>

          <div className="booking__fields">
            <AirportField label="From" value={from} onChange={setFrom} />
            <button type="button" className="swap" aria-label="Swap airports" onClick={swap}>
              <SwapIcon />
            </button>
            <AirportField label="To" value={to} onChange={setTo} />

            <div className="dates">
              <DateField
                label="Departure"
                date={departure}
                min={today}
                onPrev={() => changeDeparture(addDays(departure, -1))}
                onNext={() => changeDeparture(addDays(departure, 1))}
                onPick={changeDeparture}
              />
              <DateField
                label="Return"
                date={ret}
                min={departure}
                disabled={!isRound}
                onPrev={() => changeReturn(addDays(ret, -1))}
                onNext={() => changeReturn(addDays(ret, 1))}
                onPick={changeReturn}
              />
            </div>
          </div>

          <button
            type="button"
            className="link-btn link-btn--underline booking__req"
            aria-expanded={showReq}
            onClick={() => setShowReq((v) => !v)}
          >
            Add Requirements
          </button>

          {showReq && (
            <textarea
              className="booking__textarea"
              rows="3"
              placeholder="Luggage, pets, catering, special requests..."
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
            />
          )}

          {error && (
            <p className="form-error" role="alert">
              {error}
            </p>
          )}

          <button type="button" className="btn booking__submit" onClick={handleSubmit}>
            Book Flights <ArrowRight />
          </button>
        </div>
      </div>
    </section>
  );
}
