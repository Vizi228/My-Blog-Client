import Container from "@mui/material/Container";

import { Header } from "./components/Header";
import AppRouter from "./components/AppRouter";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./services/auth";
function App() {
  const dispatch = useDispatch();
  const { isLoaded } = useSelector((state) => ({
    isLoaded: state.userSlice.isLoaded
  }))
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  if(!isLoaded) {
    return (
      <div className="preload-app">
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    )
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
