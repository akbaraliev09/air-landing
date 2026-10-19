import Img from './Img.jsx';
import { ArrowRight } from './Icons.jsx';
import { IMAGES, SHOW_HERO_WINDOW } from '../data/images.js';

export default function Hero({ onExplore }) {
  return (
    <section
      id="home"
      className="hero"
      style={{ backgroundImage: `url(${IMAGES.heroBg})` }}
    >
      <div className="container hero__inner">
        <h1 className="hero__title">
          Enjoy <strong>RESERVED</strong>
          <br />
          Overhead Bin Space
        </h1>

        <button type="button" className="hero__cta" onClick={onExplore}>
          Explore Now <ArrowRight />
        </button>

        {SHOW_HERO_WINDOW && (
          <div className="hero__window">
            <Img src={IMAGES.heroWindow} alt="View of the wing from the plane window" />
          </div>
        )}
      </div>
    </section>
  );
}
