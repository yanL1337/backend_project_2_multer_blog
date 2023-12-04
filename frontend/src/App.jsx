import "./components/BlogList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminPage from "./pages/AdminPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import ArticlePage from "./pages/ArticlePage.jsx";
import { useState, useEffect } from "react";

//fetch
function App() {
  const [refresher, setRefresh] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("http://localhost:1337/blogs")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, [refresher]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage blogs={blogs} />} />
        <Route
          path="/admin/addBlog"
          element={<AdminPage setRefresh={setRefresh} blogs={blogs} />}
        />
        <Route path="/article/:id" element={<ArticlePage blogs={blogs} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
