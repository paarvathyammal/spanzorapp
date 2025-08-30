import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const [role, setRole] = useState(''); // NEW: capture which role signed in
  const [responseMessage, setResponseMessage] = useState(''); // auto-hide toast message
  useEffect(() => {
    if (responseMessage) {
      const timer = setTimeout(() => {
        setResponseMessage('');
        setStatus(null);
      }, 5000); // hide after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [responseMessage]);

  const cityInputRef = useRef(null);

  // NEW: two separate GIS button refs
  const influencerBtnRef = useRef(null);
  const brandBtnRef = useRef(null);

  // Load Google Maps Places Autocomplete (unchanged)
  useEffect(() => {
    const existing = document.querySelector('script[data-google-maps]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_MAPS_API_KEY}&libraries=places`;
      s.async = true;
      s.defer = true;
      s.setAttribute('data-google-maps', 'true');
      s.onload = () => {
        if (window.google && cityInputRef.current) {
          new window.google.maps.places.Autocomplete(cityInputRef.current);
        }
      };
      document.body.appendChild(s);
    } else if (window.google && cityInputRef.current) {
      new window.google.maps.places.Autocomplete(cityInputRef.current);
    }
  }, []);

  // Load Google Identity Services and render TWO buttons (Influencer + Brand)
  useEffect(() => {
    const existing = document.querySelector('script[data-gis]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-gis', 'true');
      document.body.appendChild(s);
      s.onload = renderGISButtons;
    } else {
      renderGISButtons();
    }

    function renderGISButtons() {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;

      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

      // Render Influencer button with its own callback
      if (influencerBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleGoogleCredential(response, 'Influencer'),
        });
        window.google.accounts.id.renderButton(influencerBtnRef.current, {
          theme: 'filled_blue',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
        });
      }

      // Render Brand button with its own callback
      if (brandBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleGoogleCredential(response, 'Brand'),
        });
        window.google.accounts.id.renderButton(brandBtnRef.current, {
          theme: 'outline',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          logo_alignment: 'left',
        });
      }
    }
  }, []);

  // Parse the Google ID token and prefill form; also set role
  function handleGoogleCredential(response, asRole) {
    try {
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      setGoogleUser({ name: payload.name, email: payload.email });
      setRole(asRole || '');

      // Prefill visible inputs
      const nameField = document.querySelector('input[name="name"]');
      const emailField = document.querySelector('input[name="email"]');
      if (nameField && payload.name) nameField.value = payload.name;
      if (emailField && payload.email) emailField.value = payload.email;

      // Update hidden role too
      const roleField = document.querySelector('input[name="role"]');
      if (roleField) roleField.value = asRole || '';
    } catch (e) {
      console.warn('Failed to parse Google credential', e);
    }
  }

  // Submit (keeps your existing Formspree + optional reCAPTCHA pattern)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      // If you’re using reCAPTCHA v3, keep this block; otherwise it will just skip if window.grecaptcha is missing.
      await new Promise((resolve, reject) => {
        if (!window.grecaptcha) return resolve();
        window.grecaptcha.ready(() => {
          window.grecaptcha
            .execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then((token) => {
              const hidden = document.createElement('input');
              hidden.type = 'hidden';
              hidden.name = 'g-recaptcha-response';
              hidden.value = token;
              form.appendChild(hidden);
              resolve();
            })
            .catch(reject);
        });
      });

      const res = await fetch(process.env.REACT_APP_FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setResponseMessage('✅ Thank you! Your campaign brief has been submitted successfully. We will contact you within 24 hours.');
        form.reset();
        setGoogleUser(null);
        setRole('');
      } else {
        setStatus('error');
        setResponseMessage('❌ Something went wrong. Please try again.');
      }
    } catch (err) {
      setStatus('error');
      setResponseMessage('❌ An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <section id="contact" className="py-5 py-lg-11 py-xl-12 bg-dark">
      <div className="container">
        <div className="d-flex flex-column gap-5 gap-xl-10">
          <div className="row gap-7 gap-xl-0">
            <div className="col-xl-4 col-xxl-4">
              <div
                className="d-flex align-items-center gap-7 py-2"
                data-aos="fade-right"
                data-aos-delay="100"
                data-aos-duration="1000"
              >
                <span className="round-36 flex-shrink-0 text-dark rounded-circle bg-primary hstack justify-content-center fw-medium">
                  03
                </span>
                <hr className="border-line bg-white" />
                <span className="badge text-dark bg-white">Contact</span>
              </div>
            </div>

            <div className="col-xl-8 col-xxl-7">
              <div className="row">
                <div className="col-xxl-8">
                  <div
                    className="d-flex flex-column gap-6"
                    data-aos="fade-up"
                    data-aos-delay="100"
                    data-aos-duration="1000"
                  >
                    <h2 className="mb-0 text-white">Contact Us</h2>
                    <p className="fs-5 mb-0 text-white text-opacity-70">
                      Tell us about your campaign. We'll reach out shortly to discuss your influencer marketing needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card */}
          <div className="row justify-content-center">
            <div className="col-xl-8">
              <div className="card bg-white" data-aos="fade-up" data-aos-delay="200" data-aos-duration="1000">
                <div className="card-body p-7 p-xxl-8">
                  {/* NEW: Two Google Sign-In buttons (Influencer + Brand), card-styled layout */}
                  <div className="d-flex flex-column align-items-center gap-4 mb-6 pb-6 border-bottom w-100">
                    <h5 className="mb-3">Quick Sign-In</h5>
                    <div className="row w-100">
                      <div className="col-md-6 mb-3 mb-md-0">
                        <div className="card border h-100 shadow-sm">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <div ref={influencerBtnRef} aria-label="Google Sign-In for Influencers"></div>
                            <p className="mt-2 mb-0 small text-muted">Continue as <strong>Influencer</strong></p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="card border h-100 shadow-sm">
                          <div className="card-body d-flex flex-column align-items-center justify-content-center">
                            <div ref={brandBtnRef} aria-label="Google Sign-In for Brands"></div>
                            <p className="mt-2 mb-0 small text-muted">Continue as <strong>Brand</strong></p>
                          </div>
                        </div>
                      </div>
                    </div>
                    {googleUser && (
                      <div className="alert alert-success d-flex align-items-center gap-2 mt-3 mb-0 w-100">
                        <iconify-icon icon="lucide:user-check" className="fs-5"></iconify-icon>
                        <span>
                          Signed in as <strong>{googleUser.name}</strong> ({googleUser.email}) — {role || 'Role not set'}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* FULL FORM (unchanged) */}
                  <form onSubmit={handleSubmit}>
                    {/* NEW: role included in submission */}
                    <input type="hidden" name="role" value={role} />

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Your Name *</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="name"
                          placeholder="Enter your full name"
                          required
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Email Address *</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="email"
                          type="email"
                          placeholder="your.email@company.com"
                          required
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Company</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="company"
                          placeholder="Your company name"
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Phone</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="phone"
                          placeholder="10-digit mobile number"
                          pattern="^[0-9]{10}$"
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">City</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="city"
                          placeholder="Select your city"
                          ref={cityInputRef}
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">State *</label>
                        <select
                          className="form-select form-select-lg border rounded-3"
                          name="state"
                          required
                          defaultValue=""
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        >
                          <option value="" disabled>
                            Select State
                          </option>
                          <option>Tamil Nadu</option>
                          <option>Kerala</option>
                          <option>Karnataka</option>
                          <option>Andhra Pradesh</option>
                          <option>Telangana</option>
                          <option>Maharashtra</option>
                          <option>Delhi</option>
                          <option>Gujarat</option>
                          <option>West Bengal</option>
                          <option>Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Industry Vertical *</label>
                        <select
                          className="form-select form-select-lg border rounded-3"
                          name="vertical"
                          required
                          defaultValue=""
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        >
                          <option value="" disabled>
                            Select Industry
                          </option>
                          <option>Food & Beverage</option>
                          <option>Travel & Tourism</option>
                          <option>Beauty & Cosmetics</option>
                          <option>Technology</option>
                          <option>Fashion & Lifestyle</option>
                          <option>Healthcare</option>
                          <option>Education</option>
                          <option>Finance</option>
                          <option>Other</option>
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Campaign Budget *</label>
                        <select
                          className="form-select form-select-lg border rounded-3"
                          name="budget"
                          required
                          defaultValue=""
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        >
                          <option value="" disabled>
                            Select Budget Range
                          </option>
                          <option>₹10,000 – ₹50,000</option>
                          <option>₹50,000 – ₹2,00,000</option>
                          <option>₹2,00,000 – ₹5,00,000</option>
                          <option>₹5,00,000 – ₹15,00,000</option>
                          <option>₹15,00,000 – ₹25,00,000</option>
                          <option>₹25,00,000+</option>
                        </select>
                      </div>
                    </div>

                    <div className="row g-4 mb-4">
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Expected Deliverables</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="deliverables"
                          placeholder="e.g., 2 Reels, 1 Post, Story mentions"
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                      <div className="col-md-6">
                        <label className="form-label fw-semibold">Preferred Platforms</label>
                        <input
                          className="form-control form-control-lg border rounded-3"
                          name="platforms"
                          placeholder="Instagram, YouTube, Twitter, etc."
                          style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                        />
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="form-label fw-semibold">Campaign Brief</label>
                      <textarea
                        className="form-control form-control-lg border rounded-3"
                        name="message"
                        placeholder="Tell us about your brand, campaign goals, target audience, and any specific requirements..."
                        rows="4"
                        style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}
                      ></textarea>
                    </div>

                    {/* Honeypot for spam protection */}
                    <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

                    <button className="btn btn-lg w-100 justify-content-center" type="submit">
                      <span className="btn-text">Submit Campaign Brief</span>
                      <iconify-icon
                        icon="lucide:arrow-up-right"
                        className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"
                      ></iconify-icon>
                    </button>

                    {status === 'success' && (
                      <div className="alert alert-success d-flex align-items-center gap-3 mt-4 mb-0">
                        <iconify-icon icon="lucide:check-circle" className="fs-5"></iconify-icon>
                        <div>
                          <strong>Thank you!</strong> We've received your campaign brief and will get back to you within 24 hours.
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="alert alert-danger d-flex align-items-center gap-3 mt-4 mb-0">
                        <iconify-icon icon="lucide:alert-circle" className="fs-5"></iconify-icon>
                        <div>
                          <strong>Oops!</strong> Something went wrong. Please try again or contact us directly.
                        </div>
                      </div>
                    )}
                  </form>
                  {responseMessage && (
                    <div className={`mt-3 alert ${status === 'success' ? 'alert-success' : 'alert-danger'} d-flex align-items-center gap-2 mb-0`}>
                      <iconify-icon icon={status === 'success' ? 'lucide:check-circle' : 'lucide:alert-circle'} className="fs-5"></iconify-icon>
                      <span>{responseMessage}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* /Card */}
        </div>
      </div>
    </section>
  );
}
