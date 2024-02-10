import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "./Layout";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import Example from '../SIGN_IN_UP/Loading';

const HomePageDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [comment, SetComment] = useState();
  const [fetchh, fetchComment] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`quill-iy72.vercel.app/HomeDetail/${id}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched data:", data);
          setBlog(data.blogs);
          fetchComment(data.comment);
        } else {
          console.error("Error fetching blog details");
        }
      } catch (error) {
        console.error("Internal server error");
      }
    };

    fetchData();
  }, [id]);
  // const comments = [
  //   { text: 'Great blog post!', author: 'User1' },
  //   { text: 'I enjoyed reading this.', author: 'User2' },
  //   // Add more comments as needed
  // ];
  const commentPosted = () => {
    axios
      .post("/HomeDetails", {
        comment: comment,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("saved");
        } else {
          console.log("not Saved");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
      <Layout>
      <div className="">
      <div className="py-16" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/bg.jpg)`, backgroundSize: 'cover', width: '100%', height: '400px' }}>
        <div className=" shadow-lg  bg-white sm:mx-6 md:mx-72 my-16  border-1  " >
          <div className=" p-8">
            {blog ? (
              <div className="flex">
                <div className="flex flex-col">
                  <h2 className="text-3xl font-serif font-bold mb-2">
                    {blog.title}
                  </h2>
                  <div className="flex justify-end ">
                  <p className="text-gray-600">Posted By: {blog.username}</p>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">
                    {blog.snippets}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {blog.body}
                  </p>
                 
                </div>
                {/* Uncomment the button code for deletion if needed */}
                {/* <button onClick={handleDelete} className="absolute top-0 right-0 mt-2 mr-2 p-2 text-white rounded-full bg-red-500"></button> */}
              </div>
            ) : (
              <div className="flex justify-center items-center h-64">
                <p className="text-4xl text-orange-500">Loading...</p>
                {/* Add your loader or content for loading state here */}
              </div>
            )}
          </div>

          <div className="mt-8 mx-8">
            <h2 className="text-2xl font-bold mb-4 mx-4">Comments</h2>
            {fetchh.length > 0 ? (
              <div>
                {fetchh.map((geting, index) => (
                  <div key={index} className=" rounded-lg p-4 mx-2 mb-4">
                    <p className="text-black font-bold flex">
                      <span>
                        {" "}
                        <img
                          src={process.env.PUBLIC_URL + "/TabImage.png"}
                          className="w-6 h-6 rounded-full"
                          alt=""
                        ></img>{" "}
                      </span>
                      <span className="ml-2">{geting.username}</span>
                    </p>
                    <p className="text-gray-800 mt-2">{geting.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">No comments yet.</p>
            )}
            {/* Add a form for users to submit new comments */}
            <div className="pr-24">
              <form className="mt-4 ">
                <input
                  type="text"
                  className="ml-4 border-b-2 w-full mr-32 focus:outline-none  focus:border-b-blue-300"
                  placeholder="Add your comment..."
                  onChange={(e) => {
                    SetComment(e.target.value);
                  }}
                ></input>
                <br></br>

                <button
                  type="submit"
                  className="mt-4 ml-4 mb-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                  onClick={commentPosted}
                >
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-16 h-16"></div>
        </div>
        </div>
      </Layout>
  );
};

export default HomePageDetails;
