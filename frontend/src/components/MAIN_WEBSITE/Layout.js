// import react from "react";
// import { NavLink, Link, BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Sidebar from "./Sidebar";
// import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-5">
      <div className="col-span-5 mb-16">
        <NavBar />
      </div>

      <div className="col-span-1 hidden h-full md:block">
        <Sidebar />
      </div>
      <div className="col-span-4 h-fit ">{children}</div>
      {/* <div className="col-span-5 z-50" ><Footer/></div> */}
    </div>
  );
}
