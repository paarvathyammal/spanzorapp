export default function InfluencerCategories() {
  const categories = [
    { title: "Emerging Voices", range: "20K–50K", description: "Fresh perspectives from rising talents" },
    { title: "Growth Champions", range: "50K–500K", description: "Proven engagement with growing audiences" },
    { title: "Rising Icons", range: "500K–2M", description: "Established voices with strong influence" },
    { title: "Premium", range: "2M–10M", description: "High-impact creators with massive reach" },
    { title: "Elite", range: "10M–25M", description: "Top-tier influencers with premium audiences" },
    { title: "Super Elite", range: "25M–50M", description: "Celebrity-level creators with global reach" },
    { title: "Legendary", range: "50M+", description: "Ultra-exclusive mega-influencers" }
  ];

  return (
    <section id="categories" className="stats-facts py-5 py-lg-11 py-xl-12 position-relative overflow-hidden">
      <div className="container">
        <div className="row gap-7 gap-xl-0">
          <div className="col-xl-4 col-xxl-4">
            <div className="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
              <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">01</span>
              <hr className="border-line" />
              <span className="badge text-bg-dark">Creator Categories</span>
            </div>
          </div>
          <div className="col-xl-8 col-xxl-7">
            <div className="d-flex flex-column gap-9">
              <div className="row">
                <div className="col-xxl-8">
                  <div className="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                    <h2 className="mb-0">Influencer Categories</h2>
                    <p className="fs-5 mb-0">Choose the creator tier that matches your goals and budget. From emerging voices to legendary influencers.</p>
                  </div>
                </div>
              </div>
              <div className="row">
                {categories.slice(0, 3).map((category, index) => (
                  <div key={index} className="col-md-6 col-lg-4 mb-7 mb-lg-0">
                    <div className="d-flex flex-column gap-6 pt-9 border-top" data-aos="fade-up" data-aos-delay={(index + 2) * 100} data-aos-duration="1000">
                      <h3 className="mb-0 fs-14">{category.range}</h3>
                      <div>
                        <h4 className="mb-2">{category.title}</h4>
                        <p className="mb-0">{category.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional Categories Grid */}
      <div className="container mt-11">
        <div className="row">
          {categories.slice(3).map((category, index) => (
            <div key={index} className="col-md-6 col-xl-3 mb-7 mb-xl-0">
              <div className="card h-100" data-aos="fade-up" data-aos-delay={(index + 1) * 100} data-aos-duration="1000">
                <div className="card-body d-flex flex-column gap-4">
                  <div className="d-flex align-items-center gap-3">
                    <span className="badge bg-primary text-dark px-3 py-2">{category.range}</span>
                  </div>
                  <div>
                    <h5 className="mb-2">{category.title}</h5>
                    <p className="mb-0 text-muted">{category.description}</p>
                  </div>
                  <a href="#packages" className="btn btn-outline-primary mt-auto">
                    <span className="btn-text">Explore Plans</span>
                    <iconify-icon icon="lucide:arrow-up-right" className="btn-icon ms-2 fs-6"></iconify-icon>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="position-absolute bottom-0 start-0" data-aos="zoom-in" data-aos-delay="100" data-aos-duration="1000">
        <img src="/assets/images/backgrounds/stats-facts-bg.svg" alt="" className="img-fluid" />
      </div>
    </section>
  );
}