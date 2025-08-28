export default function InfluencerCategories() {
  const categories = [
    { title: "Emerging Voices", range: "20K–50K" },
    { title: "Growth Champions", range: "50K–500K" },
    { title: "Rising Icons", range: "500K–2M" },
    { title: "Premium", range: "2M–10M" },
    { title: "Elite", range: "10M–25M" },
    { title: "Super Elite", range: "25M–50M" },
    { title: "Legendary", range: "50M+" }
  ];

  return (
    <section id="categories" className="section">
      <div className="container">
        <h2>Influencer Categories</h2>
        <p className="subline">Choose the creator tier that matches your goals and budget.</p>
        <div className="grid cols-3">
          {categories.map((c, i) => (
            <div key={i} className="card">
              <h3>{c.title}</h3>
              <p>Followers: {c.range}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}