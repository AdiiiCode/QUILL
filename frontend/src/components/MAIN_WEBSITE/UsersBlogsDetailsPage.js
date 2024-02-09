
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import Example from "../SIGN_IN_UP/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// import { useNavigate } from "react-router-dom";

const UsersBlogsDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const Navigate = useNavigate();
  const [updatedData, setUpdatedData] = useState({
    title: "",
    snippets: "",
    body: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/UserBlogDetail/${id}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched data:", data);
          setBlog(data.blogs);
          setUpdatedData({
            title: data.blogs,
            snippets: data.blogs.snippets,
            body: data.blogs.body,
          });
        } else {
          console.error("Error fetching blog details");
        }
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchData();
  }, [id]);
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/UserBlogDetail/${id}`);
      // setBlogs(blogs.filter(blog => blog._id !== deleteId));
      Navigate("/AllBlogs");
      console.log(response.data.message);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  const handleUpdate = async () => {
    try {
      const response = await axios.put(`/UserBlogDetail/${id}`, updatedData);
      console.log("Updated item:", response.data);
      Navigate("/AllBlogs");
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData({ ...updatedData, [name]: value });
  };

  const handleUpdt= async () => {
    try {
      const response = await axios.get(`http://localhost:5000/UpdatePage/${id}`); 
      console.log(response.data.message);
    } catch (error) {
      console.error('Error Opening item:', error);
    }
  };

  return (
    <Layout>
    <div className="bg-gray-100 rounded-lg shadow-md p-8">
  {blog ? (
    <div className="flex relative border-2 border-gray-200 rounded-lg p-6">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-2">{blog.title}</h2>
        <h3 className="text-xl font-semibold mb-4">{blog.snippets}</h3>
        <p className="text-gray-700 mb-6 leading-relaxed">{blog.body}</p>
        <p className="text-gray-600">Posted By: {blog.username}</p>
      </div>
      {/* Uncomment the button code for deletion if needed */}
      <button onClick={handleDelete} className="absolute top-0 right-0 mt-2 mr-2 p-2 text-white rounded-full bg-red-500">
        🗑️
      </button>
    </div>
  ) : (
    <div className="flex justify-center items-center h-64">
      <p className="text-4xl text-orange-500">Loading...</p>
      {/* Add your loader or content for loading state here */}
    </div>
  )}
</div>

    </Layout>
  );
};

export default UsersBlogsDetailsPage;
