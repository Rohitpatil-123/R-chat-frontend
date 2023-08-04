import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navigation from "./components/Navigation";
import "./App.css";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import { Authenticated } from "./redux/slices/userslice";
import { useDispatch, useSelector } from "react-redux";
import { useGetuserMutation } from "./redux/services/userApi";
function App() {
  const user = useSelector((state) => state.user);

  const [getuser, responseInfo] = useGetuserMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    getuser().then((res) => {
      if (res.data.success) {
        dispatch(Authenticated(res.data.data));
      }
    });
  }, []);
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        {Object.keys(user).length === 0 && (
          <>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </>
        )}

        <Route path="/chat" element={<Chat />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
