import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function OtpScreen() {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const handleSubmit = () => {
    axios
      .post("/otpScreen", {
        otp: otp,
      })
      .then((res) => {
        if (res.status === 200) {
          console.log("Data Submitted");
          navigate("/Login");
        } else {
          alert("Invalid OTP");
          console.log("Invalid OTP or Error");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    // try {

    //   console.log("OTP verification successful:", response.data);
    //   navigate("/Login")
    // } catch (error) {
    //   console.error("Error verifying OTP:", error);
    // }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="max-w-[400px] w-full mx-auto relative bg-white p-8 rounded-lg">
          <form>
            <div className="w-24 h-24 bg-orange-500 drop-shadow-xl rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="square"
                  strokeLinejoin="inherit"
                  strokeWidth="4"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-xl tracking-wide mt-8 mb-3 font-semibold text-gray-500">
              You have successfully registered
            </h2>
            <p className="text-xs text-gray-500">
              Please check confirmation email sent to your email
            </p>
            <div className="mb-4 mt-4">
              <input
              className= "ml-4 border-b-2 w-full mr-32 focus:outline-none  focus:border-b-orange-500 pl-4"
                type="text"
                placeholder="Enter The OTP"
                onChange={(e) => {
                  setOtp(e.target.value);
                }}
              ></input>
            </div>
            <div className="mb-6">
              <p className="text-center text-sm mt-6 relative text-gray-500">
                Didn't get an email? click{" "}
                <button className="relative text-orange-500">Here</button>{" "}
                resend
              </p>
            </div>
            <div className="flex justify-center">
              <button
                onClick={handleSubmit}
                className=" rounded-full h-10 px-6 mt-10 border-2 text-white border-none bg-orange-500  w-56"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default OtpScreen;
