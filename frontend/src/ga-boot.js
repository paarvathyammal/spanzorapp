// src/ga-boot.js
export function initGA(id = 'G-VYMWSN2S5W') {
  if (typeof window === 'undefined') return;
  if (window.gtag) return; // already initialized

  // define dataLayer and gtag shim immediately
  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', id, { debug_mode: location.hostname === 'localhost' });

  // load GA4 library
  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);
}
