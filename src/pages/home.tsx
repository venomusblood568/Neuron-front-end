import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function Home() {
  const navigate = useNavigate()
  
  function infopopup(){
    toast.info("Username should be more than 6 character text & number",{
      position:"bottom-right",
      autoClose:10000
    })
    toast.info("Password should be more than 6 character text & number",{
      position:"bottom-right",
      autoClose:10000
    })
  }
  
  async function login() {
    navigate("/login");
   }
    async function signup() {
      infopopup()
      navigate("/signup");
    }

  return (
    <div className="relative h-screen w-full flex items-center justify-center text-center">
      <div className="absolute inset-0 bg-[url('/neurons-7433381_1280.jpg')] bg-cover bg-center opacity-40"></div>
      <div className="relative max-w-sm p-4 bg-black shadow-lg rounded-2xl">
        <h2 className="text-xl font-bold">
          <div className="flex items-center justify-center text-lightPurple text-3xl p-5 m-5 tracking-widest">
            <a className="text-darkPurple">ᑎ</a>ᗴᑌᖇᗝ
            <a className="text-darkPurple">ᑎ</a>
          </div>
        </h2>
        <p className="text-gray-500 mt-2">
          <strong>Neuron: Your Digital Second Brain 🧠✨</strong>
          Neuron is a{" "}
          <span className="font-semibold">second brain concept</span> website
          where you can
          <span className="text-darkPurple">
            {" "}
            store everything that resonates with you{" "}
          </span>
          <br />
          <br />
          <span className="font-semibold">
            No more lost ideas or forgotten inspirations
          </span>
          —everything stays
          <span className="text-darkPurple">
            {" "}
            organized, accessible, at your finger tips.
          </span>
        </p>

        <div className="flex items-center justify-center gap-4 py-2">
          <button
            onClick={signup}
            className="mt-4 px-4 py-2 bg-darkPurple text-white rounded-lg hover:bg-lightPurple"
          >
            SignUp
          </button>
          <button
            onClick={login}
            className="mt-4 px-4 py-2 bg-darkPurple text-white rounded-lg hover:bg-lightPurple"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
