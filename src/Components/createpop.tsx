import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icon/cross";
import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
enum ContentType{
  Youtube = "youtube",
  Content = "article",
  LinkDump = "linkdump"
}

export function CreateContentModel({ open, onClose }) {
  const modalRef = useRef(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;
    if (!title || !link) {
      alert("Please enter both title and link");
      return;
    }
    function contentadded(){
        toast.success("Content Added Succesfully!!",{
          position:"bottom-right",
          autoClose:3000    
        })
      }
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      contentadded()
      onClose();
    } catch (error) {
      console.error("Failed to add content:", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, onClose]);

  return (
    open && (
      <div className="w-screen h-screen bg-gray-900/50 fixed top-0 left-0 flex justify-center items-center z-90">
        <div
          ref={modalRef}
          className="bg-white opacity-100 p-6 rounded-lg w-96"
        >
          {/* Close Button */}
          <div className="flex justify-end m-2">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          {/* Input Fields */}
          <div className="flex flex-col gap-4">
            <Input reference={titleRef} placeholder="Title" />
            <Input reference={linkRef} placeholder="Link" />
          </div>
          <div>
            <h2 className="text-center p-2"></h2>
            <div className="flex gap-5 justify-center pb-2">
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Article"
                variant={type === ContentType.Content ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Content)}
              />
              <Button
                text="Link Dump"
                variant={
                  type === ContentType.LinkDump ? "primary" : "secondary"
                }
                onClick={() => setType(ContentType.LinkDump)}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center w-full mt-4">
            <Button
              onClick={addContent}
              variant="primary"
              text={loading ? "Submitting..." : "Submit"}
              fullwidth
              disabled={loading}
            />
          </div>
        </div>
      </div>
    )
  );
}

function Input({ reference, placeholder }) {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      type="text"
      className="px-4 py-2 border rounded w-full"
    />
  );
}