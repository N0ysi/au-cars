import React from 'react';

export default function Socials() {
  return (
    <section id="section-Social">
      <footer>
        <div className="information">
          <p>Author: <b>Iliupov Rustam</b> </p>
          <p>
            Working hours:
            <time> Mo-Fr: 9:00 - 18:00</time> 
          </p>
          <div className='socials'>
          <p>
            Our social media:
          </p>
          <button className='social_btn'><a href="#" onClick={() => window.open('https://www.instagram.com/')}>In</a></button>
          <button className='social_btn'><a href="#" onClick={() => window.open('https://www.facebook.com/')}>Fc</a></button>
          </div>
        </div>
      </footer>
    </section>
  );
}