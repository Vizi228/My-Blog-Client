import { Home } from "../pages/Home";
import { Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { lazy, Suspense } from "react";

const LazyFullPost = lazy(() => import("../pages/FullPost"));
const LazyAddPost = lazy(() => import("../pages/AddPost"));
const LazyLogin = lazy(() => import("../pages/Login"));
const LazyRestration = lazy(() => import("../pages/Registration"));

function AppRouter() {
  const { isAuth } = useSelector((state) => ({
    isAuth: state.userSlice.isAuth,
  }));
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<LazyFullPost />}/>
      <Route path="/posts/tags/:id" element={<Home />}/>
      {isAuth && <Route path="/write" element={<LazyAddPost />}/>}
      {isAuth && <Route path="/posts/:id/edit" element={<LazyAddPost />}/>}
      <Route path="/login" element={<LazyLogin />}/>
      <Route path="/register" element={<LazyRestration />}/>
      <Route path="*" element={<Navigate to='/' />}/>
    </Routes>
    </Suspense>
    
    </>
  );
}

export default AppRouter;
