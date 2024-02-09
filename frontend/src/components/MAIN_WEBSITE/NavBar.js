import React, { useState } from "react";
import { Link } from "react-router-dom";

const NavBar = ({ showOnly }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between fixed top-0 left-0  right-0 z-50    bg-orange-500 text-white p-4">
      {/* Left side: Logo */}
      <div className="logo w-40">
        <img
          src={process.env.PUBLIC_URL + "/Quill.png"}
          alt="Logo"
          className="max-w-16"
        />
      </div>
      {!showOnly ? (
        <>
          <div className="hidden md:flex md:flex-row md:gap-8 md:text-lg mt-4 md:mt-0 md:ml-4 md:mr-4">
            {/* <Link to="/Home" className="text-black hover:text-orange-200">
              Home
            </Link>
            <Link to="/Create" className="text-black hover:text-gray-300">
              Create New Blogs
            </Link>
            <Link to="/AllBlogs" className="text-black hover:text-gray-300">
              All Blogs
            </Link>
            <Link to="/UserProfile" className="text-black hover:text-gray-300">
              Profile
            </Link> */}
          </div>
          <div className="hidden md:flex md:mt-0 md:gap-4">
            <input
              type="text"
              placeholder="Search"
              className="px-4 bg-orange-500 border-2 h-10 placeholder-black border-black text-black rounded-full"
            />
            <button
              type="button"
              className="px-6 py-2 h-10 bg-black text-white rounded-full md:ml-0 md:mt-0"
            >
              Search
            </button>
          </div>
          <div
            className="absolute top-4 right-2 md:hidden"
            onClick={handleMenu}
          >
            <button className="flex flex-col justify-center items-center w-8 h-8 focus:outline-none">
              <img
                src={process.env.PUBLIC_URL + "/burger-bar.png"}
                className="h-12 w-12"
                alt=""
              ></img>
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center mx-4 ">
          <Link to="/" className="text-xl text-black hover:text-gray-300 mr-3">
            Home
          </Link>
          <span className="text-black">|</span>
          <Link
            to="/Login"
            className="text-xl text-black hover:text-gray-300 ml-3"
          >
            Login
          </Link>
        </div>
      )}
      {menuOpen && (
        <div className="absolute top-12 right-2 z-10 w-40 bg-orange-500 text-black rounded">
          <div>
            <Link
              to="/Home"
              className="block p-2 hover:bg-gray-200 hover:rounded"
            >
              Home
            </Link>
          </div>
          <Link
            to="/Create"
            className="block p-2 hover:bg-gray-200 hover:rounded"
          >
            Create New Blogs
          </Link>
          <Link
            to="/AllBlogs"
            className="block p-2 hover:bg-gray-200 hover:rounded"
          >
            All Blogs
          </Link>
          <Link
            to="/UserProfile"
            className="block p-2 hover:bg-gray-200 hover:rounded"
          >
            Profile
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavBar;
