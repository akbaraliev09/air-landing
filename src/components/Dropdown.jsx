import { useEffect, useRef, useState } from 'react';
import { CaretDown } from './Icons.jsx';

export default function Dropdown({ value, options, onChange }) {
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
    <div className="dropdown" ref={ref}>
      <button type="button" className="dropdown__btn" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
        {value}
        <CaretDown />
      </button>
      {open && (
        <ul className="dropdown__menu">
          {options.map((option) => (
            <li key={option}>
              <button
                type="button"
                className={option === value ? 'is-active' : ''}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
              >
                {option}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
