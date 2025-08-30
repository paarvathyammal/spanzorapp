import { useEffect } from 'react';

export default function Hero() {
  useEffect(() => {
    if (!document.querySelector('script[data-iconify]')) {
      const s = document.createElement('script');
      s.src = 'https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js';
      s.async = true;
      s.setAttribute('data-iconify', 'true');
      document.body.appendChild(s);
    }
  }, []);

  return (
    <section id="hero" className="banner-section position-relative d-flex align-items-end min-vh-100">
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background: 'linear-gradient(135deg, #1F2A2E 0%, #2A3B40 50%, #1F2A2E 100%)',
          opacity: 0.95,
        }}
      ></div>

      <div className="container">
        <div className="d-flex flex-column gap-4 pb-8 position-relative z-1">
          <div className="row align-items-center">
            <div className="col-xl-8">
              <div
                className="d-flex align-items-center gap-4"
                data-aos="fade-up"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                <img
                  src="/assets/images/svgs/primary-leaf.svg"
                  alt=""
                  className="img-fluid animate-spin"
                />
                <p className="mb-0 text-white fs-5 text-opacity-70">
                  India's <span className="text-primary">next-generation</span> platform connecting
                  brands with creators to run powerful, measurable campaigns.
                </p>
              </div>
            </div>
          </div>

          <div
            className="d-flex align-items-end gap-3"
            data-aos="fade-up"
            data-aos-delay="200"
            data-aos-duration="1000"
          >
            <h1 className="mb-0 fs-16 text-white lh-1">
              Find, Collaborate & Grow with Influencers
            </h1>
            <a href="#contact" className="p-1 ps-7 bg-primary rounded-pill">
              <span className="bg-white round-52 rounded-circle d-flex align-items-center justify-content-center">
                <iconify-icon icon="lucide:arrow-up-right" className="fs-8 text-dark"></iconify-icon>
              </span>
            </a>
          </div>

          <div
            className="d-flex gap-3 flex-wrap mt-4"
            data-aos="fade-up"
            data-aos-delay="300"
            data-aos-duration="1000"
          >
            {/* Button 1: Influencer → #contact */}
            <a
              href="#contact"
              className="btn btn-animate"
              data-aos="fade-up"
              data-aos-delay="320"
              data-aos-duration="900"
              onClick={(e) => {
                const t = e.currentTarget;
                const r = t.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                t.style.setProperty('--ripple-x', `${x}px`);
                t.style.setProperty('--ripple-y', `${y}px`);
              }}
            >
              <span className="btn-text">I’m an Influencer</span>
              <iconify-icon
                icon="lucide:arrow-up-right"
                className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"
              ></iconify-icon>
            </a>

            {/* Button 2: Brand → #packages */}
            <a
              href="#packages"
              className="btn border border-white border-opacity-25 btn-animate btn-ghost"
              data-aos="fade-up"
              data-aos-delay="380"
              data-aos-duration="900"
              onClick={(e) => {
                const t = e.currentTarget;
                const r = t.getBoundingClientRect();
                const x = e.clientX - r.left;
                const y = e.clientY - r.top;
                t.style.setProperty('--ripple-x', `${x}px`);
                t.style.setProperty('--ripple-y', `${y}px`);
              }}
            >
              <span className="btn-text">I’m a Brand</span>
              <iconify-icon
                icon="lucide:arrow-up-right"
                className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"
              ></iconify-icon>
            </a>

            {/* Social logos row */}
            <div className="d-flex justify-content-end gap-5 mt-4 align-items-center social-row">
              <iconify-icon icon="ri:youtube-fill" class="fs-1 text-white social-icon" aria-label="YouTube" role="img"></iconify-icon>
              <iconify-icon icon="simple-icons:youtubeshorts" class="fs-1 text-white social-icon" aria-label="YouTube Shorts" role="img"></iconify-icon>
              <iconify-icon icon="ri:instagram-fill" class="fs-1 text-white social-icon" aria-label="Instagram" role="img"></iconify-icon>
              <iconify-icon icon="ri:facebook-fill" class="fs-1 text-white social-icon" aria-label="Facebook" role="img"></iconify-icon>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .social-row .social-icon {
          display: inline-block;
          transform: translateZ(0);
          transition: transform 200ms ease, filter 200ms ease;
          will-change: transform;
          cursor: default;
        }
        .social-row:hover .social-icon { transform: scale(1.08); }
        .social-row .social-icon:hover { transform: scale(1.25); }
        @media (prefers-reduced-motion: reduce) {
          .social-row .social-icon,
          .social-row:hover .social-icon,
          .social-row .social-icon:hover { transition: none; transform: none; }
        }
      `}</style>
    </section>
  );
}
