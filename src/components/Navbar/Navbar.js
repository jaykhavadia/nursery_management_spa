import React, { useState } from "react";
import "./Navbar.css";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className='sticky-component navbar navbar-expand-lg bg-white navbar-light sticky top-0 z-10 p-0'>
      <a
        href='/home'
        className='navbar-brand d-flex align-items-center px-4 px-lg-5'
      >
        <h1 className='m-0'>Gardener</h1>
      </a>
      <button
        type='button'
        className='navbar-toggler me-4'
        data-bs-toggle='collapse'
        // data-bs-target='#navbarCollapse'
        onClick={toggleDropdown}
      >
        <span className='navbar-toggler-icon'></span>
      </button>
      <div
        className={`navbar-collapse ${isOpen ? "block" : "hidden"}`}
        id='navbarCollapse'
      >
        <div className='navbar-nav ms-auto p-4 p-lg-0'>
          <a href='/home' className='nav-item nav-link active'>
            Home
          </a>
          <a href='/about' className='nav-item nav-link'>
            About
          </a>
          <a href='/login' className='nav-item nav-link'>
            Services
          </a>
          <a href='/projects' className='nav-item nav-link'>
            Projects
          </a>
          {/* <div className='nav-item dropdown'>
            <a
              href='#'
              className='nav-link dropdown-toggle'
              data-bs-toggle='dropdown'
            >
              Pages
            </a>
            <div className='dropdown-menu bg-light m-0'>
              <a href='/feature' className='dropdown-item'>
                Features
              </a>
              <a href='/quote' className='dropdown-item'>
                Free Quote
              </a>
              <a href='/team' className='dropdown-item'>
                Our Team
              </a>
              <a href='/testimonial' className='dropdown-item'>
                Testimonial
              </a>
              <a href='/404' className='dropdown-item'>
                404 Page
              </a>
            </div>
          </div> */}
          <a href='/contact' className='nav-item nav-link'>
            Contact
          </a>
        </div>
        <a
          href=''
          className='btn btn-primary py-4 px-lg-4 rounded-0 d-none d-lg-block'
        >
          Get A Quote<i className='fa fa-arrow-right ms-3'></i>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
