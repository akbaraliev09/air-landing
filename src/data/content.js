export const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Booking', id: 'booking' },
  { label: 'Private Jet', id: 'private-jet' },
  { label: 'Specification', id: 'specification' },
  { label: 'Luxury Charters', id: 'charters' },
  { label: 'Membership', id: 'membership' },
];

export const LOREM =
  "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors";

export const JET_SECTIONS = [
  { title: 'Private Jet Charter', text: LOREM, image: 'privateJet', reverse: false },
  { title: 'Business Jet Charter', text: LOREM, image: 'businessJet', reverse: true },
];

const SPEC_TEXT = 'It is a long established fact that a reader will be distracted by the readable';

export const SPECS_LEFT = [
  { title: 'Luxury And Comfort', icon: 'seat', text: SPEC_TEXT },
  { title: 'Personal schedule & booking', icon: 'calendar', text: SPEC_TEXT },
];

export const SPECS_RIGHT = [
  { title: 'SAFETY AND SECURITY', icon: 'shield', text: SPEC_TEXT },
  { title: 'EXPERIENCED CREW', icon: 'crew', text: SPEC_TEXT },
];

export const AIRPORTS = [
  { code: 'LAX', name: 'Los Angeles Intl Arpt, Los Angeles' },
  { code: 'MIA', name: 'Miami Intl, Miami' },
  { code: 'JFK', name: 'John F. Kennedy Intl, New York' },
  { code: 'SFO', name: 'San Francisco Intl, San Francisco' },
  { code: 'ORD', name: "O'Hare Intl, Chicago" },
  { code: 'LAS', name: 'Harry Reid Intl, Las Vegas' },
  { code: 'DFW', name: 'Dallas/Fort Worth Intl, Dallas' },
  { code: 'ATL', name: 'Hartsfield-Jackson Intl, Atlanta' },
  { code: 'SEA', name: 'Seattle-Tacoma Intl, Seattle' },
  { code: 'BOS', name: 'Logan Intl, Boston' },
];

export const TRIP_TYPES = ['Round Trip', 'One Way'];
export const FLIGHT_TYPES = ['Economy', 'Business', 'First Class', 'Private Jet'];
export const PERSONS = ['1 Person', '2 Persons', '3 Persons', '4 Persons', '5 Persons', '6 Persons'];

export const PLANS = [
  {
    name: 'Popular',
    price: 250,
    featured: false,
    features: [
      ['One-time initiation fee', '$0'],
      ['Deposit', '$50k'],
      ['Pricing / rates', 'Dynamic'],
      ['Priority fleet access', 'Yes'],
      ['Guaranteed fleet access', 'No'],
    ],
  },
  {
    name: 'Business',
    price: 480,
    featured: true,
    features: [
      ['One-time initiation fee', '$0'],
      ['Deposit', '$50k'],
      ['Pricing / rates', 'Dynamic'],
      ['Priority fleet access', 'Yes'],
      ['Guaranteed fleet access', 'No'],
    ],
  },
  {
    name: 'Elite',
    price: 680,
    featured: false,
    features: [
      ['One-time initiation fee', '$0'],
      ['Deposit', '$50k'],
      ['Pricing / rates', 'Dynamic'],
      ['Priority fleet access', 'Yes'],
      ['Guaranteed fleet access', 'Yes'],
    ],
  },
];

export const INFO_TEXTS = {
  about: {
    title: 'About Us',
    text: 'AIR helps travellers book private jets, business charters and flight memberships in a few clicks.',
  },
  news: {
    title: 'News',
    text: 'There is no news yet. Check back soon.',
  },
};
