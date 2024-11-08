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

        <div className='navigation'>
          <Link href="/" className="logo">
            <img src="/img/logo.svg" alt="logo" />
          </Link>

          <nav>
            <a href="#section-Home">Home</a>
            <a href="#section-WhatWeDo">What we do</a>
            <a href="#section-NewCars">New interesting cars</a>
            <a href="#section-AboutUs">About us</a>
            <a href="#section-Social">Socials</a>
          </nav>

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
        </div>
      </div>
    </header>
  );
}
