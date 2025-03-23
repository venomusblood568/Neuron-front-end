import "./App.css";
import { Dashboard } from "./pages/dashboard";
import {Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { BrowserRouter,Routes,Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element= {<SignUp/>}></Route>
        <Route path="/login" element= {<Login/>}></Route>
        <Route path="/dashboard" element= {<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
