import Img from './Img.jsx';
import { JET_SECTIONS } from '../data/content.js';
import { IMAGES } from '../data/images.js';

export default function PrivateJet() {
  return (
    <section id="private-jet" className="section private-jet">
      <h2 className="section__title">Private Jet For Business &amp; Leisure Purposes</h2>

      {JET_SECTIONS.map((item) => (
        <div key={item.title} className={`jet-row ${item.reverse ? 'jet-row--reverse' : ''}`}>
          <div className="jet-row__inner">
            <Img className="jet-row__img" src={IMAGES[item.image]} alt={item.title} />
            <div className="jet-row__text">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
