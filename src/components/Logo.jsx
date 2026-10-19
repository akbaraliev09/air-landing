import Img from './Img.jsx';
import { IMAGES } from '../data/images.js';

export default function Logo({ light = false }) {
  return (
    <Img
      src={IMAGES.logo}
      alt="AIR"
      className={`logo__img ${light ? 'logo__img--light' : ''}`}
      fallback={<span className={`logo__text ${light ? 'logo__text--light' : ''}`}>AIR</span>}
    />
  );
}
