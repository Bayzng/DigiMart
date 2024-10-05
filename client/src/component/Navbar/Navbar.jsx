import React from 'react'
import { IoMdPerson } from "react-icons/io";
import { FaBars } from "react-icons/fa"; // Import the hamburger menu icon from react-icons
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='Navbar'>
        <nav>
            <h1>DIGIMART</h1>
        </nav>
        <ul className='Navbar-ul'>
            <li ><button>Home</button></li>
            <li>Products</li>
            <li>Features</li>
            <li>Technologies</li>
            <li>Faqs</li>
        </ul>
        <div>
            <IoMdPerson size={40}/>
        </div>
        <div className='menu-icon'>
            <FaBars size={40}/>
        </div>
    </div>
  )
}

export default Navbar

















// import React, { useState } from 'react';
// import { IoMdPerson } from "react-icons/io";
// import { FaBars } from "react-icons/fa"; // Import the hamburger menu icon from react-icons
// import "./Navbar.css";

// const Navbar = () => {
//     const [menuOpen, setMenuOpen] = useState(false);

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     return (
//         <div className='Navbar'>
//             <nav className="Navbar-container">
//                 <h1>DIGIMART</h1>
//                 <div className="menu-icon" onClick={toggleMenu}>
//                     <FaBars size={30} />
//                 </div>

//                 <ul className={`Navbar-ul ${menuOpen ? 'open' : ''}`}>
//                     <li><button>Home</button></li>
//                     <li>Products</li>
//                     <li>Features</li>
//                     <li>Technologies</li>
//                     <li>Faqs</li>
//                 </ul>

//                 <div className={`icon-container ${menuOpen ? 'open' : ''}`}>
//                     <IoMdPerson size={40} />
//                 </div>
//             </nav>


//         </div>
//     );
// };

// export default Navbar;
