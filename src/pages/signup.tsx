import { Button } from "../Components/button";
import { Input } from "../Components/input";
import { useRef } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { NeuronIcon } from "../icon/neuronIcon";
import GithubIcon from "../icon/github";
import { Linkedin } from "../icon/linkedn";

export function SignUp() {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  async function signup() {
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
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "❌ Error", {
          position: "bottom-right",
          autoClose: 3000,
        });
      }
    }
  }

   function loginPage() {
     navigate("/login");
   }

  function homepage(){
    navigate("/");
  }

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Layers */}
      <div className="fixed inset-0  opacity-40" />
      <div className="fixed inset-0 bg-grid-light-purple opacity-50 pointer-events-none" />

      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg rounded-full shadow-xl z-50 w-[95%] max-w-4xl border border-purple-500/30 animate-fade-in-up">
        <div onClick={homepage}>
          <div className="flex items-center text-lightPurple text-2xl tracking-widest gap-2">
            <span className="text-darkPurple">ᑎ</span>ᗴᑌᖇᗝ
            <span className="text-darkPurple">ᑎ</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={signup}
            className="px-6 py-2 bg-darkPurple/90 hover:bg-lightPurple text-white rounded-full hover:shadow-glow transition-all duration-300"
          >
            Signup
          </button>
          <button
            onClick={loginPage}
            className="px-6 py-2 bg-darkPurple/90 hover:bg-lightPurple text-white rounded-full hover:shadow-glow transition-all duration-300"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      {/* Main Content */}
      <main className="flex-grow relative pt-24 flex justify-center items-center">
        {/* Purple light effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/2 w-[150%] h-[150%] bg-gradient-radial from-purple-500/40 via-transparent to-transparent transform -translate-x-1/2 -translate-y-1/2 blur-3xl animate-pulse-slow" />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-transparent via-purple-500/20 to-transparent opacity-50" />
        </div>

        {/* Login Card */}
        <div className="relative bg-white/90 backdrop-blur-lg rounded-xl min-w-72 p-10 shadow-xl border border-purple-100 transform transition-all hover:shadow-2xl hover:border-purple-200">
          {/* Inner glow effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 hover:opacity-30 transition-opacity duration-300 pointer-events-none" />

          {/* Light accents */}
          <div className="absolute top-0 left-1/2 w-1/2 h-1 bg-gradient-to-r from-purple-400/30 to-transparent transform -translate-y-1/2 blur-sm" />
          <div className="absolute bottom-0 right-1/2 w-1/2 h-1 bg-gradient-to-l from-purple-400/30 to-transparent transform translate-y-1/2 blur-sm" />

          <h1 className="text-center gap-2 p-2 text-darkPurple text-[30px] mb-6">
            SIGᑎᑌᑭ
          </h1>
          <Input reference={usernameRef} placeholder="Username" />
          <br />
          <Input
            reference={passwordRef}
            placeholder="Password"
            type="password"
          />

          <div className="flex justify-center pt-3 gap-4 items-center text-white">
            <Button
              onClick={signup}
              loading={false}
              variant="primary"
              text="Login"
              fullwidth={true}
            />
          </div>

          <div
            onClick={signup}
            className="m-2 cursor-pointer hover:text-darkPurple"
          >
            Signin Account
          </div>
        </div>
      </main>

      {/* Floating Footer */}
      <footer className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black/80 backdrop-blur-lg rounded-full px-10 py-4 text-sm text-gray-400 shadow-xl border border-purple-500/30 flex items-center gap-6">
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/venomusblood568"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lightPurple transition-colors"
                >
                  <div className="w-5 h-5">
                    <GithubIcon/>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/gourav-anand-jha/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lightPurple transition-colors"
                >
                  <div className="w-5 h-5 text-gray-400">
                    <Linkedin />
                  </div>
                </a>
                <a
                  href="https://venomusblood568.github.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-lightPurple transition-colors"
                >
                  <div className="w-5 h-5">
                    <NeuronIcon />
                  </div>
                </a>
              </div>
              <div className="h-4 w-px bg-gray-500/50"></div>
              <span>© {new Date().getFullYear()} Neuron. All rights reserved.</span>
            </footer>
    </div>
  );
}
