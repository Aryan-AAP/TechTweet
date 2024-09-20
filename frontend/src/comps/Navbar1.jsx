import React, { useState } from 'react';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Navbar1() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className='flex sticky top-0 z-10'>
      {/* Navbar */}
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div
            role="button"
            tabIndex={0}
            className="btn btn-ghost btn-circle md:hidden"
            onClick={toggleSidebar}
          >
            asdf
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>

          {/* Dropdown Menu for Larger Screens */}
          <div className="dropdown hidden md:block">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><a>Homepage</a></li>
              <li><a>Portfolio</a></li>
              <li><a>About</a></li>
            </ul>
          </div>
        </div>

        {/* Logo */}
        <div className="navbar-center">
          <div className="btn btn-ghost text-xl"><Link to="/">TechTweet</Link></div>
        </div>

        {/* Search & Notifications */}
        <div className="navbar-end">
          <div className='btn btn-ghost btn-circle'>
            <IoChatboxEllipsesOutline />
          </div>
          <button className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="badge badge-xs badge-primary indicator-item"></span>
            </div>
          </button>
          <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li><a>Logout</a></li>
      </ul>
    </div>
        </div>
      </div>

      {/* Sidebar for Small Screens */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-base-100 shadow-lg z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out`}
      >
        <div className="p-4 flex justify-between items-center bg-gray-900 text-white">
          <h2 className="text-xl font-bold">Menu</h2>
          <button className="text-2xl" onClick={closeSidebar}>
            &times;
          </button>
        </div>
        <ul className="p-4 flex flex-col space-y-4">
          <li><a href="#home" onClick={closeSidebar}>Homepage</a></li>
          <li><a href="#portfolio" onClick={closeSidebar}>Portfolio</a></li>
          <li><a href="#about" onClick={closeSidebar}>About</a></li>
        </ul>
      </div>

      {/* Overlay when Sidebar is Open */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}
      
    </div>
  );
}

