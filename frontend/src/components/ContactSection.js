import { useEffect, useRef, useState } from 'react';

export default function ContactSection() {
  const [status, setStatus] = useState(null);
  const [googleUser, setGoogleUser] = useState(null);
  const cityInputRef = useRef(null);
  const googleBtnRef = useRef(null);

  // Load Google Maps Places Autocomplete
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

  // Google Sign-In (GIS) button rendering + prefill
  useEffect(() => {
    const interval = setInterval(() => {
      if (window.google && window.google.accounts && googleBtnRef.current) {
        window.google.accounts.id.initialize({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: (response) => {
            try {
              const payload = JSON.parse(atob(response.credential.split('.')[1]));
              setGoogleUser({ name: payload.name, email: payload.email });
              // Prefill fields
              const nameField = document.querySelector('input[name="name"]');
              const emailField = document.querySelector('input[name="email"]');
              if (nameField && payload.name) nameField.value = payload.name;
              if (emailField && payload.email) emailField.value = payload.email;
            } catch (e) {
              console.warn('Failed to parse Google credential');
            }
          }
        });
        window.google.accounts.id.renderButton(googleBtnRef.current, { theme: 'outline', size: 'large' });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    try {
      await new Promise((resolve, reject) => {
        if (!window.grecaptcha) return resolve();
        window.grecaptcha.ready(() => {
          window.grecaptcha.execute(process.env.REACT_APP_RECAPTCHA_SITE_KEY, { action: 'submit' })
            .then(token => {
              const hidden = document.createElement('input');
              hidden.type = 'hidden';
              hidden.name = 'g-recaptcha-response';
              hidden.value = token;
              form.appendChild(hidden);
              resolve();
            }).catch(reject);
        });
      });

      const res = await fetch(process.env.REACT_APP_FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="section" style={{background:'#f9fafb'}}>
      <div className="container">
        <h2>Contact Us</h2>
        <p className="subline">Tell us about your campaign. We’ll reach out shortly.</p>

        <div style={{display:'flex', justifyContent:'center', marginBottom:16}}>
          <div ref={googleBtnRef}></div>
        </div>
        {googleUser && <p style={{textAlign:'center'}}>Signed in as <b>{googleUser.name}</b> ({googleUser.email})</p>}

        <form className="form" onSubmit={handleSubmit}>
          <div className="row">
            <input className="input" name="name" placeholder="Your Name" required />
            <input className="input" name="email" type="email" placeholder="Your Email" required />
          </div>
          <div className="row">
            <input className="input" name="company" placeholder="Company" />
            <input className="input" name="phone" placeholder="Phone (10 digits)" pattern="^[0-9]{10}$" />
          </div>
          <div className="row">
            <input className="input" name="city" placeholder="City" ref={cityInputRef} />
            <select className="select" name="state" required defaultValue="">
              <option value="" disabled>Select State</option>
              <option>Tamil Nadu</option><option>Kerala</option><option>Karnataka</option>
              <option>Andhra Pradesh</option><option>Telangana</option><option>Maharashtra</option>
              <option>Delhi</option><option>Gujarat</option><option>West Bengal</option><option>Other</option>
            </select>
          </div>
          <div className="row">
            <select className="select" name="vertical" required defaultValue="">
              <option value="" disabled>Select Vertical</option>
              <option>Food</option><option>Travel</option><option>Beauty</option><option>Technology</option><option>Fashion</option>
            </select>
            <select className="select" name="budget" required defaultValue="">
              <option value="" disabled>Select Budget</option>
              <option>₹10,000 – ₹50,000</option>
              <option>₹50,000 – ₹2,00,000</option>
              <option>₹2,00,000 – ₹5,00,000</option>
              <option>₹5,00,000 – ₹15,00,000</option>
              <option>₹15,00,000 – ₹25,00,000</option>
              <option>₹25,00,000+</option>
            </select>
          </div>
          <div className="row">
            <input className="input" name="deliverables" placeholder="Deliverables (e.g., 2 Reels, 1 Post)" />
            <input className="input" name="platforms" placeholder="Platforms (Instagram, YouTube, etc.)" />
          </div>
          <textarea className="textarea" name="message" placeholder="Message" rows="5"></textarea>

          {/* Honeypot */}
          <input type="text" name="website" style={{display:'none'}} tabIndex="-1" autoComplete="off" />

          <button className="btn btn-primary" type="submit" style={{marginTop:12}}>Submit</button>

          {status === 'success' && <div className="alert success">✅ Thanks! We’ll get back to you soon.</div>}
          {status === 'error' && <div className="alert error">❌ Something went wrong. Please try again.</div>}
        </form>
      </div>
    </section>
  );
}