import React from "react";
import './Navbar.css';

function Navbar () {

  return (
      <section className="navbar">
        <a href="/" className="navbar-item">Strona główna</a>
        <a href="/about" className="navbar-item">Kategorie</a>
        <a href="/portfolio" className="navbar-item">O nas</a>
        <a href="/shop" className="navbar-item">Kontakt</a>
      </section>
  )

}

export default Navbar;