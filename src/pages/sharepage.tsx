import { Button } from "../Components/button";
import { useNavigate } from "react-router-dom";
import { useContent } from "../hooks/useContent";
import { Card } from "../Components/card";
import { useEffect } from "react";

export function SharePage() {
  const navigate = useNavigate();
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh();
  }, []);

  function signup_page() {
    navigate("/signup");
  }
  function home_page() {
    navigate("/");
  }
  function login_page() {
    navigate("/login");
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="h-screen bg-black border-darkPurple border-r-2 w-56 fixed left-0 top-0 flex flex-col">
        <div className="flex items-center justify-center text-white text-3xl p-5 m-5 tracking-widest">
          <a className="text-darkPurple">ᑎ</a>ᗴᑌᖇᗝ
          <a className="text-darkPurple">ᑎ</a>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 w-full flex flex-col items-center cursor-pointer px-4 rounded-md py-2 gap-2">
          {/* Home Button */}
          <div className="w-full opacity-100 hover:opacity-60 transition-opacity duration-200">
            <Button
              variant="primary"
              text="Neuron"
              fullwidth={true}
              onClick={home_page}
            />
          </div>

          {/* Create Account Button */}
          <div className="w-full opacity-100 hover:opacity-60 transition-opacity duration-200">
            <Button
              variant="secondary"
              text="Create Account"
              fullwidth={true}
              onClick={signup_page}
            />
          </div>

          {/* Login Button */}
          <div className="w-full opacity-100 hover:opacity-60 transition-opacity duration-200">
            <Button
              variant="primary"
              text="Login"
              fullwidth={true}
              onClick={login_page}
            />
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ml-56 flex-1 p-10 relative">
        {/* Page Title */}
        <h1 className="absolute top-4 right-4 text-darkPurple text-5xl font-extrabold tracking-wide">
          Sam's <span className="text-white">Neuron</span>
        </h1>

        {/* Content Cards Grid */}
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12  w-full mt-12">
          {contents.map((content) => (
            <Card
              key={content._id}
              id={content._id}
              type={content.type}
              link={content.link}
              title={content.title}
              disableActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
