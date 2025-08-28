export default function PackagesSection() {
  const packages = [
    { 
      icon: '🌱', 
      title: 'Starter', 
      price: '₹10,000 – ₹50,000', 
      description: 'Perfect for new brands to build awareness with nano creators.',
      features: ['Nano & micro influencers', 'Basic campaign management', 'Performance tracking', 'Email support'],
      stats: { campaigns: '150+', reach: '2M+', engagement: '4.5%' },
      featured: false 
    },
    { 
      icon: '🚀', 
      title: 'Growth', 
      price: '₹50,000 – ₹2,00,000', 
      description: 'Scale reach with micro & mid-tier influencers.',
      features: ['Mid-tier influencers', 'Advanced analytics', 'Campaign optimization', 'Priority support', 'A/B testing'],
      stats: { campaigns: '300+', reach: '8M+', engagement: '6.2%' },
      featured: true 
    },
    { 
      icon: '⭐', 
      title: 'Premium', 
      price: '₹2,00,000 – ₹5,00,000', 
      description: 'High-impact campaigns for established brands.',
      features: ['Premium creators', 'Custom strategy', 'Dedicated manager', '24/7 support', 'White-glove service'],
      stats: { campaigns: '200+', reach: '25M+', engagement: '8.1%' },
      featured: false 
    },
    { 
      icon: '👑', 
      title: 'Elite', 
      price: '₹5,00,000 – ₹15,00,000', 
      description: 'Elite creators for premium market presence.',
      features: ['Elite influencers', 'Multi-platform campaigns', 'ROI optimization', 'VIP support'],
      stats: { campaigns: '120+', reach: '50M+', engagement: '9.3%' },
      featured: false 
    },
    { 
      icon: '💎', 
      title: 'Super Elite', 
      price: '₹15,00,000 – ₹25,00,000', 
      description: 'Super-elite creators for maximum visibility.',
      features: ['Celebrity partnerships', 'Global campaigns', 'Brand ambassadorships', 'Executive support'],
      stats: { campaigns: '75+', reach: '100M+', engagement: '12.5%' },
      featured: false 
    },
    { 
      icon: '🏆', 
      title: 'Legendary', 
      price: '₹25,00,000+', 
      description: 'Ultra-exclusive campaigns with legendary influencers.',
      features: ['Mega influencers', 'Viral campaigns', 'Brand transformation', 'C-level partnership'],
      stats: { campaigns: '40+', reach: '250M+', engagement: '15.8%' },
      featured: false 
    }
  ];

  return (
    <section id="packages" className="pricing-section py-5 py-lg-11 py-xl-12 bg-light-gray">
      <div className="container">
        <div className="d-flex flex-column gap-5 gap-xl-10">
          <div className="d-flex flex-column gap-5 gap-xl-11">
            <div className="row gap-7 gap-xl-0">
              <div className="col-xl-4 col-xxl-4">
                <div className="d-flex align-items-center gap-7 py-2" data-aos="fade-right" data-aos-delay="100" data-aos-duration="1000">
                  <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">02</span>
                  <hr className="border-line bg-white" />
                  <span className="badge text-bg-dark">Campaign Packages</span>
                </div>
              </div>
              <div className="col-xl-8 col-xxl-7">
                <div className="row">
                  <div className="col-xxl-8">
                    <div className="d-flex flex-column gap-6" data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
                      <h2 className="mb-0">Our Packages</h2>
                      <p className="fs-5 mb-0 text-opacity-70">Find the perfect campaign package for your brand's objectives and budget requirements. Each package includes proven strategies and measurable results.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row">
              {packages.map((pkg, index) => (
                <div key={index} className={`col-lg-6 col-xl-4 mb-7 mb-xl-0 d-flex align-items-stretch`}>
                  <div className={`card w-100 ${pkg.featured ? 'border-primary' : ''}`} data-aos="fade-up" data-aos-delay={(index + 1) * 100} data-aos-duration="1000">
                    <div className="card-body p-7 p-xxl-5 d-flex flex-column gap-8">
                      <div className="d-flex flex-column gap-6">
                        <div className="d-flex align-items-center gap-3">
                          <span className="fs-2">{pkg.icon}</span>
                          <h5 className="mb-0 fw-medium">{pkg.title}</h5>
                          {pkg.featured && (
                            <span className="badge text-bg-primary hstack gap-2">
                              <iconify-icon icon="lucide:flame" className="fs-5"></iconify-icon>
                              Most popular
                            </span>
                          )}
                        </div>
                        <div className="hstack gap-2">
                          <h3 className="mb-0 text-primary">{pkg.price}</h3>
                        </div>
                        <p className="mb-0">{pkg.description}</p>
                        
                        {/* Package Statistics */}
                        <div className="row g-3">
                          <div className="col-4">
                            <div className="text-center">
                              <h6 className="mb-0 text-primary fw-bold">{pkg.stats.campaigns}</h6>
                              <small className="text-muted">Campaigns</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="text-center">
                              <h6 className="mb-0 text-primary fw-bold">{pkg.stats.reach}</h6>
                              <small className="text-muted">Avg Reach</small>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className="text-center">
                              <h6 className="mb-0 text-primary fw-bold">{pkg.stats.engagement}</h6>
                              <small className="text-muted">Engagement</small>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="pt-8 border-top d-flex flex-column gap-6">
                        <h6 className="mb-0 fw-normal">What's Included:</h6>
                        <ul className="list-unstyled d-flex flex-column gap-3 mb-0">
                          {pkg.features.map((feature, fIndex) => (
                            <li key={fIndex} className="hstack gap-3">
                              <span className="round-32 rounded-circle bg-primary flex-shrink-0 hstack justify-content-center">
                                <iconify-icon icon="lucide:check" className="fs-6 text-dark"></iconify-icon>
                              </span>
                              <h6 className="mb-0 fw-normal">{feature}</h6>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <a href="#contact" className="btn w-100 justify-content-center">
                        <span className="btn-text">Choose {pkg.title}</span>
                        <iconify-icon icon="lucide:arrow-up-right" className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"></iconify-icon>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}