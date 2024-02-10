import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
import { LineWave } from "react-loader-spinner";

function FrontPage() {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    let timeoutID;
    async function fetchData() {
      timeoutID = setTimeout(async () => {
        try {
          const response = await fetch("quill-iy72.vercel.app/Home");
          if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
          }
          const result = await response.json();
          if (response.ok) {
            setBlogs(result.blogs);
          } else {
            setError(result.error);
          }
        } catch (error) {
          console.error("There was a problem with the fetch operation:", error);
        }
      }, 2000);
    }
    fetchData();
    return () => {
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <Layout>
      <div className="mx-48 px-4 my-10  py-8">
        <div className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-full ">
            {error && <p className="text-red-500 mb-4">Error: {error}</p>}
            <div className="flex flex-col  gap-12">
              {blogs.length > 0 ? (
                blogs.map((blog) => (
                  <Link
                    to={`/HomeDetail/${blog._id} `}
                    className=" border-t-2 border-gray-200 py-11 px-7  hover:bg-gray-200 transition duration-500 "
                  >
                    <div
                      key={blog._id}
                      className="  rounded-lg  overflow-hidden"
                    >
                      <div className="flex px-2 py-2">
                        <img
                          src={process.env.PUBLIC_URL + "/TabImage.png"} // Replace with your blog image URL or data
                          alt={blog.title}
                          className="object-cover h-9 rounded-xl"
                        />
                        <p className="text-md  px-1 py-3 ">{blog.username}</p>
                      </div>

                      <div className="flex flex-col ">
                        {/* Image */}

                        {/* Content */}
                        <div className="flex flex-col gap-2 p-1">
                          {/* <h2 className="text-xl font-bold">{blog.title}</h2> */}
                          <p className="text-lg font-semibold">
                            {blog.snippets}
                          </p>
                          <p className="text-lg font-serif">
                            {blog.body ? (
                              <>
                                {blog.body.split(" ").slice(0, 4).join(" ")}
                                {blog.body.split(" ").length > 3 && (
                                  <span className="text-blue-500 underline cursor-pointer">
                                    {" "}
                                    Read more
                                  </span>
                                )}
                              </>
                            ) : (
                              ""
                            )}
                          </p>
                        </div>
                      </div>
                      <div className=" w-full h-96 overflow-hidden">
                        <img
                          src={
                            blog.im ? require(`../../imgs/${blog.im}`) : null
                          }
                          alt={blog.im}
                          width={"100%"}
                          height={"100%"}
                          style={{
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                          }}
                          className=" w-full h-full"
                        ></img>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="flex items-center h-screen justify-center">
                  <LineWave
                    height="250"
                    width="200"
                    color="#FFA500"
                    ariaLabel="line-wave"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                    firstLineColor=""
                    middleLineColor=""
                    lastLineColor=""
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FrontPage;
