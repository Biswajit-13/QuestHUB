import {BrowserRouter as Router,Routes, Route} from "react-router-dom";

import Home from "./pages/home/home";
import Login from "./pages/login/login";
import Post from "./pages/post/post";
import PostDetail from "./pages/postDetail/postDetail";
import UserDetail from "./pages/userDetail/userDetail";
import Notification from "./pages/notification/notification";
import Chat from "./pages/chat/chat";
import Saved from "./pages/saved/saved";

export default function App() {
  return (
<Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/post" element={<Post />}/>
        <Route path="/notification" element={<Notification/>}/>
        <Route path="/chat" element={<Chat/>}/>
        <Route path="/saved" element={<Saved/>}/>
        <Route path="/post/:postId" element={<PostDetail />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      
      </Routes>
    </Router>
  )
}