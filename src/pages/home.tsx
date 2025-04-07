import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useEffect } from "react";
import { BACKEND_URL } from "../config";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { NeuronIcon } from "../icon/neuronIcon";

export function Home() {
  const navigate = useNavigate();
  const features = [
    {
      title: "Capture Everything",
      description: "Store ideas, notes, images, and links in one place.",
    },
    {
      title: "Organize Effortlessly",
      description: "Categorize and tag content for easy retrieval.",
    },
    {
      title: "Access Anywhere",
      description: "Your second brain is available on all your devices.",
    },
  ];

  function infopopup() {
    toast.info("Username should be more than 6 character text & number", {
      position: "bottom-right",
      autoClose: 10000,
    });
    toast.info("Password should be more than 6 character text & number", {
      position: "bottom-right",
      autoClose: 10000,
    });
  }

  async function login() {
    navigate("/login");
  }

  async function signup() {
    infopopup();
    navigate("/signup");
  }

  useEffect(() => {
    const checkbackendConnection = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/ping`);
        if (response.status === 200) {
          toast.success("✅ Connected to backend", {
            position: "bottom-right",
            autoClose: 2000,
          });
        }
      } catch (error) {
        toast.error("❌ Backend not reachable", {
          position: "bottom-right",
          autoClose: 2000,
        });
      }
    };
    checkbackendConnection();
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background Layers */}
      <div className="fixed inset-0  opacity-40" />
      <div className="fixed inset-0 bg-grid-light-purple opacity-50 pointer-events-none" />

      {/* Floating Header */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 flex justify-between items-center p-4 bg-black/80 backdrop-blur-lg rounded-full shadow-xl z-50 w-[95%] max-w-4xl border border-purple-500/30">
        <div className="flex items-center text-lightPurple text-2xl tracking-widest gap-2">
          <span className="text-darkPurple">ᑎ</span>ᗴᑌᖇᗝ
          <span className="text-darkPurple">ᑎ</span>
        </div>
        <div className="flex gap-4">
          <button
            onClick={signup}
            className="px-6 py-2 bg-darkPurple/90 hover:bg-lightPurple text-white rounded-full hover:shadow-glow transition-all duration-300"
          >
            SignUp
          </button>
          <button
            onClick={login}
            className="px-6 py-2 bg-darkPurple/90 hover:bg-lightPurple text-white rounded-full hover:shadow-glow transition-all duration-300"
          >
            Login
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative pt-24">
        <div className="container mx-auto px-4 py-16">
          {/* Hero Section */}
          <div className="text-center mb-20 relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
              Your Digital Second Brain
              <div className="absolute inset-0 bg-purple-500/10 blur-3xl -z-10" />
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto mb-8">
              Neuron is your all-in-one space to capture and organize ideas,
              inspiration, memories, and everything that matters.
            </p>
            <div className="text-center relative z-10">
              <h2 className="text-3xl font-bold text-white mb-6">
                <div className="absolute inset-x-0 -bottom-4 h-2 bg-purple-500/10 blur-md" />
              </h2>
              <p className="text-gray-300 mb-8"> </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={signup}
                  className="px-8 py-4 bg-darkPurple hover:bg-lightPurple text-white rounded-xl hover:shadow-glow transition-all duration-300 relative overflow-hidden"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity" />
                </button>
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative group">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-black/50 backdrop-blur-sm rounded-xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-glow group-hover:opacity-70 hover:!opacity-100"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent rounded-xl opacity-0 hover:opacity-100 transition-opacity" />
                <h3 className="text-xl font-bold text-white mb-4 relative">
                  {feature.title}
                </h3>
                <p className="text-gray-300 relative">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Call to Action */}
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
            <FaGithub className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/gourav-anand-jha/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lightPurple transition-colors"
          >
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a
            href="https://venomusblood568.github.io/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-lightPurple transition-colors"
          >
            <NeuronIcon className="w-5 h-5" />
          </a>
        </div>
        <div className="h-4 w-px bg-gray-500/50"></div>
        <span>© {new Date().getFullYear()} Neuron. All rights reserved.</span>
      </footer>
    </div>
  );
}
