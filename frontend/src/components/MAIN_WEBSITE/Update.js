import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Layout from './Layout';
import { TailSpin } from "react-loader-spinner";
import { useParams } from "react-router-dom";

export default function Update() {
  const navigate = useNavigate();
  const {id} = useParams()
  const [title, setTitle] = useState("");
  const [snippets, setSnippets] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
      axios
      .post(`http://localhost:5000/Update${id}`, {
        title: title,
        snippets: snippets,
        body: body,
      })
      
      .then((res) => {
        // setLoading(false);
        if (res.status === 200) {
          navigate("/FrontPage");
          console.log("Saved");
        }
      })
      .catch((error) => {
        // setLoading(false);
        console.error(error);
      });
  };

  return (
    <Layout>
      <div className="">
        {loading ? (
          <div class="min-h-screen flex items-center justify-center">
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
          <div className="mx-96 mt-20">
            <input
              type='text'
              placeholder='Enter The Title Of Blog'
              onChange={(event) => {
                setTitle(event.target.value);
              }}
              className="w-80 rounded h-8 pl-4 ml-16"
            />
            <br />
            <br />
            <input
              type='text'
              placeholder='Enter The Snippets Of Blog'
              onChange={(event) => {
                setSnippets(event.target.value);
              }}
              className="w-80 rounded h-8 pl-4 ml-16"
            />
            <br />
            <br />
            <textarea
              placeholder='enter the blog Content'
              onChange={(event) => {
                setBody(event.target.value);
              }}
              className="w-80 rounded h-40 pl-4 ml-16 border-orange-500"
            ></textarea>
            <br />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-12 rounded mt-4 ml-32"
              onClick={handleClick}
            >
              Post a Blog
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
