import { useEffect, useRef } from 'react';

export default function Navbar() {
  const brandRef = useRef(null);

  useEffect(() => {
    const el = brandRef.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('nav-logo-in-view');
          } else {
            el.classList.remove('nav-logo-in-view');
          }
        });
      },
      { threshold: 0.2 }
    );
    obs.observe(el);

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY || 0;
        const rot = (y * 0.05) % 4; // max ~4deg
        const bob = Math.sin(y * 0.01) * 1.5; // ±1.5px
        el.style.setProperty('--nav-rot', `${rot}deg`);
        el.style.setProperty('--nav-bob', `${bob}px`);
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      obs.disconnect();
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Inline styles for navbar brand animation */}
      <style>{`
        .nav-brand{ display:inline-block; will-change: transform, text-shadow; transform: translateY(var(--nav-bob, 0)) rotate(var(--nav-rot, 0)); transition: text-shadow 200ms ease; }
        .nav-logo-in-view{ animation: nav-float 7s ease-in-out infinite alternate, nav-glow 3.4s ease-in-out infinite; }
        @keyframes nav-float{ from { transform: translateY(calc(var(--nav-bob, 0) - 1.5px)) rotate(var(--nav-rot, 0)); } to { transform: translateY(calc(var(--nav-bob, 0) + 1.5px)) rotate(var(--nav-rot, 0)); } }
        @keyframes nav-glow{ 0%,100% { text-shadow: 0 0 0 rgba(166,255,71,0); } 50% { text-shadow: 0 0 10px rgba(166,255,71,0.35); } }
        @media (hover:hover){ .nav-brand:hover{ text-shadow: 0 0 12px rgba(166,255,71,0.45); } }
      `}</style>

      <header className="header border-4 border-primary border-top position-fixed start-0 top-0 w-100" style={{ zIndex: 1000 }}>
        <div className="container">
          <div className="header-wrapper d-flex align-items-center justify-content-between">
            <div className="logo">
              <a href="#" className="logo-white d-flex align-items-center">
                <span ref={brandRef} className="spanzor-brand nav-brand">Spanzor</span>
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
