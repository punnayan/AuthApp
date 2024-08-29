import { useContext, useEffect } from "react";
import { Context } from "./main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Auth/Login.jsx";
import Register from "./components/Auth/Register.jsx";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import Home from "./components/Home/Home";


const App = () => {
  const { isAuthorized, setIsAuthorized, setUser } = useContext(Context);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/user/getuser",{withCredentials: true,});
        setUser(response.data.user);
        setIsAuthorized(true);
      } catch (error) {
        console.error(error)
        setIsAuthorized(false);
      }
    };
    fetchUser();
  }, [isAuthorized]);

  return (
    <>
      <BrowserRouter>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>

        <Toaster />
      </BrowserRouter>
    </>
  );
};

export default App;