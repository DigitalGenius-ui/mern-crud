import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Post from "./components/Post";
import PostShare from "./components/PostShare";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<PostShare />} />
        <Route path="/create/posts" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
