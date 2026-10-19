export const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M2 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CaretDown = () => (
  <svg width="8" height="5" viewBox="0 0 8 5" aria-hidden="true">
    <path d="M0 0h8L4 5z" fill="currentColor" />
  </svg>
);

export const SwapIcon = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 5h9M9.5 2.5 12 5 9.5 7.5M13 11H4M6.5 8.5 4 11l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarSmall = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
    <rect x="2" y="3" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5" />
    <path d="M2 7h14M6 1.5v3M12 1.5v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <rect x="7" y="9.5" width="4" height="4" rx="0.8" stroke="currentColor" strokeWidth="1.3" />
  </svg>
);

export const CheckIcon = () => (
  <svg className="check" viewBox="0 0 16 16" aria-hidden="true">
    <circle cx="8" cy="8" r="8" fill="currentColor" />
    <path d="M4.5 8.2l2.4 2.3 4.6-4.8" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const BurgerIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
    <path d="M3 6h16M3 11h16M3 16h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

// ---- built-in spec icons (used if icon-*.png files are not added) ----
export const SeatIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M31 6c1.5-.5 3 .3 3.4 1.8l4.2 16c.4 1.5-.5 3-2 3.4l-3 .8-6.6-22z" fill="#ec5b62" />
    <path d="M12 20h14l-2 12H10z" fill="#a9b1bb" />
    <path d="M8 35h22v4H8z" fill="#8a929c" />
    <path d="M14 39v4M26 39v4" stroke="#8a929c" strokeWidth="3" />
  </svg>
);

export const ShieldIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="4" y="8" width="40" height="32" rx="4" fill="#cfe5fb" />
    <rect x="4" y="8" width="40" height="7" rx="3" fill="#4a90e2" />
    <path d="M24 17l9 3.5v7c0 5-4 9-9 11-5-2-9-6-9-11v-7z" fill="#2fbf71" />
    <path d="M19.5 27.5l3.2 3.2 6-6.4" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const CalendarIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <rect x="5" y="8" width="38" height="34" rx="4" fill="#fff" stroke="#e1e5ee" strokeWidth="2" />
    <path d="M5 12a4 4 0 0 1 4-4h30a4 4 0 0 1 4 4v6H5z" fill="#ec5b62" />
    <g fill="#6b7cff">
      <rect x="10" y="22" width="4" height="4" rx="1" />
      <rect x="17" y="22" width="4" height="4" rx="1" />
      <rect x="24" y="22" width="4" height="4" rx="1" />
      <rect x="10" y="29" width="4" height="4" rx="1" />
      <rect x="17" y="29" width="4" height="4" rx="1" />
      <rect x="10" y="36" width="4" height="4" rx="1" />
    </g>
    <circle cx="35" cy="35" r="9" fill="#4a90e2" />
    <path d="M35 30v5.5l3.5 2" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CrewIcon = () => (
  <svg viewBox="0 0 48 48" aria-hidden="true">
    <path d="M8 46c0-9 7-14 16-14s16 5 16 14z" fill="#3f6fb5" />
    <circle cx="24" cy="21" r="9" fill="#f5c9a0" />
    <path d="M13 17c0-7 5-11 11-11s11 4 11 11z" fill="#2b3a5c" />
    <rect x="12" y="15" width="24" height="4" rx="2" fill="#1e2a45" />
    <circle cx="24" cy="12" r="2.5" fill="#f2c94c" />
  </svg>
);

export const SPEC_ICONS = {
  seat: SeatIcon,
  shield: ShieldIcon,
  calendar: CalendarIcon,
  crew: CrewIcon,
};
