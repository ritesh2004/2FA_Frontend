import { useState } from "react";
import { Login } from "./pages/Login";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import { Signup } from "./pages/Signup";
import { TwoFSetup } from "./pages/TwoFSetup";
import { TwoFverify } from "./pages/TwoFverify";
import { Home } from "./pages/Home";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={Login} />
          <Route path="/home" Component={Home} />
          <Route path="/signup" Component={Signup} />
          <Route path="/setup" Component={TwoFSetup} />
          <Route path="/verify" Component={TwoFverify} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
