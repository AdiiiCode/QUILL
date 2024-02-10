import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
function ShowAllUsersBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("https://quill-iy72.vercel.app//AllBlogs");
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }
        const result = await response.json();
        setBlogs(result.blogs);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    }
    fetchData();
  }, []);

  return (
    <Layout>
      <div>
        {blogs.length === 0 ? (
          <p className="text-2xl text-orange-500 mt-6">No blogs created yet.</p>
        ) : (
          blogs.map((blog, index) => (
            <div key={index} className="flex relative">
              <div className="w-2 bg-orange-500 h-20 ml-8 mt-12"></div>
              <div className="mt-12 ml-4">
                <Link to={`/UserBlogDetail/${blog._id}`}>
                  <h2 className="text-xl font-bold">{blog.title}</h2>
                  <p>{blog.snippets}</p>
                  <p className="text-blue-500 hover:underline">
                    Open the Blog to read...
                  </p>
                  <button className="absolute top-8 right-0 mt-2 mr-24 p-2 text-white rounded-full bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400">
                    <span className="flex items-center">Edit this blog</span>
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
        <br />
      </div>
    </Layout>
  );
}

export default ShowAllUsersBlogs;
