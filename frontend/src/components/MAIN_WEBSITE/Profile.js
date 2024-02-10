import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import { Link } from "react-router-dom";
export default function Profile() {

const [email,setEmail]= useState("")
const [username,setUsername]= useState("")
const [pass,setPass]= useState("")
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://quill-iy72.vercel.app/UserProfile');
        const data = await response.json();

        if (response.ok) {
            console.log('Fetched data:', data);
          setEmail(data.email);
          setPass(data.pass);
          setUsername(data.username)
        } else {
          console.error('Error fetching blog details');
        }
      } catch (error) {
        console.error('Internal server error');
      }
    };

    fetchData();
  }, []);

  return (
    <Layout>
      <>
        <div className="h-full px-8">
        <div className="border   w-full mb-16 h-fit mt-6  bg-white  shadow-2xl rounded-tr-xl rounded-tl-xl">
        <div
          style={{ backgroundColor: "#F5F5F5" }}
          className="text-xl font-bold h-fit px-4 py-2 mb-4 bg-slate-300  rounded-tr-xl rounded-tl-xl"
        >
          <p className="mx-4">Reference Information</p>
        </div>
        <div className="px-8 py-4">
            <div className="flex justify-between ">
              <div className="mb-4">
                <label className="text-sm text-gray-500">First Name</label>
                <p className="text-sm">{username}</p>
              </div>
              <div>
                <button className="text-blue-900 text-xs mr-6 font-bold">
                  EDIT
                </button>
              </div>
            </div>

            {/* <div className="flex justify-between">
              <div className="mb-4">
                <label className="text-sm text-gray-500">Last Name</label>
                <p className="text-sm">Adeel</p>
              </div>
              <div>
                <button className="text-blue-900 text-xs mr-6 font-bold">
                  EDIT
                </button>
              </div>
            </div> */}

            <hr className="mb-2"></hr>

            <div className="mb-4">
              <label className="text-sm text-gray-500">Username</label>
              <p className="text-sm">{username}</p>
            </div>

            <div className="flex justify-between">
              <div className="mb-4">
                <label className="text-sm text-gray-500">
                  Contact and Recovery Email
                </label>
                <p className="text-sm">{email}</p>
              </div>
              <div>
                <button className="text-blue-900 text-xs mr-6 font-bold">
                  CHANGE
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-4">
                <label className="text-sm text-gray-500">
                  Recovery Mobile Phone Number
                </label>
                <p className="text-sm">xxxxx</p>
              </div>
              <div>
                <button className="text-blue-900 text-xs mr-6 font-bold">
                  ADD
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="mb-4">
                <label className="text-sm text-gray-500">Password</label>
                <p className="text-sm">{pass}</p>
              </div>
              <div>
                <button className="text-blue-900 text-xs mr-6 font-bold">
                  RESET
                </button>
              </div>
            </div>
            <Link to={"/"}>
            <div className="flex justify-end mt-4">
          <button type="button"
              className="px-6 py-2 h-10 bg-orange-500 text-white rounded-full md:ml-0 md:mt-0" >
            LogOut
          </button>
          </div>
          </Link>
          </div>  
          </div>
        </div>
      </>
      </Layout>
  );
}
