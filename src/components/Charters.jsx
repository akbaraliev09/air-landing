import Img from './Img.jsx';
import { IMAGES } from '../data/images.js';

export default function Charters({ onSelect }) {
  return (
    <section id="charters" className="section charters">
      <Img className="charters__map" src={IMAGES.worldMap} alt="" hideOnError />

      <h2 className="section__title">Luxury Charters</h2>

      <div className="container charters__grid">
        {IMAGES.charters.map((plane) => (
          <button key={plane.name} type="button" className="charter-card" onClick={onSelect}>
            <Img className="charter-card__img" src={plane.src} alt={plane.name} />
            <span>{plane.name}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
