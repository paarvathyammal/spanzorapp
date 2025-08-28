import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfluencerCategories from './components/InfluencerCategories';
import PackagesSection from './components/PackagesSection';
import ContactSection from './components/ContactSection';

function App() {
  useEffect(() => {
    // Initialize AOS (Animate On Scroll) when available
    const initAOS = () => {
      if (window.AOS) {
        window.AOS.init({
          duration: 1000,
          easing: 'ease-in-out',
          once: true,
          offset: 50
        });
      }
    };

    // Try to initialize AOS, or wait for it to load
    if (window.AOS) {
      initAOS();
    } else {
      const checkAOS = setInterval(() => {
        if (window.AOS) {
          initAOS();
          clearInterval(checkAOS);
        }
      }, 100);
      
      // Clear interval after 5 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkAOS), 5000);
    }

    // Initialize other Studiova scripts when available
    const initOwlCarousel = () => {
      if (window.$ && window.$.fn.owlCarousel) {
        // Initialize any carousels if needed in the future
      }
    };

    if (window.$) {
      initOwlCarousel();
    }
  }, []);

  return (
    <div className="page-wrapper overflow-hidden">
      <Navbar />
      <Hero />
      <InfluencerCategories />
      <PackagesSection />
      
      {/* Stats Section */}
      <section className="why-choose-us py-5 py-lg-11 py-xl-12">
        <div className="container">
          <div className="row justify-content-between gap-5 gap-xl-0">
            <div className="col-xl-3 col-xxl-3">
              <div className="d-flex flex-column gap-7">
                <div className="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                  <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">04</span>
                  <hr className="border-line" />
                  <span className="badge text-bg-dark">Why Spanzor</span>
                </div>
                <h2 className="mb-0" data-aos="fade-right" data-aos-delay="200" data-aos-duration="1000">Why choose Spanzor</h2>
                <p className="mb-0 fs-5" data-aos="fade-right" data-aos-delay="300" data-aos-duration="1000">
                  We connect brands with India's top creators to deliver measurable results through data-driven influencer marketing campaigns.
                </p>
              </div>
            </div>
            <div className="col-xl-9 col-xxl-8">
              <div className="row">
                <div className="col-lg-4 mb-7 mb-lg-0">
                  <div className="card position-relative overflow-hidden bg-primary h-100" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div className="d-flex flex-column gap-3 position-relative z-1">
                        <ul className="list-unstyled mb-0 hstack gap-1">
                          {[...Array(5)].map((_, i) => (
                            <li key={i}><iconify-icon icon="solar:star-bold" className="fs-6 text-dark"></iconify-icon></li>
                          ))}
                        </ul>
                        <p className="mb-0 fs-6 text-dark">Delivering exceptional campaign results with proven ROI.</p>
                      </div>
                      <div className="position-relative z-1">
                        <div className="pb-6 border-bottom">
                          <h2 className="mb-0">98.5%</h2>
                          <p className="mb-0">Campaign success rate</p>
                        </div>
                        <div className="pt-6">
                          <h5 className="mb-0">Trusted by 500+ Brands</h5>
                          <p className="mb-0">Leading companies across India</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-7 mb-lg-0">
                  <div className="d-flex flex-column gap-7" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                    <div className="card bg-dark">
                      <div className="card-body d-flex flex-column gap-7">
                        <div>
                          <h2 className="mb-0 text-white">10M+</h2>
                          <p className="mb-0 text-white text-opacity-70">Creator network reach</p>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card-body">
                        <h3 className="mb-2">24/7 Support</h3>
                        <p className="mb-0">Dedicated campaign management and real-time support.</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 mb-7 mb-lg-0">
                  <div className="card border h-100 position-relative overflow-hidden" data-aos="fade-up" data-aos-delay="300" data-aos-duration="1000">
                    <span className="border rounded-circle round-490 d-block position-absolute top-0 start-50 translate-middle"></span>
                    <div className="card-body d-flex flex-column justify-content-between">
                      <div>
                        <h2 className="mb-0">15+</h2>
                        <p className="mb-0 text-dark">Industry verticals</p>
                      </div>
                      <div className="d-flex flex-column gap-3">
                        <h4 className="mb-0 text-primary">Spanzor</h4>
                        <p className="mb-0 fs-5 text-dark">
                          Specialized campaigns across food, travel, beauty, tech, and more industries.
                        </p>
                      </div>
                    </div>
                    <span className="border rounded-circle round-490 d-block position-absolute top-100 start-50 translate-middle"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ContactSection />
    </div>
  );
}

export default App;