export default function PackagesSection() {
  const packages = [
    { icon: '🌱', title: 'Starter', price: '₹10,000 – ₹50,000', description: 'Perfect for new brands to build awareness with nano creators.', featured: false },
    { icon: '🚀', title: 'Growth', price: '₹50,000 – ₹2,00,000', description: 'Scale reach with micro & mid‑tier influencers.', featured: true },
    { icon: '⭐', title: 'Premium', price: '₹2,00,000 – ₹5,00,000', description: 'High‑impact campaigns for established brands.', featured: false },
    { icon: '👑', title: 'Elite', price: '₹5,00,000 – ₹15,00,000', description: 'Elite creators for premium market presence.', featured: false },
    { icon: '💎', title: 'Super Elite', price: '₹15,00,000 – ₹25,00,000', description: 'Super‑elite creators for maximum visibility.', featured: false },
    { icon: '🏆', title: 'Legendary', price: '₹25,00,000+', description: 'Ultra‑exclusive campaigns with legendary influencers.', featured: false }
  ];

  return (
    <section id="packages" className="section" style={{background:'#f9fafb'}}>
      <div className="container">
        <h2>Our Packages</h2>
        <p className="subline">Find the perfect package for your brand’s objectives.</p>
        <div className="grid cols-3">
          {packages.map((p, i) => (
            <div key={i} className={`card ${p.featured ? 'featured' : ''}`}>
              <div style={{fontSize:24}}>{p.icon}</div>
              <h3>{p.title}</h3>
              <div className="price">{p.price}</div>
              <p>{p.description}</p>
              <a href="#contact" className="btn btn-outline" style={{display:'inline-block', marginTop:8}}>Choose {p.title}</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}