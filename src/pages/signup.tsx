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
      
      if (!username || !password) {
        toast.warning("⚠️ Please enter username and password.", {
          position: "bottom-right",
          autoClose: 2000,
        });
        return;
      }
      await axios.post(BACKEND_URL + "/api/v1/signup", {
        username,
        password,
      });
      
      toast.success(`Welcome to Neuron 🧠🚀, where ideas connect and grow!`, {
        position: "bottom-right",
        autoClose: 2000,
      });
      setTimeout(() => {
        toast.success(`Glad to have you here, ${username}! 🎉`, {
          position: "bottom-right",
          autoClose: 2000,
        });
        navigate("/login");
      },2000);
    } catch (error) {
      toast.error("❌ Error", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  }
  function loginPage() {
    navigate("/login");
  }

  return (
    <div className="h-screen w-screen bg-black flex justify-center items-center">
      <div className="bg-white rounded-xl min-w-72 p-10">
        <h1 className="text-center gap-2 p-2 text-darkPurple text-[30px]">
          SIGᑎᑌᑭ
        </h1>
        <Input reference={usernameRef} placeholder="Username" />
        <br />
        <Input reference={passwordRef} placeholder="Password" type="password"/>
        <div className="fflex justify-center pt-3 gap-4 items-center">
          <Button
            onClick={signup}
            loading={false}
            variant="primary"
            text="Signup"
            fullwidth={true}
          />
        </div>
        <div
          onClick={loginPage}
          className="m-2 cursor-pointer hover:text-darkPurple"
        >
          Already have Account
        </div>
      </div>
    </div>
  );
}