// Sidebar.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // If using React Router
import { HiHome, HiUser, HiDocumentText } from "react-icons/hi"; // Import icons as needed
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchhttps://quill-iy72.vercel.app/Sidebar");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        if (response.ok) {
          setUser(result.callusername);
          console.log(result.callusername);
        } else {
          // setError(result.error);
        }
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="bg-gray-900  fixed px-14 text-white h-screen ">
      <div className="p-4 text-center">
        <h1 className="text-3xl font-mono">Heyyy {user} </h1>
        <p className="mt-2">Welcome to our blog!</p>
      </div>
      {/* Sidebar navigation */}
      <nav className="mt-8">
        <Link
          to="/Home"
          className="flex items-center px-6 py-3 hover:bg-gray-800"
        >
          <HiHome className="w-6 h-6 mr-2" />
          Home
        </Link>
        <Link
          to="/Create"
          className="flex items-center px-6 py-3 hover:bg-gray-800"
        >
          <HiDocumentText className="w-6 h-6 mr-2" />
          Create New Blogs
        </Link>
        <Link
          to="/AllBlogs"
          className="flex items-center px-6 py-3 hover:bg-gray-800"
        >
          <MdDashboard className="w-6 h-6 mr-2" />
          All Blogs
        </Link>
        <Link
          to="/UserProfile"
          className="flex items-center px-6 py-3 hover:bg-gray-800"
        >
          <HiUser className="w-6 h-6 mr-2" />
          Profile
        </Link>
      </nav>
      {/* Sidebar footer */}
    </div>
  );
};

export default Sidebar;
