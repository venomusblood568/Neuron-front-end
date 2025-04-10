import { RefObject, useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icon/cross";
import { Button } from "./button";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { toast } from "react-toastify";
import {FC} from "react";
enum ContentType{
  Youtube = "youtube",
  Content = "article",
  LinkDump = "linkdump"
}
interface CreateContentModelProps {
  open: boolean;
  onClose: () => void;
}

export const CreateContentModel: FC<CreateContentModelProps> = ({
  open,
  onClose,
}) => {
  const modalRef = useRef<HTMLInputElement>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);
  const [selectedCollection, setselectedCollection] = useState("");

  async function addContent() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link || !selectedCollection) {
      toast.error("Please enter title, link and select a collection", {
        position: "bottom-right",
        autoClose: 4000,
      });
      return;
    }

    function contentadded() {
      toast.success("Content Added Succesfully!!", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/content`,
        {
          link,
          title,
          type,
          tag: selectedCollection,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      contentadded();
      onClose();
    } catch (error) {
      console.error("Failed to add content:", error);
      alert("Failed to add content. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
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

          {/* Form Container */}
          <div className="flex flex-col gap-4">
            <Input reference={titleRef} placeholder="Title" />
            <Input reference={linkRef} placeholder="Link" />

            {/* Dropdown Menu */}
            <div className="flex items-center gap-3">
              <p className="whitespace-nowrap">Collection →</p>
              <select
                onChange={(e) => setselectedCollection(e.target.value)}
                value={selectedCollection}
                className="py-2 border rounded w-full p-2"
              >
                <option value="" disabled selected hidden>
                  Select a Collection
                </option>
                <option value="project">Project</option>
                <option value="area">Area</option>
                <option value="resource">Resource</option>
                <option value="archives">Archives</option>
                <option value="experiment">Experiment</option>
                <option value="random">Random Link dump</option>
              </select>
            </div>

            {/* Link Type Selection */}
            <div className="flex items-center gap-3">
              <p className="whitespace-nowrap">Link Type →</p>
              <Button
                text="Youtube"
                variant={type === ContentType.Youtube ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Youtube)}
              />
              <Button
                text="Other Link"
                variant={type === ContentType.Content ? "primary" : "secondary"}
                onClick={() => setType(ContentType.Content)}
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
            />
          </div>
        </div>
      </div>
    )
  );
};

interface InputProp{
  reference:RefObject<HTMLInputElement>;
  placeholder:string;
}


function Input({ reference, placeholder }:InputProp) {
  return (
    <input
      ref={reference}
      placeholder={placeholder}
      type="text"
      className="px-4 py-2 border rounded w-full"
    />
  );
}