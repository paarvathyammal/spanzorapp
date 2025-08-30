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

  // NEW: single GIS button ref + live role ref
  const googleBtnRef = useRef(null);
  const roleRef = useRef('');
  useEffect(() => { roleRef.current = role; }, [role]);

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

  // Load Google Identity Services and render ONE button (role chosen via chips)
  useEffect(() => {
    const existing = document.querySelector('script[data-gis]');
    if (!existing) {
      const s = document.createElement('script');
      s.src = 'https://accounts.google.com/gsi/client';
      s.async = true;
      s.defer = true;
      s.setAttribute('data-gis', 'true');
      document.body.appendChild(s);
      s.onload = renderGISButton;
    } else {
      renderGISButton();
    }

    function renderGISButton() {
      if (!window.google || !window.google.accounts || !window.google.accounts.id) return;
      const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;
      if (googleBtnRef.current && !googleBtnRef.current.hasChildNodes()) {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (response) => handleGoogleCredential(response, roleRef.current || ''),
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, {
          theme: 'filled_blue',
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

  // Sign out / revoke Google session and clear local state
  function handleSignOut() {
    try {
      // Revoke the token for this email if available
      if (googleUser?.email && window.google?.accounts?.id?.revoke) {
        window.google.accounts.id.revoke(googleUser.email, () => {
          // no-op; we'll clear local state below
        });
      }
      // Disable auto select for one-tap (belt & suspenders)
      if (window.google?.accounts?.id?.disableAutoSelect) {
        window.google.accounts.id.disableAutoSelect();
      }
    } catch (e) {
      // swallow any GIS errors; continue clearing local state
    }

    // Clear UI state
    setGoogleUser(null);
    setRole('');
    setStatus(null);
    setResponseMessage('');

    // Reset any visible form (in case one is open)
    const form = document.querySelector('#contact form');
    if (form) {
      try { form.reset(); } catch {}
    }

    // Also clear hidden role input if present
    const roleField = document.querySelector('input[name="role"]');
    if (roleField) roleField.value = '';
  }

  // Submit to Formspree only
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      // Optional reCAPTCHA v3
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

      const formData = new FormData(form);
      if (!formData.get('role')) formData.set('role', role || '');
      if (!formData.get('submittedAt')) formData.set('submittedAt', new Date().toISOString());

      const formspreeURL = process.env.REACT_APP_FORMSPREE_ENDPOINT;
      if (!formspreeURL) {
        setStatus('error');
        setResponseMessage('❌ Missing REACT_APP_FORMSPREE_ENDPOINT.');
        return;
      }

      const res = await fetch(formspreeURL, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        setResponseMessage('✅ Submitted successfully. We will contact you within 24 hours.');
        form.reset();
        setGoogleUser(null);
        setRole('');
      } else {
        setStatus('error');
        setResponseMessage('❌ Submission failed. Please try again.');
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
                  {/* Single Google button + Role chips */}
                  <div className="d-flex flex-column align-items-center gap-3 mb-6 pb-6 border-bottom w-100">
                    <h5 className="mb-1">Quick Sign-In</h5>

                    {/* Role chips */}
                    <div className="d-flex gap-2">
                      <button type="button" onClick={() => setRole('Influencer')} className={`btn btn-sm ${role === 'Influencer' ? 'btn-primary' : 'btn-outline-secondary'}`}>Influencer</button>
                      <button type="button" onClick={() => setRole('Brand')} className={`btn btn-sm ${role === 'Brand' ? 'btn-primary' : 'btn-outline-secondary'}`}>Brand</button>
                    </div>
                    <small className="text-muted">Choose a role, then sign in with Google to unlock the form</small>

                    {/* One Google button */}
                    <div ref={googleBtnRef} aria-label="Google Sign-In"></div>

                    {googleUser && (
                      <div className="alert alert-success d-flex align-items-center justify-content-between mt-2 mb-0 w-100">
                        <div className="d-flex align-items-center gap-2">
                          <iconify-icon icon="lucide:user-check" className="fs-5"></iconify-icon>
                          <span>
                            Signed in as <strong>{googleUser.name}</strong> ({googleUser.email}) — {role || 'Role not set'}
                          </span>
                        </div>
                        <button type="button" onClick={handleSignOut} className="btn btn-sm btn-outline-secondary">Sign out</button>
                      </div>
                    )}
                  </div>

                  {/* ROLE-SPECIFIC FORMS */}
                  {role === 'Influencer' && googleUser && (
                    <InfluencerForm onSubmit={handleSubmit} cityInputRef={cityInputRef} role={role} googleUser={googleUser} />
                  )}

                  {role === 'Brand' && googleUser && (
                    <BrandForm onSubmit={handleSubmit} cityInputRef={cityInputRef} role={role} googleUser={googleUser} />
                  )}

                  {role && !googleUser && (
                    <div className="alert alert-warning d-flex align-items-center gap-2 mb-0">
                      <iconify-icon icon="lucide:log-in" className="fs-5"></iconify-icon>
                      <span>Please sign in with Google above to continue with the {role.toLowerCase()} form.</span>
                    </div>
                  )}

                  {!role && (
                    <div className="alert alert-info d-flex align-items-center gap-2 mb-0">
                      <iconify-icon icon="lucide:info" className="fs-5"></iconify-icon>
                      <span>Please choose a role above — Continue with Google as <strong>Influencer</strong> or <strong>Brand</strong> to view the form.</span>
                    </div>
                  )}

                  {/* shared submit feedback (auto-hides) */}
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

// =====================
// Influencer Form
// =====================
function InfluencerForm({ onSubmit, cityInputRef, role, googleUser }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="role" value={role || 'Influencer'} />
      <input type="hidden" name="googleEmail" value={googleUser?.email || ''} />
      <input type="hidden" name="googleName" value={googleUser?.name || ''} />

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Creator Name *</label>
          <input className="form-control form-control-lg border rounded-3" name="name" placeholder="Your full name" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Email Address *</label>
          <input className="form-control form-control-lg border rounded-3" name="email" type="email" placeholder="you@example.com" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Mobile / WhatsApp</label>
          <input className="form-control form-control-lg border rounded-3" name="phone" placeholder="10-digit mobile number" pattern="^[0-9]{10}$" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">City</label>
          <input className="form-control form-control-lg border rounded-3" name="city" placeholder="Select your city" ref={cityInputRef} style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Primary Category *</label>
          <select className="form-select form-select-lg border rounded-3" name="category" required defaultValue="" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <option value="" disabled>Select Category</option>
            <option>Food & Beverage</option>
            <option>Travel & Tourism</option>
            <option>Beauty & Cosmetics</option>
            <option>Technology</option>
            <option>Fashion & Lifestyle</option>
            <option>Education</option>
            <option>Gaming</option>
            <option>Fitness & Sports</option>
            <option>Other</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Preferred Platforms</label>
          <input className="form-control form-control-lg border rounded-3" name="platforms" placeholder="Instagram, YouTube, etc." style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-4">
          <label className="form-label fw-semibold">Followers</label>
          <input className="form-control form-control-lg border rounded-3" name="followers" type="number" min="0" placeholder="e.g., 32000" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Rate – Reel (₹)</label>
          <input className="form-control form-control-lg border rounded-3" name="rateReel" type="number" min="0" step="100" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-4">
          <label className="form-label fw-semibold">Rate – Story (₹)</label>
          <input className="form-control form-control-lg border rounded-3" name="rateStory" type="number" min="0" step="100" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Portfolio / Profile URL</label>
          <input className="form-control form-control-lg border rounded-3" name="url" type="url" placeholder="https://instagram.com/username" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Consent to Share Contact</label>
          <select className="form-select form-select-lg border rounded-3" name="consent" defaultValue="" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <option value="" disabled>Select</option>
            <option>Yes</option>
            <option>No</option>
          </select>
        </div>
      </div>

      <div className="mb-6">
        <label className="form-label fw-semibold">Notes</label>
        <textarea className="form-control form-control-lg border rounded-3" name="notes" placeholder="Any special requirements, past collabs, etc." rows="4" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}></textarea>
      </div>

      {/* Honeypot for spam protection */}
      <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

      <button className="btn btn-lg w-100 justify-content-center" type="submit">
        <span className="btn-text">Submit Influencer Profile</span>
        <iconify-icon icon="lucide:arrow-up-right" className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"></iconify-icon>
      </button>
    </form>
  );
}

// =====================
// Brand Form
// =====================
function BrandForm({ onSubmit, cityInputRef, role, googleUser }) {
  return (
    <form onSubmit={onSubmit}>
      <input type="hidden" name="role" value={role || 'Brand'} />
      <input type="hidden" name="googleEmail" value={googleUser?.email || ''} />
      <input type="hidden" name="googleName" value={googleUser?.name || ''} />

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Company Name *</label>
          <input className="form-control form-control-lg border rounded-3" name="company" placeholder="Your company name" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Contact Person *</label>
          <input className="form-control form-control-lg border rounded-3" name="name" placeholder="Your full name" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">Work Email *</label>
          <input className="form-control form-control-lg border rounded-3" name="email" type="email" placeholder="you@company.com" required style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Phone</label>
          <input className="form-control form-control-lg border rounded-3" name="phone" placeholder="10-digit mobile number" pattern="^[0-9]{10}$" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="row g-4 mb-4">
        <div className="col-md-6">
          <label className="form-label fw-semibold">City</label>
          <input className="form-control form-control-lg border rounded-3" name="city" placeholder="Select your city" ref={cityInputRef} style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">State *</label>
          <select className="form-select form-select-lg border rounded-3" name="state" required defaultValue="" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <option value="" disabled>Select State</option>
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
          <select className="form-select form-select-lg border rounded-3" name="vertical" required defaultValue="" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <option value="" disabled>Select Industry</option>
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
          <select className="form-select form-select-lg border rounded-3" name="budget" required defaultValue="" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}>
            <option value="" disabled>Select Budget Range</option>
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
          <input className="form-control form-control-lg border rounded-3" name="deliverables" placeholder="e.g., 2 Reels, 1 Post, Story mentions" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
        <div className="col-md-6">
          <label className="form-label fw-semibold">Preferred Platforms</label>
          <input className="form-control form-control-lg border rounded-3" name="platforms" placeholder="Instagram, YouTube, Twitter, etc." style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }} />
        </div>
      </div>

      <div className="mb-6">
        <label className="form-label fw-semibold">Campaign Brief</label>
        <textarea className="form-control form-control-lg border rounded-3" name="message" placeholder="Tell us about your brand, campaign goals, target audience, and any specific requirements..." rows="4" style={{ padding: '14px 16px', border: '1px solid #e5e7eb' }}></textarea>
      </div>

      {/* Honeypot for spam protection */}
      <input type="text" name="website" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

      <button className="btn btn-lg w-100 justify-content-center" type="submit">
        <span className="btn-text">Submit Campaign Brief</span>
        <iconify-icon icon="lucide:arrow-up-right" className="btn-icon bg-white text-dark round-52 rounded-circle hstack justify-content-center fs-7 shadow-sm"></iconify-icon>
      </button>
    </form>
  );
}
