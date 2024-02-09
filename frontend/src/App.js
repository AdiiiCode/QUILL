import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignInPage from "./components/SIGN_IN_UP/SignInPage";
import SignUpPage from "./components/SIGN_IN_UP/Signuppage";
import Layout from "./components/MAIN_WEBSITE/Layout";
import Home from "./components/MAIN_WEBSITE/Home";
import CreateBlog from "./components/MAIN_WEBSITE/CreateBlog";
import ShowAllUsersBlogs from "./components/MAIN_WEBSITE/ShowAllUsersBlogs";
import HomePageDetails from "./components/MAIN_WEBSITE/HomePageDetails";
import UsersBlogsDetailsPage from "./components/MAIN_WEBSITE/UsersBlogsDetailsPage";
import Update from "./components/MAIN_WEBSITE/Update";
import LandingPage from "./components/MAIN_WEBSITE/LandingPage";
import Profile from "./components/MAIN_WEBSITE/Profile";
import OtpScreen from "./components/SIGN_IN_UP/otpScreen";

function App() {
  return (
    <Router>
      <div>
        <Routes>
        {/* <Route path="/" element={<Imagee/>} /> */}
        <Route path="/" element={<LandingPage/>}/>
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/Login" element={<SignInPage />} />
          <Route path="/Login/Layout" element={(<Layout />,<Home/>)}  />
          <Route path="/Home" element={<Home/>}></Route>
          <Route path="/FrontPage" element={<Home/>}></Route>
          <Route path="/Create" element={<CreateBlog/>}></Route>
          <Route path="/AllBlogs" element={<ShowAllUsersBlogs/>}></Route>
          <Route path="/HomeDetail/:id" element={<HomePageDetails/>}></Route>
          <Route path="/UserBlogDetail/:id" element={<UsersBlogsDetailsPage/>}></Route>
          <Route path="/UpdatePage/:id" element={<Update/>}></Route>
          <Route path="/UserProfile" element={<Profile/>}></Route>
          <Route path="/otpScreen" element={<OtpScreen/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
