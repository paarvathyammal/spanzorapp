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

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const wrapper = document.querySelector('.social-icons-wrapper');
    if (!wrapper) return;
    const icons = Array.from(wrapper.querySelectorAll('.social-icon'));
    if (!icons.length) return;

    const R = 180;           // influence radius in px
    const MAX_BOOST = 0.35;  // max extra scale (1 -> 1.35)

    const brandColors = {
      "ri:youtube-fill": "255,0,0",
      "simple-icons:youtubeshorts": "255,0,0",
      "ri:instagram-fill": "225,48,108",
      "ri:facebook-fill": "24,119,242",
      "ri:twitter-x-fill": "29,155,240",
      "ri:linkedin-box-fill": "10,102,194",
    };

    function onMove(e){
      const x = e.clientX;
      const y = e.clientY;
      icons.forEach(icon => {
        const rect = icon.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const d = Math.hypot(x - cx, y - cy);
        const t = Math.max(0, 1 - d / R); // 0..1 falloff
        const scale = 1 + t * MAX_BOOST;
        icon.style.transform = `scale(${scale})`;

        const iconName = icon.getAttribute("icon");
        const rgb = brandColors[iconName] || "255,255,255";
        const glowStrength = (t * 1).toFixed(2); // stronger glow
        icon.style.filter = `drop-shadow(0 0 ${20 * t}px rgba(${rgb},${glowStrength}))`;
      });
    }

    function onLeave(){
      icons.forEach(icon => { 
        icon.style.transform = 'scale(1)'; 
        icon.style.filter = 'none';
      });
    }

    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseleave', onLeave);

    // Touch support: slight lift on touchmove
    wrapper.addEventListener('touchmove', (ev) => {
      if (!ev.touches || !ev.touches[0]) return;
      onMove({ clientX: ev.touches[0].clientX, clientY: ev.touches[0].clientY });
    }, { passive: true });
    wrapper.addEventListener('touchend', onLeave, { passive: true });

    return () => {
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseleave', onLeave);
    };
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
            className="d-flex gap-3 flex-wrap mt-4 align-items-center"
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
          </div>

          <div
            className="d-flex align-items-center justify-content-end pe-4 social-row position-relative"
            data-aos="fade-up"
            data-aos-delay="420"
            data-aos-duration="900"
          >
            <div className="social-icons-wrapper">
              <iconify-icon icon="ri:youtube-fill" class="social-icon me-4" aria-label="YouTube" role="img"></iconify-icon>
              <iconify-icon icon="simple-icons:youtubeshorts" class="social-icon me-4" aria-label="YouTube Shorts" role="img"></iconify-icon>
              <iconify-icon icon="ri:instagram-fill" class="social-icon me-4" aria-label="Instagram" role="img"></iconify-icon>
              <iconify-icon icon="ri:facebook-fill" class="social-icon" aria-label="Facebook" role="img"></iconify-icon>
              <iconify-icon icon="ri:twitter-x-fill" class="social-icon ms-4" aria-label="Twitter/X" role="img"></iconify-icon>
              <iconify-icon icon="ri:linkedin-box-fill" class="social-icon ms-4" aria-label="LinkedIn" role="img"></iconify-icon>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .social-row .social-icon {
          display: inline-block;
          line-height: 1; /* avoid inflating row height */
          transform: translateZ(0);
          transition: transform 200ms ease, filter 200ms ease;
          will-change: transform;
          backface-visibility: hidden;
          cursor: default;
          font-size: 2rem !important; /* base size */
          color: #FFFFFF;
        }
        .social-icons-wrapper {
          position: absolute;
          top: -60px; /* move slightly more upwards to align with buttons */
          right: 20%; /* roughly place in the middle between Brand button and right edge */
          display: flex;
          gap: 0.75rem;
        }
        @media (min-width: 992px) {
          .social-row .social-icon { font-size: 2.5rem !important; }
        }
      `}</style>
    </section>
  );
}
