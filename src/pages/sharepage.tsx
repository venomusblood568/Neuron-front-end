import { Button } from "../Components/button";
import { useNavigate, useParams } from "react-router-dom";
import { Card } from "../Components/card";
import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Content {
  _id: string;
  type: any;
  link: string;
  title: string;
}

interface ShareResponse {
  content: Content[];
  username: string;
}

export function SharePage() {
  const navigate = useNavigate();
  const { hash } = useParams<{ hash: string }>();
  const [sharedContent, setSharedContent] = useState<Content[]>([]);
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSharedContent = async () => {
      try {
        const response = await axios.get<ShareResponse>(
          `${BACKEND_URL}/api/v1/brain/${hash}`
        );
        setSharedContent(response.data.content);
        setUsername(response.data.username);
        setLoading(false);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError(
            error.response?.data?.message || "Invalid or expired share link"
          );
        } else if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Something went wrong");
        }
        setLoading(false);
      }
    };

    fetchSharedContent();
  }, [hash]);

  const signup_page = () => navigate("/signup");
  const home_page = () => navigate("/");
  const login_page = () => navigate("/login");

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-center text-3xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-white text-center text-3xl">
        {error} <br />
        <div className="hover:text-darkPurple">
          <div className="mt-4">
            <Button
              text="Please return Home"
              onClick={home_page}
              variant={"primary"}
            />
          </div>
        </div>
      </div>
    );
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
          <div className="w-full opacity-100 hover:opacity-60 transition-opacity duration-200">
            <Button
              variant="primary"
              text="Neuron"
              fullwidth={true}
              onClick={home_page}
            />
          </div>

          <div className="w-full opacity-100 hover:opacity-60 transition-opacity duration-200">
            <Button
              variant="secondary"
              text="Create Account"
              fullwidth={true}
              onClick={signup_page}
            />
          </div>

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
        <h1 className="absolute top-4 right-4 text-darkPurple text-5xl font-extrabold tracking-wide">
          {username}'s <span className="text-white">Neuron</span>
        </h1>

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 w-full mt-12">
          {sharedContent.map((content) => (
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
