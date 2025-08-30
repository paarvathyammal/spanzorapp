export default function Hero() {
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
            <a href="#contact" className="btn">
              <span className="btn-text">I’m an Influencer</span>
              <iconify-icon
                icon="lucide:arrow-up-right"
                className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"
              ></iconify-icon>
            </a>

            {/* Button 2: Brand → #packages */}
            <a href="#packages" className="btn border border-white border-opacity-25">
              <span className="btn-text">I’m a Brand</span>
              <iconify-icon
                icon="lucide:arrow-up-right"
                className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"
              ></iconify-icon>
            </a>
          </div>

          {/* Influencer attraction lines (premium style) */}
          <div
            className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill bg-primary bg-opacity-10 border border-primary mt-4"
            data-aos="fade-up"
            data-aos-delay="400"
            data-aos-duration="1000"
          >
            <iconify-icon icon="lucide:stars" className="text-primary fs-6"></iconify-icon>
            <span className="fw-semibold text-primary">Influencers Wanted</span>
          </div>

          <p
            className="fs-5 text-white text-opacity-75 mt-2"
            data-aos="fade-up"
            data-aos-delay="600"
            data-aos-duration="1000"
          >
            Unlock consistent brand deals, grow your reach, and earn more 🚀
          </p>
        </div>
      </div>
    </section>
  );
}
