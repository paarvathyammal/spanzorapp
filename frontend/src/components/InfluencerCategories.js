// Influencer categories presented as pricing-style cards (consistent with plans UI)
export default function InfluencerCategories() {
  const categories = [
    {
      title: 'Emerging Voices',
      range: '20K–50K followers',
      punch: 'Fresh perspectives from rising talents',
      metrics: [
        { k: '2.1K+', label: 'Campaigns' },
        { k: '0.8M', label: 'Avg Reach' },
        { k: '3.9%', label: 'Engagement' },
      ],
      includes: [
        'Nano & micro creators',
        'Basic campaign guidance',
        'Starter analytics',
        'Email support',
      ],
      cta: 'Explore Emerging',
      icon: 'lucide:sparkles',
    },
    {
      title: 'Growth Champions',
      range: '50K–500K followers',
      punch: 'Proven engagement with growing audiences',
      badge: 'Popular',
      metrics: [
        { k: '3.8K+', label: 'Campaigns' },
        { k: '2.5M', label: 'Avg Reach' },
        { k: '5.4%', label: 'Engagement' },
      ],
      includes: [
        'Micro & mid-tier creators',
        'Advanced optimization',
        'Priority support',
        'A/B testing',
      ],
      cta: 'Choose Growth',
      icon: 'lucide:rocket',
      featured: true,
    },
    {
      title: 'Rising Icons',
      range: '500K–2M followers',
      punch: 'Established voices with strong influence',
      metrics: [
        { k: '1.5K+', label: 'Campaigns' },
        { k: '6.8M', label: 'Avg Reach' },
        { k: '6.1%', label: 'Engagement' },
      ],
      includes: [
        'Mid-tier creators',
        'Creative studio collab',
        'Performance reporting',
        'Guided deliverables',
      ],
      cta: 'Work with Icons',
      icon: 'lucide:trending-up',
    },
    {
      title: 'Premium',
      range: '2M–10M followers',
      punch: 'High‑impact creators with massive reach',
      metrics: [
        { k: '800+', label: 'Campaigns' },
        { k: '12M', label: 'Avg Reach' },
        { k: '7.2%', label: 'Engagement' },
      ],
      includes: [
        'Top creators & vertical fit',
        'Custom strategy',
        'Dedicated manager',
        '24/7 support',
      ],
      cta: 'Choose Premium',
      icon: 'lucide:star',
    },
    {
      title: 'Elite',
      range: '10M–25M followers',
      punch: 'Top‑tier influencers with premium audiences',
      metrics: [
        { k: '200+', label: 'Campaigns' },
        { k: '22M', label: 'Avg Reach' },
        { k: '7.8%', label: 'Engagement' },
      ],
      includes: [
        'Cross‑platform packages',
        'Creator shortlists',
        'Usage & whitelisting',
        'Quarterly reviews',
      ],
      cta: 'Book Elite',
      icon: 'lucide:crown',
    },
    {
      title: 'Mega',
      range: '25M–50M followers',
      punch: 'Mass‑market creators with continent‑scale reach',
      metrics: [
        { k: '120+', label: 'Campaigns' },
        { k: '35M', label: 'Avg Reach' },
        { k: '8.4%', label: 'Engagement' },
      ],
      includes: [
        'Cross‑platform domination',
        'Dedicated producer & legal',
        'Usage & paid amplification',
        'Monthly strategy sync',
      ],
      cta: 'Book Mega',
      icon: 'lucide:trophy',
    },
    {
      title: 'Legendary',
      range: '50M+ followers',
      punch: 'Ultra‑exclusive mega‑influencers',
      metrics: [
        { k: '25+', label: 'Campaigns' },
        { k: '50M+', label: 'Avg Reach' },
        { k: '8.9%', label: 'Engagement' },
      ],
      includes: [
        'Global celebrity roster',
        'High‑touch production',
        'Brand safety & legal',
        'White‑glove service',
      ],
      cta: 'Talk to Sales',
      icon: 'lucide:gem',
    },
  ];

  return (
    <section id="categories" className="py-7 py-lg-11 py-xl-12 position-relative overflow-hidden bg-body-tertiary">
      <div className="container">
        {/* Header */}
        <div className="row gap-7 gap-xl-0 align-items-start mb-6">
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
              <p className="fs-5 mb-0">Same visual language as your pricing — clean cards, quick stats, and a clear CTA for each tier.</p>
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="row g-4" data-aos="fade-up" data-aos-delay="150" data-aos-duration="1000">
          {categories.map((c, idx) => (
            <div key={c.title} className="col-12 col-md-6 col-xl-4">
              <div className={`card h-100 shadow-sm border-0 category-card ${c.featured ? 'category-featured' : ''}`}>
                <div className="card-body p-5 d-flex flex-column">
                  {/* Title Row */}
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center gap-2">
                      <iconify-icon icon={c.icon} class="text-primary" style={{fontSize:'22px'}}></iconify-icon>
                      <h5 className="mb-0">{c.title}</h5>
                    </div>
                    {c.badge && <span className="badge rounded-pill text-bg-success-subtle text-success fw-semibold">{c.badge}</span>}
                  </div>

                  {/* Range */}
                  <div className="display-6 fw-bold text-success-emphasis mb-2" style={{letterSpacing:'-0.5px'}}>{c.range}</div>
                  <p className="text-body-secondary mb-4">{c.punch}</p>

                  {/* Metrics Row */}
                  <div className="d-flex align-items-center gap-5 mb-4 flex-wrap">
                    {c.metrics.map((m) => (
                      <div key={m.label} className="d-flex flex-column align-items-start">
                        <div className="h5 mb-0 fw-bold">{m.k}</div>
                        <small className="text-body-secondary">{m.label}</small>
                      </div>
                    ))}
                  </div>

                  {/* Divider */}
                  <hr className="my-3" />

                  {/* Includes */}
                  <div className="d-flex flex-column gap-3 mb-4">
                    {c.includes.map((i) => (
                      <div key={i} className="d-flex align-items-center gap-2">
                        <span className="check-dot" />
                        <span>{i}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-auto">
                    <a href="#contact" className="btn btn-lg w-100 justify-content-center">
                      <span className="btn-text">{c.cta}</span>
                      <iconify-icon icon="lucide:arrow-up-right" class="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"></iconify-icon>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Join CTA for Influencers */}
        <div className="row mt-6 justify-content-end" data-aos="fade-left" data-aos-delay="150" data-aos-duration="1000">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card border-0 join-card w-100">
              <div className="card-body p-5 p-xl-6 d-flex flex-column flex-lg-row align-items-start align-items-lg-center gap-4">
                <div className="flex-grow-1">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <iconify-icon icon="lucide:badge-check" class="text-success" style={{fontSize:'22px'}}></iconify-icon>
                    <h4 className="mb-0">Join Spanzor — built for creators</h4>
                  </div>
                  <p className="mb-3 text-body-secondary">Create a free profile, get matched to brand briefs, and manage payouts in one dashboard.</p>

                  <div className="d-flex flex-wrap gap-4">
                    <div className="d-flex align-items-center gap-2"><span className="mini-check"/> Free listing</div>
                    <div className="d-flex align-items-center gap-2"><span className="mini-check"/> Auto‑matched campaigns</div>
                    <div className="d-flex align-items-center gap-2"><span className="mini-check"/> Transparent payouts</div>
                    <div className="d-flex align-items-center gap-2"><span className="mini-check"/> Keep content ownership</div>
                  </div>
                </div>

                <div className="ms-lg-auto">
                  <a href="#contact" className="btn btn-lg px-4 join-btn d-inline-flex align-items-center gap-2">
                    <span>Join as Influencer</span>
                    <iconify-icon icon="lucide:arrow-up-right" class="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"></iconify-icon>
                  </a>
                  <div className="small text-body-secondary mt-2">It’s free. Takes less than 2 minutes.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background art (kept) */}
      <div className="bg-art" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000">
        <img src="/assets/images/backgrounds/stats-facts-bg.svg" alt="" className="img-fluid" />
      </div>

      {/* Scoped styles to match pricing card look */}
      <style>{`
        #categories { color: inherit; }
        #categories .container{ position:relative; z-index:2; }
        #categories .bg-art{ position:absolute; inset:auto auto 0 0; z-index:1; pointer-events:none; }
        /* Light background section to match pricing */
        #categories.bg-body-tertiary { background: var(--bs-body-tertiary-bg, #f5f7fa); }
        /* White cards like pricing */
        #categories .category-card{ 
          border-radius: 18px; 
          background: #ffffff; 
          border: 1px solid rgba(15,22,27,.06); 
          box-shadow: 0 6px 24px rgba(15,22,27,.06);
        }
        #categories .category-featured{ 
          outline: 2px solid rgba(166,255,71,.35); 
          box-shadow: 0 12px 48px rgba(166,255,71,.14);
        }
        /* Green tick like pricing */
        #categories .check-dot{ 
          width: 20px; height: 20px; border-radius: 999px; display:inline-block; 
          background: #A6FF47; 
          box-shadow: 0 0 0 6px rgba(166,255,71,.18);
        }
        /* CTA button matches site palette */
        #categories .btn{ background: #C7FF6E; color: #0e1419; border: none; border-radius: 999px; padding: 14px 18px; }
        #categories .btn:hover{ filter: brightness(0.95); }
        /* Range size */
        #categories .display-6{ font-size: 2rem; }
        @media (min-width: 1400px){ #categories .display-6{ font-size: 2.2rem; } }
        @media (min-width:1200px){
          #categories .row.g-4{ --bs-gutter-x:1.25rem; --bs-gutter-y:1.25rem; }
        }

        /* Join CTA card styling */
        #categories .join-card{ 
          background: radial-gradient(120% 120% at 0% 0%, #F5FFE0 0%, #FFFFFF 45%);
          border: 1px solid rgba(15,22,27,.06); 
          box-shadow: 0 10px 30px rgba(15,22,27,.08);
          border-radius: 18px;
        }
        #categories .join-card{ max-width:920px; margin-left:auto; }
        @media (min-width:1200px){
          #categories .join-card{ margin-right:var(--bs-gutter-x, 0.75rem); }
        }
        /* Give the section a bit more bottom space so the card never crowds the next section */
        #categories{ padding-bottom:4rem; }
        @media (min-width:992px){ #categories{ padding-bottom:5rem; } }

        #categories .mini-check{
          width: 14px; height: 14px; border-radius: 999px; display:inline-block; background:#A6FF47; box-shadow:0 0 0 4px rgba(166,255,71,.20);
        }
        #categories .join-btn{ background:#C7FF6E; color:#0e1419; border:none; border-radius:999px; }
        #categories .join-btn:hover{ filter:brightness(0.95); }
      `}</style>
    </section>
  );
}
