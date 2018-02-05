import React from "react";
import "./Nav.css";

const Nav = () =>
  <nav className="navbar navbar-inverse navbar-top">
    <div className="container-fluid">
      <div className="navbar-header">
        <button type="button" className="collapsed navbar-toggle" data-target="dropdown">
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" /> <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <ul className="dropdown-menu" aria-labelledby="dLabel">
    <li>Deez Nuts</li>
    <li>Deez Nuts</li>
    <li>Deez Nuts</li>
    <li>Deez Nuts</li>
  </ul>
        <a href="/" className="navbar-brand">
          Tiny Tracker
        </a>
      </div>
    </div>
  </nav>;

export default Nav;
