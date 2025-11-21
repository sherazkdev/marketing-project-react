import { useState } from "react";
import "./App.css";

import { Routes,Route } from "react-router-dom";

/** Layouts */
import Client from "./layout/Client/Client.jsx";
import Admin from "./layout/Admin/Admin.jsx";

/** Pages */
import SingleAdd from "./pages/SingleAdd/SingleAdd.jsx"
import Home from "./pages/Home/Home.jsx";
import Post from "./pages/Post/Post.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import Search from "./pages/Search/Search.jsx";
import MyAdds from "./pages/MyAdds/MyAdds.jsx";
import ProfileInfo from "./pages/ProfileInfo/ProfileInfo.jsx";
import GoogleCallBack from "./pages/GoogleCallBack/GoogleCallBack.jsx";

function App() {

  return (
    <Routes>

      {/* Client Layout routes */}
      <Route element={<Client />}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add" element={<SingleAdd />} />
        <Route path="/myadds" element={<MyAdds />} />
      </Route>

      {/* Post ad uploading - NO LAYOUT */}
      <Route path="/post" element={<Post />} />
      <Route path="/edit" element={<Post />} />
      <Route path="/profile/info" element={<ProfileInfo />} />
      <Route path="/google/callback" element={<GoogleCallBack />} />

    </Routes>

  )
}

export default App
