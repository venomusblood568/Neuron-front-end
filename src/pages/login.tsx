import { Button } from "../Components/button";
import { Input } from "../Components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export function Login() {
  
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function login() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const response = await axios.post(BACKEND_URL + "/api/v1/signin", {
      username,
      password,
    });
    const jwt = response.data.token
    localStorage.setItem("token",jwt)
    navigate("/dashboard");
    
  }

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-72 p-8">
        <h1 className="text-center p-2 text-darkPurple text-[30px]">ᒪOᘜIᑎ</h1>
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef}  placeholder="Password" />
        <div className="flex justify-center pt-4 gap-3">
          <Button
            onClick={login}
            loading={false}
            variant="primary"
            text="Login"
          />
        </div>
      </div>
    </div>
  );
}
