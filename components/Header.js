import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Header() {
  const { user, logout } = useAuth();

  useEffect(() => {
    document.documentElement.style.height = 'auto';
  })

  return (
    <header>
      <div className="container">
        <div className='head'>
          <div className='navigation'>
            <Link href="/" className="logo">
              <img src="/img/logo.svg" alt="logo" />
            </Link>


            <ul>
              <li><a href="#section-Home">Home</a></li>
              <li><a href="#section-WhatWeDo">What we do</a></li>
              <li><a href="#section-NewCars">New interesting cars</a></li>
              <li><a href="#section-AboutUs">About us</a></li>
              <li><a href="#section-Social">Socials</a></li>
            </ul>

          </div>
          <div className='header-buttons'>
            {!user ? (
              <Link href="/login">
                <button className="btn">Login</button>
              </Link>
            ) : (
              <div className="profile">
                <Link href="/profile">
                  <button className="btn">{user.username}</button>
                </Link>
                <button className="btn" onClick={logout}>Logout</button>
              </div>
            )}
            <button className="btn">Talk to an Expert</button>
          </div>
          <div className="hamburgerDiv">
            <label className="hamburger-menu">
              <input type="checkbox" />
            </label>
            <aside className="sidebar">
              <nav>
                <a href="#section-Home">Home</a>
                <a href="#section-What we do">What we do</a>
                <a href="#section-New interesting cars">New interesting cars</a>
                <a href="#section-About us">About us</a>
                <a href="#section-Social">Socials</a>
              </nav>
            </aside>
          </div>
        </div>
      </div>
    </header>
  );
}
