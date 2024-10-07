import React from 'react';
import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container">
        <nav>
          <a href="#" className="logo">
            <img src="/img/logo.svg" alt="logo" />
          </a>
          <ul>
            <li><a href="#section-Home">Home</a></li>
            <li><a href="#section-WhatWeDo">What we do</a></li>
            <li><a href="#section-NewCars">New interesting cars</a></li>
            <li><a href="#section-AboutUs">About us</a></li>
            <li><a href="#section-Social">Socials</a></li>
          </ul>
          <Link href="/login">
            <button className="btn">Login</button>
          </Link>
          <button className="btn_talk">Talk to an Expert</button>
        </nav>
      </div>
    </header>
  );
}
