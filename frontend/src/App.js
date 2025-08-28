import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InfluencerCategories from './components/InfluencerCategories';
import PackagesSection from './components/PackagesSection';
import ContactSection from './components/ContactSection';

export default function App() {
  return (
    <div>
      <Navbar />
      <Hero />
      <InfluencerCategories />
      <PackagesSection />
      <ContactSection />
    </div>
  );
}