import React from 'react';
import "../styles/navbar.css";

function Navbar({name,active,handelClick}) {


  return (
    <section>
        <button className={`btn ${active ? "active" : " " }`} onClick={handelClick}>{name}</button>
    </section>
  )
}

export default Navbar