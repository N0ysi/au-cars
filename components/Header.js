import React, {useEffect} from 'react';
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
        <nav>
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
        </nav>
      </div>
    </header>
  );
}
