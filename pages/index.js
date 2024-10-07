import Header from '../components/Header';
import Home from '../components/Home';
import WhatWeDo from '../components/WhatWeDo';
import NewCars from '../components/NewCars';
import AboutUs from '../components/AboutUs';
import Socials from '../components/Socials';

export default function HomePage() {
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