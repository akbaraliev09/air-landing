import { CheckIcon } from './Icons.jsx';
import { PLANS } from '../data/content.js';

export default function Membership({ onChoose }) {
  return (
    <section id="membership" className="section membership">
      <h2 className="section__title">Enjoy Our Membership</h2>

      <div className="container plans">
        {PLANS.map((plan) => (
          <article key={plan.name} className={`plan ${plan.featured ? 'plan--featured' : ''}`}>
            <h3>{plan.name}</h3>
            <p className="plan__sub">What You&rsquo;ll Get</p>
            <ul>
              {plan.features.map(([label, value]) => (
                <li key={label}>
                  <CheckIcon />
                  <span>
                    {label} {value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="plan__price">
              <strong>${plan.price}</strong>/month
            </p>
            <button type="button" className={`btn plan__btn ${plan.featured ? 'btn--light' : ''}`} onClick={() => onChoose(plan)}>
              Choose
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
