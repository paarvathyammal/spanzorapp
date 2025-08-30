export default function Navbar() {
  return (
    <>
      {/* Inline styles for navbar brand reveal animation */}
      <style>{`
        .nav-brand{ display:inline-block; position:relative; }
        /* Morphing gradient text */
        .nav-brand-reveal{
          background: linear-gradient(270deg, #60a5fa, #a6ff47, #ffdd00);
          background-size: 600% 600%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 6s ease infinite;
          position: relative;
        }
        @keyframes gradientShift {
          0%{ background-position:0% 50% }
          50%{ background-position:100% 50% }
          100%{ background-position:0% 50% }
        }

        /* Shimmer sweep across whole word */
        .nav-brand-reveal::after {
          content: "";
          position: absolute;
          top: 0; left: -150%;
          width: 150%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.6), transparent);
          animation: shimmerSweep 10s linear infinite;
        }
        @keyframes shimmerSweep {
          0%,90% { left: -150%; }
          100%   { left: 150%; }
        }

        /* Pulse just the Z */
        .nav-brand-reveal .pulse-z {
          display:inline-block;
          animation: pulseZ 8s ease-in-out infinite;
        }
        @keyframes pulseZ {
          0%, 70%, 100% { transform: scale(1); }
          75% { transform: scale(1.15); }
          80% { transform: scale(1); }
        }
      `}</style>

      <header className="header border-4 border-primary border-top position-fixed start-0 top-0 w-100" style={{ zIndex: 1000 }}>
        <div className="container">
          <div className="header-wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <a href="#" className="logo-white d-flex align-items-center">
                {/* Add reveal animation class here */}
                <span className="spanzor-brand nav-brand nav-brand-reveal">
                  Span<span className="pulse-z">z</span>or
                </span>
              </a>
            </div>
            <div className="d-flex align-items-center gap-4">
              <div className="btn-group">
                <button
                  className="btn btn-secondary toggle-menu round-45 p-2 d-flex align-items-center justify-content-center bg-white rounded-circle btn-animate"
                  type="button" data-bs-toggle="dropdown" data-bs-auto-close="true" aria-expanded="false">
                  <iconify-icon icon="solar:hamburger-menu-line-duotone" className="menu-icon fs-8 text-dark"></iconify-icon>
                </button>
                <ul className="dropdown-menu dropdown-menu-end p-4">
                  <div className="d-flex flex-column gap-6">
                    <div className="hstack justify-content-between border-bottom pb-6">
                      <p className="mb-0 fs-5 text-dark">Menu</p>
                      <button type="button" className="btn-close opacity-75" aria-label="Close"></button>
                    </div>
                    <div className="d-flex flex-column gap-3">
                      <ul className="header-menu list-unstyled mb-0 d-flex flex-column gap-2">
                        <li className="header-item">
                          <a href="#hero" aria-current="true" className="header-link active hstack gap-2 fs-7 fw-bold text-dark">
                            <img src="/assets/images/svgs/secondary-leaf.svg" alt="" width="20" height="20" className="img-fluid animate-spin" />
                            Home
                          </a>
                        </li>
                        <li className="header-item">
                          <a href="#categories" className="header-link hstack gap-2 fs-7 fw-bold text-dark">
                            <img src="/assets/images/svgs/secondary-leaf.svg" alt="" width="20" height="20" className="img-fluid animate-spin" />
                            Categories
                          </a>
                        </li>
                        <li className="header-item">
                          <a href="#packages" className="header-link hstack gap-2 fs-7 fw-bold text-dark">
                            <img src="/assets/images/svgs/secondary-leaf.svg" alt="" width="20" height="20" className="img-fluid animate-spin" />
                            Packages
                          </a>
                        </li>
                        <li className="header-item">
                          <a href="#contact" className="header-link hstack gap-2 fs-7 fw-bold text-dark">
                            <img src="/assets/images/svgs/secondary-leaf.svg" alt="" width="20" height="20" className="img-fluid animate-spin" />
                            Contact
                          </a>
                        </li>
                      </ul>
                      <div className="hstack gap-3">
                        <a href="#contact" className="btn btn-outline-light fs-6 bg-white px-3 py-2 text-dark w-50 hstack justify-content-center btn-animate">
                          Get Started
                        </a>
                        <a href="#packages" className="btn btn-dark text-white fs-6 bg-dark px-3 py-2 w-50 hstack justify-content-center btn-animate">
                          View Plans
                        </a>
                      </div>
                    </div>
                    <div>
                      <p className="fs-8 text-dark fw-bold">Connect with India's top creators</p>
                    </div>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
