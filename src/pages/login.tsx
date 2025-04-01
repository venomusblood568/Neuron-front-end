import { Button } from "../Components/button";
import { Input } from "../Components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function login() {
    try {
      const username = usernameRef.current?.value?.trim();
      const password = passwordRef.current?.value?.trim();

      if (!username || !password) {
        toast.error("⚠️ Please enter username and password.", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password,
      });

      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      localStorage.setItem("username", username);

      toast.success(`👋 Welcome Back, ${username}!`, {
        position: "bottom-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (error) {
      toast.error("❌ Login failed. Please check your credentials.", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }
  function signinPage(){
    navigate("/signup");
  }
  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-72 p-10">
        <h1 className="text-center gap-2 p-2 text-darkPurple text-[30px]">
          ᒪOᘜIᑎ
        </h1>
        <Input reference={usernameRef} placeholder="Username" />
        <br />
        <Input reference={passwordRef} placeholder="Password" type="password" />

        <div className="flex justify-center pt-3 gap-4 items-center">
          <Button
            onClick={login}
            loading={false}
            variant="primary"
            text="Login"
            fullwidth={true}
          />
        </div>
        <div onClick={signinPage} className="m-2 cursor-pointer hover:text-darkPurple">
          Signin Account
        </div>
      </div>
    </div>
  );
}
