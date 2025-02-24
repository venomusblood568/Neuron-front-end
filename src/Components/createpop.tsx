import { useEffect, useRef, useState } from "react";
import { CrossIcon } from "../icon/cross";
import { Button } from "./button";

export function CreateContentModel({ open, onClose }) {
  const modalRef = useRef(null);
  const [selectedCategory, setSelectedCategory] = useState(""); // State for dropdown

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
    <div>
      {open && (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-90 flex justify-center items-center">
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
              <Input placeholder="Title" />
              <Input placeholder="Link" />

              {/* Dropdown */}
              <select
                className="px-4 py-2 border rounded w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="content">Content</option>
                <option value="youtube">Youtube</option>
                <option value="link dump">Link Dump</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center w-full mt-4">
              <Button variant="primary" text="Submit" fullwidth />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ onChange, placeholder }) {
  return (
    <input
      placeholder={placeholder}
      type="text"
      className="px-4 py-2 border rounded w-full"
      onChange={onChange}
    />
  );
}
