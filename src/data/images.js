const base = import.meta.env.BASE_URL;
const p = (name) => `${base}images/${name}`;

export const SHOW_HERO_WINDOW = true;

export const IMAGES = {
  logo: p('logo.png'), // public/images/logo.png
  heroBg: p('hero-bg.png'), // public/images/hero-bg.png
  heroWindow: p('hero-window.png'), // public/images/hero-window.png
  privateJet: p('private-jet.png'), // public/images/private-jet.png
  businessJet: p('business-jet.png'), // public/images/business-jet.png
  jetTop: p('jet-top.png'), // public/images/jet-top.png
  worldMap: p('world-map.png'), // public/images/world-map.png

  icons: {
    seat: p('icon-comfort.png'),
    shield: p('icon-safety.png'),
    calendar: p('icon-schedule.png'),
    crew: p('icon-crew.png'),
  },

  charters: [
    { name: 'Piaggio P.180 Avanti', src: p('charter-piaggio.png') },
    { name: 'Pilatus PC-12', src: p('charter-pilatus.png') },
    { name: 'Piper Pa27 Aztec', src: p('charter-piper.png') },
    { name: 'Beech BE100 King Air', src: p('charter-beech.png') },
  ],
};
