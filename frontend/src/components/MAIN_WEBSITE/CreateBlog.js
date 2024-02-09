import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { TailSpin } from "react-loader-spinner";

export default function CreateBlog() {
  const navigate = useNavigate();
  const [image, setImg] = useState();
  const [allimage, setAllImg] = useState();
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getImg();
  }, []);

  const getImg = async () => {
    try {
      const result = await axios.get("http://localhost:5000/get-image");
      setAllImg(result.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const onInputChange = (e) => {
    setImg(e.target.files[0]);
  };

  const handlePostBlog = async () => {
    try {
      setLoading(true);

      // Upload image
      const formData = new FormData();
      formData.append("image", image);
      await axios.post("http://localhost:5000/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // Create blog post
      const res = await axios.post("http://localhost:5000/Create", {
        title: title,
        snippets: snippets,
        body: body,
      });

      if (res.status === 200) {
        navigate("/FrontPage");
        console.log("Saved");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="py-10 bg-gray-100  min-h-screen flex flex-col items-center justify-center">
        {loading ? (
          <div className="flex items-center justify-center">
            <TailSpin
              height={80}
              width={80}
              color="#4fa94d"
              ariaLabel="tail-spin-loading"
              radius={1}
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        ) : (
          <div className="flex flex-col bg-white">
            <div className="py-20 px-9 text-orange-400 flex flex-col items-center shadow-b first-letter:-md shadow-black rounded-t-lg justify-center border-2 border-black border-b-0">
              <div className="logo w-96">
                <img
                  src={process.env.PUBLIC_URL + "/Create_blog.jpg"}
                  alt="Creative"
                  className="max-w-16"
                />
              </div>
              <h1 className="text-2xl uppercase font-semibold mb-6 text-center">
                shape your thoghts right now
              </h1>
              <h1 className="text-2xl uppercase font-semibold mb-6 text-center">
                tell the world what you think
              </h1>
            </div>
            <div className="border-2 border-orange-400 border-t-0 rounded-b-lg shadow-md p-8 max-w-lg">
              <h1 className="text-3xl font-semibold mb-6 text-center">
                Create a Blog
              </h1>
              <input
                type="text"
                placeholder="Enter The Title Of Blog"
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                className="w-full h-10 px-4 bg-white mb-4 border-b-2 border-orange-400 text-black placeholder:text-black focus:outline-none"
              />
              <input
                type="text"
                placeholder="Enter The Snippets Of Blog"
                onChange={(event) => {
                  setSnippets(event.target.value);
                }}
                className="w-full h-10 px-4 bg-white mb-12 border-b-2 border-orange-400 text-black placeholder:text-black focus:outline-none"
              />
              <textarea
                placeholder="Enter the blog Content"
                onChange={(event) => {
                  setBody(event.target.value);
                }}
                className="w-full rounded h-48 pt-2 px-4 bg-white mb-4 border-2 border-orange-400 text-black placeholder:text-black focus:outline-none"
              ></textarea>
              <div className="flex items-center justify-between">
                <div>
                  <label className="font-semibold uppercase">
                    Upload Blog image
                  </label>
                </div>
                {/* <input className="w-60" type="file" onChange={onInputChange} /> */}
                <div className="flex items-center">
                  <div>
                    {/* Custom styled file input */}
                    <label
                      htmlFor="fileInput"
                      className="bg-orange hover:bg-blue-700 text-white font-bold rounded cursor-pointer"
                    >
                      <img className="h-7" src="upload.png"></img>
                    </label>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    className="hidden"
                    onChange={onInputChange}
                    accept=".jpg, .jpeg, .png"
                  />

                  {/* Display selected file name */}
                  <div className="mb-4">
                    <p id="fileNameDisplay" className="mt-4">
                      No file selected
                    </p>
                  </div>
                </div>
              </div>
              <button
                className="w-full mt-4 bg-orange-500 hover:bg-black hover:rounded-full text-white font-bold py-2 rounded"
                onClick={handlePostBlog}
              >
                Post a Blog
              </button>
            </div>
            {/* text of page */}
          </div>
        )}
      </div>
    </Layout>
  );
}
