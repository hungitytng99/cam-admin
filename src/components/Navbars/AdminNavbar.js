import React from "react";

import jsCookie from "js-cookie";

export default function Navbar() {
  const handleLogout = () => {
    jsCookie.remove('token');
    window.location.href = '/auth/login';
  }
  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center p-4">
        <div className="w-full mx-autp items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
          <a
            className="text-white text-sm uppercase hidden md:block lg:inline-block font-semibold hover:text-white"
            href="/"
          >
            BẢNG ADMIN
          </a>
          {/* Form */}
          {/* User */}
          <ul className="flex-col md:flex-row list-none items-center hidden md:flex">
              <button onClick={handleLogout} className="bg-gray-500 text-white px-4 py-1 rounded-md focus:outline-none"> Logout</button>
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
