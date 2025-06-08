import React from 'react';
import Hero from '../components/home/Hero';
import ServicesSection from '../components/home/ServicesSection';
import NewsSection from '../components/home/NewsSection';
import InfoWidgets from '../components/home/InfoWidgets';
import PromotionBanner from '../components/home/PromotionBanner';
import GovernmentSection from '../components/home/GovernmentSection';
import DataSection from '../components/home/DataSection';

const Home: React.FC = () => {
  return (
    <main className="flex-grow">
      <Hero />
      <ServicesSection />
      <NewsSection />
      <InfoWidgets />
      <DataSection />
      <PromotionBanner />
      <GovernmentSection />
    </main>
  );
};

export default Home;