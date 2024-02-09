import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <div>
        <NavBar showOnly={true} />
        <div className="container mx-auto ">
          <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between">
            <div className="lg:w-1/2 lg:mr-8 mb-8 lg:mb-0 pl-4 lg:pl-32">
              <h1 className="text-4xl lg:text-5xl font-serif mb-6 lg:mb-8">
                Tell Your <br />
                Story to <br />
                the World
              </h1>
              <p className="text-base lg:text-lg">
                Join us! Login or Register. Write your story and share!
              </p>
            </div>
            <div className="lg:w-1/2 mx-auto mb-8 lg:mb-0">
              <img src="page.jpg" alt="Blog Image" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-4 ">
        <a
          href="https://github.com/AdiiCode7/Quill-Quotient-Blogs-Website/tree/dev"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700 transition duration-300"
        >
          <svg
            className="w-5 h-5 inline-block mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.419 2.865 8.17 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.865-.014-1.698-2.782.604-3.37-1.34-3.37-1.34-.455-1.156-1.112-1.464-1.112-1.464-.908-.619.068-.606.068-.606 1.004.07 1.531 1.03 1.531 1.03.892 1.53 2.34 1.088 2.911.832.091-.648.349-1.087.635-1.337-2.22-.25-4.555-1.11-4.555-4.943 0-1.09.39-1.984 1.031-2.68-.103-.25-.447-1.268.098-2.642 0 0 .84-.268 2.75 1.022.798-.222 1.65-.333 2.5-.336.848.003 1.702.114 2.5.336 1.91-1.29 2.75-1.022 2.75-1.022.546 1.374.202 2.392.1 2.642.642.696 1.03 1.59 1.03 2.68 0 3.842-2.338 4.688-4.567 4.932.358.308.678.916.678 1.848 0 1.334-.012 2.411-.012 2.739 0 .268.18.581.688.481C19.137 20.168 22 16.419 22 12c0-5.523-4.477-10-10-10z"
            />
          </svg>
          View Source Code on Github
        </a>
        
      </div>
      <Footer />
    </div>
  );
}
