import { FullPost } from "../pages/FullPost";
import { Home } from "../pages/Home";
import { AddPost } from "../pages/AddPost";
import { Login } from "../pages/Login";
import { Registration } from "../pages/Registration";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";

function AppRouter() {
  const { isAuth } = useSelector((state) => ({
    isAuth: state.userSlice.isAuth,
  }));
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<FullPost />}/>
      {isAuth && <Route path="/write" element={<AddPost />}/>}
      <Route path="/login" element={<Login />}/>
      <Route path="/register" element={<Registration />}/>
      <Route path="*" element={<Navigate to='/' />}/>
    </Routes>
    </>
  );
}

export default AppRouter;
