import Img from './Img.jsx';
import { SPEC_ICONS } from './Icons.jsx';
import { SPECS_LEFT, SPECS_RIGHT } from '../data/content.js';
import { IMAGES } from '../data/images.js';

function SpecCard({ item }) {
  const Icon = SPEC_ICONS[item.icon];
  return (
    <article className="spec-card">
      <Img
        className="spec-card__icon"
        src={IMAGES.icons[item.icon]}
        alt=""
        fallback={
          <div className="spec-card__icon">
            <Icon />
          </div>
        }
      />
      <h3>{item.title}</h3>
      <p>{item.text}</p>
    </article>
  );
}

export default function Specs() {
  return (
    <section id="specification" className="section specs">
      <h2 className="section__title">Private Jet Performance And Specifications</h2>

      <div className="container specs__grid">
        <div className="specs__col">
          {SPECS_LEFT.map((item) => (
            <SpecCard key={item.title} item={item} />
          ))}
        </div>

        <div className="specs__plane">
          <Img src={IMAGES.jetTop} alt="Private jet, top view" />
        </div>

        <div className="specs__col">
          {SPECS_RIGHT.map((item) => (
            <SpecCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
