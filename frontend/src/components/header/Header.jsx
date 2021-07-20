import React from "react";
import Navbar from "./navbar/Navbar.jsx";

function Header() {
  return (
    <section className="header">
      <section className="header-top">
        <section className="header-top_logo">
          {" "}
          <a href="/" className="header-logo">
            LOGO
          </a>
        </section>
        <section className="header-top_navbar"> {<Navbar />}</section>
      </section>
      <section className="header-bottom">
        <section className="header-bottom_phone">999999999</section>
        <section className="header-bottom_email">sth-example@info.com</section>
      </section>
    </section>
  );
}

export default Header;
