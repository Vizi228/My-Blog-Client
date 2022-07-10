import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "./store/slice/userSlice";
import { Auth } from "./api/Authorization";
function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => ({
    isLoaded: state.userSlice.isLoaded
  }))
  useEffect(() => {
    (async () => {
      if(localStorage.getItem('mern-token')){
        const response = await Auth.checkAuth()
        dispatch(setUser(response.data))
      } 
    })()
  }, [dispatch])

  if(!isLoaded) {
    return
  } 
  return (
    <>
      <Header />
      <Container maxWidth="lg">
          <AppRouter />
      </Container>
    </>
  );
}

export default App;
