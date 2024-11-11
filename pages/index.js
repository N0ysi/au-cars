import Header from '../components/Header';
import Home from '../components/Home';
import WhatWeDo from '../components/WhatWeDo';
import NewCars from '../components/NewCars';
import AboutUs from '../components/AboutUs';
import Socials from '../components/Socials';
import { useEffect } from 'react';

export default function HomePage() {
  useEffect(() => {
    document.documentElement.style.height = 'auto';
  }, [])
  return (
      <div>
        <Header />
        <Home />
        <WhatWeDo />
        <NewCars />
        <AboutUs />
        <Socials />
      </div>
  );
}