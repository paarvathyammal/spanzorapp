export default function InfluencerCategories() {
  const categories = [
    { title: "Emerging Voices", range: "20K–50K", description: "Fresh perspectives from rising talents", metric: "5,200+ creators" },
    { title: "Growth Champions", range: "50K–500K", description: "Proven engagement with growing audiences", metric: "3,800+ creators" },
    { title: "Rising Icons", range: "500K–2M", description: "Established voices with strong influence", metric: "1,500+ creators" },
    { title: "Premium", range: "2M–10M", description: "High-impact creators with massive reach", metric: "800+ creators" },
    { title: "Elite", range: "10M–25M", description: "Top-tier influencers with premium audiences", metric: "200+ creators" },
    { title: "Super Elite", range: "25M–50M", description: "Celebrity-level creators with global reach", metric: "85+ creators" },
    { title: "Legendary", range: "50M+", description: "Ultra-exclusive mega-influencers", metric: "25+ creators" }
  ];

  return (
    <section id="categories" className="stats-facts py-5 py-lg-11 py-xl-12 position-relative overflow-hidden">
      <div className="container">
        <div className="row gap-7 gap-xl-0">
          <div className="col-xl-4 col-xxl-4">
            <div
              className="d-flex align-items-center gap-7 py-2"
              data-aos="fade-right"
              data-aos-delay="100"
              data-aos-duration="1000"
            >
              <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">01</span>
              <hr className="border-line" />
              <span className="badge text-bg-dark">Creator Categories</span>
            </div>
          </div>

          <div className="col-xl-8 col-xxl-7">
            <div className="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
              <h2 className="mb-0">Influencer Categories</h2>
              <p className="fs-5 mb-0">
                Choose the creator tier that matches your goals and budget. Our curated network spans from
                emerging voices to legendary influencers across all categories.
              </p>
            </div>
          </div>
        </div>

        {/* Unified Grid (same pattern for all cards) */}
        <div className="row mt-8">
          {categories.map((category, index) => (
            <div key={index} className="col-sm-6 col-lg-4 col-xl-3 mb-6">
              <div
                className="card h-100 shadow-sm border-0"
                data-aos="fade-up"
                data-aos-delay={(index + 1) * 80}
                data-aos-duration="900"
              >
                <div className="card-body d-flex flex-column">
                  {/* Range pill (smaller & consistent) */}
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-primary text-dark px-3 py-1 fw-semibold" style={{fontSize: '0.8rem'}}>
                      {category.range}
                    </span>
                  </div>

                  {/* Title & description (reduced sizes) */}
                  <h5 className="mb-1" style={{fontWeight: 700}}>{category.title}</h5>
                  <p className="mb-2 text-muted" style={{fontSize: '0.95rem'}}>{category.description}</p>
                  <p className="mb-4 text-primary fw-semibold" style={{fontSize: '0.9rem'}}>{category.metric}</p>

                  {/* CTA */}
                  <a href="#packages" className="btn btn-outline-primary btn-sm mt-auto align-self-start">
                    <span className="btn-text">Explore This Category</span>
                    <iconify-icon icon="lucide:arrow-up-right" className="btn-icon ms-2 fs-6"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background art */}
      <div
        className="position-absolute bottom-0 start-0"
        data-aos="zoom-in"
        data-aos-delay="100"
        data-aos-duration="1000"
      >
        <img src="/assets/images/backgrounds/stats-facts-bg.svg" alt="" className="img-fluid" />
      </div>

      {/* Local sizing tweaks for this section only */}
      <style>{`
        #categories .card { background: #0f161b; border: 1px solid rgba(255,255,255,0.06); }
        #categories .card:hover { transform: translateY(-2px); transition: transform .2s ease; }
        #categories h5 { font-size: 1.05rem; }
        @media (min-width: 1200px){
          /* ensure a tidy 4-up grid on xl while remaining responsive */
          #categories .col-xl-3 { flex: 0 0 auto; width: 25%; }
        }
      `}</style>
    </section>
  );
}
