import React, { useState, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserContext from '../MAIN_WEBSITE/UserContext';

export default function SignInPage() {
  const userContext = useContext(UserContext);
  const navigate = useNavigate();
  const [username, SetUsername] = useState("");
  const [password, SetPassword] = useState("");
  const [UserLogged, SetUserLogged] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const HandleonClick = () => {
    axios
      .post("https://quill-iy72.vercel.app/login", {
        username: username,
        password: password,
      })
      .then((res) => {
        const { message, Logged } = res.data;
        if (res.status === 200) {
          console.log("Data Submitted");   
          navigate("Layout");
          userContext.SetUserLogged(Logged)
          console.log(Logged)
        }
  
        else {
          alert("Invalid credentials");
          console.log("Internal Server Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    
    <>
     <UserContext.Provider username={UserLogged}>
          </UserContext.Provider>
      <div className="flex mx-24 my-20 rounded-lg">
        <div className="flex-1 bg-orange-500 p-4">
          <img src="/Quill.png" alt="Logo" className=" w-64 mx-32 my-24"></img>
          <p className=" font-sans text-white font-bold mx-10 my-10 ">
            Empowering Your Daily Voice: Seamlessly Manage and Share Your Unique
            Stories Every Day on Our Blogging Platform.
          </p>
        </div>
        <div className="flex-1 bg-black p-4 container">
          <div className=" mx-auto w-96 my-24">

            <input
              onChange={(event) => 
              {
                SetUsername(event.target.value);
              }}
              type="text"
              placeholder="User Name"
              className=" rounded-full mb-7 h-12 px-6 py-4 border-2 text-orange-500 border-orange-500  bg-black  w-96"
            ></input>


            {/* Toggle Password Visibility is Workig Here Zaid Check This Out */}
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                className="rounded-full h-12 px-6 py-4 border-2 text-orange-500 border-orange-500 bg-black w-96"
                value={password}
                onChange={(event) => {
                  SetPassword(event.target.value);
                }}
              />
              <div
                className="absolute top-1/2 transform -translate-y-1/2 right-4 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                  {showPassword ? (
                    <span className="text-white bg-black border-black">👁️</span>
                  ) : (
                    <span className="text-white bg-black border-black">🔒</span>
                  )}
                </div>
              </div>
            </div>
            {/* Toggle Password Visibility is Workig Here Zaid Check This Out */}

            <button
              onClick={HandleonClick}
              className=" rounded-full h-12 px-6 mt-10 border-2 text-white border-none bg-orange-500   w-96"
            >
              Submit
            </button>
            {/* </Link> */}
            <hr className="m-auto mt-5 border-orange-500 w-80" />
            <p className="text-white m-auto w-64 mt-4">
              Don't have an account?{" "}
              <span className="text-orange-500">
                <Link to="/signup">
                  <button>Sign Up</button>
                </Link>
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
