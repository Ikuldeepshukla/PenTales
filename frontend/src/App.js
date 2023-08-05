import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Post from "./pages/post/index";
import Profile from "./pages/profile/index";

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/post/:id" element={<Post />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default App;
