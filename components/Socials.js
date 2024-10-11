import React from 'react';

export default function Socials() {
  return (
    <section id="section-Social">
      <footer>
        <div className="information">
          <p>Author: Iliupov Rustam</p>
          <hr />
          <p>
            Working hours:
            <time> Mo-Fr: 9:00 - 18:00</time>
          </p>
          <hr />
          <p>
            Our social media:
          </p>
          <ul className="icons">
            <li><a href="#" onClick={() => window.open('https://www.instagram.com/')}><i>In</i></a></li>
            <li><a href="#" onClick={() => window.open('https://www.facebook.com/')}><i>Fc</i></a></li>
          </ul>
        </div>
      </footer>
    </section>
  );
}