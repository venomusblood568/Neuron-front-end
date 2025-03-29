import { Button } from "../Components/button";
import { Input } from "../Components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>()
  const passwordRef = useRef<HTMLInputElement>()
  const navigate = useNavigate();

  async function signup(){
    try {
      
      const username = usernameRef.current?.value;
      const password = passwordRef.current?.value;
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      if (!username || !password) {
        toast.warning("⚠️ Please enter username and password.", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
      toast.success(`Welcome to Neuron 🧠🚀, where ideas connect and grow!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        toast.success(`Glad to have you here, ${username}! 🎉`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/dashboard");
      },2000);
    } catch (error) {
      toast.error("❌ Error", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }


  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-72 p-8">
        <h1 className="text-center p-2 text-darkPurple text-[30px]">SIGᑎᑌᑭ</h1>
        <Input reference={usernameRef} placeholder="Username" />
        <Input reference={passwordRef} placeholder="Password" />
        <div className="flex justify-center pt-4 gap-3">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
          />
        </div>
      </div>
    </div>
  );
}