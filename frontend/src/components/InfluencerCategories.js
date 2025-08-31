// Horizontal scale (Stripe-style) for influencer tiers
export default function InfluencerCategories() {
  const categories = [
    { title: 'Emerging Voices', range: '20K–50K', description: 'Fresh perspectives from rising talents', metric: '5,200+ creators' },
    { title: 'Growth Champions', range: '50K–500K', description: 'Proven engagement with growing audiences', metric: '3,800+ creators' },
    { title: 'Rising Icons', range: '500K–2M', description: 'Established voices with strong influence', metric: '1,500+ creators' },
    { title: 'Premium', range: '2M–10M', description: 'High-impact creators with massive reach', metric: '800+ creators' },
    { title: 'Elite', range: '10M–25M', description: 'Top-tier influencers with premium audiences', metric: '200+ creators' },
    { title: 'Super Elite', range: '25M–50M', description: 'Celebrity-level creators with global reach', metric: '85+ creators' },
    { title: 'Legendary', range: '50M+', description: 'Ultra-exclusive mega-influencers', metric: '25+ creators' }
  ];

  return (
    <section id="categories" className="py-5 py-lg-11 py-xl-12 position-relative overflow-hidden">
      <div className="container">
        {/* Heading Row */}
        <div className="row gap-7 gap-xl-0 align-items-start">
          <div className="col-xl-4 col-xxl-4">
            <div className="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
              <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">01</span>
              <hr className="border-line" />
              <span className="badge text-bg-dark">Creator Categories</span>
            </div>
          </div>

          <div className="col-xl-8 col-xxl-7">
            <div className="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
              <h2 className="mb-0">Influencer Categories</h2>
              <p className="fs-5 mb-0">A clear progression from <strong>Emerging</strong> to <strong>Legendary</strong>. Hover a node to learn more.</p>
            </div>
          </div>
        </div>

        {/* Horizontal Scale */}
        <div className="tier-scale mt-8 position-relative" data-aos="fade-up" data-aos-delay="150" data-aos-duration="1000">
          {/* the line */}
          <div className="scale-line" aria-hidden="true"></div>

          <ul className="scale-nodes list-unstyled m-0 p-0 d-flex justify-content-between">
            {categories.map((c, i) => {
              // grow size/intensity from left to right
              const size = 14 + i * 3; // px
              const isEnd = i === categories.length - 1;
              return (
                <li key={c.title} className="node-wrap text-center">
                  <button
                    className={`node ${isEnd ? 'node-end' : ''}`}
                    style={{ width: size, height: size }}
                    aria-label={`${c.title} — ${c.range}`}
                  />
                  <div className="node-label">
                    <div className="label-title">{c.title}</div>
                    <div className="label-range">{c.range}</div>
                    <div className="label-metric">{c.metric}</div>
                  </div>
                  {/* tooltip */}
                  <div className="node-tip">
                    <div className="tip-title">{c.title}</div>
                    <div className="tip-desc">{c.description}</div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Background art (kept) */}
      <div className="position-absolute bottom-0 start-0" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000">
        <img src="/assets/images/backgrounds/stats-facts-bg.svg" alt="" className="img-fluid" />
      </div>

      {/* Scoped styles for the scale */}
      <style>{`
        #categories { color: #e6edf3; }
        #categories .scale-line{
          position: absolute; left: 0; right: 0; top: 28px;
          height: 3px;
          background: linear-gradient(90deg, rgba(124,92,255,.6), rgba(166,255,71,.6));
          border-radius: 999px;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05) inset;
        }
        #categories .scale-nodes { position: relative; }
        #categories .node-wrap{ position: relative; flex: 1 1 auto; display:flex; flex-direction:column; align-items:center; gap:.5rem; }
        #categories .node{
          position: relative; z-index: 1; border: 2px solid rgba(255,255,255,.15);
          background: radial-gradient(80% 80% at 30% 25%, rgba(255,255,255,.12), rgba(255,255,255,0) 65%);
          border-radius: 999px; box-shadow: 0 2px 16px rgba(0,0,0,.25);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
        }
        #categories .node:hover{ transform: scale(1.15); border-color: rgba(255,255,255,.35); box-shadow: 0 6px 26px rgba(124,92,255,.25), 0 0 0 2px rgba(166,255,71,.15) inset; }
        #categories .node-end{ background: linear-gradient(135deg, rgba(166,255,71,.25), rgba(124,92,255,.25)); border-color: rgba(166,255,71,.45); }

        #categories .node-label { line-height: 1.15; }
        #categories .label-title{ font-weight: 700; font-size: .95rem; }
        #categories .label-range{ color:#9fb0c3; font-size: .85rem; }
        #categories .label-metric{ color:#A6FF47; font-size: .8rem; font-weight:600; }

        /* tooltip */
        #categories .node-tip{
          position: absolute; bottom: 54px; left: 50%; transform: translateX(-50%);
          padding: .5rem .6rem; border-radius: 10px; min-width: 180px;
          background: #0f161b; border: 1px solid rgba(255,255,255,.08);
          box-shadow: 0 8px 30px rgba(0,0,0,.25);
          opacity: 0; pointer-events: none; transition: opacity .2s ease;
        }
        #categories .node-wrap:hover .node-tip{ opacity: 1; }
        #categories .tip-title{ font-weight:700; font-size:.9rem; margin-bottom:.25rem; }
        #categories .tip-desc{ color:#9fb0c3; font-size:.85rem; }

        /* responsive tweaks */
        @media (max-width: 992px){
          #categories .scale-line{ top: 22px; }
          #categories .label-title{ font-size: .9rem; }
          #categories .label-range{ font-size: .8rem; }
          #categories .label-metric{ font-size: .75rem; }
        }
        @media (max-width: 576px){
          /* collapse to scrollable row on small screens */
          #categories .tier-scale{ overflow-x:auto; padding-bottom: 12px; }
          #categories .scale-nodes{ min-width: 720px; }
        }
      `}</style>
    </section>
  );
}
