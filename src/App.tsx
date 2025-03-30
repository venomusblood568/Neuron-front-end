import "./App.css";
import { Dashboard } from "./pages/dashboard";
import { Home } from "./pages/home";
import { Login } from "./pages/login";
import { SignUp } from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
import {SharePage} from "./pages/sharepage";

function App() {
  return (
    <>
      <ToastContainer /> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/share" element={<SharePage/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
