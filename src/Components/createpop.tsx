import { useEffect, useRef} from "react";
import { CrossIcon } from "../icon/cross";
import { Button } from "./button";

export function CreateContentModel({ open, onClose }) {
  const modalRef = useRef(null);
  useEffect(() =>{
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    }
    if(open){
      document.addEventListener("mousedown",handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  },[open,onClose])
  
  return (
    <div>
      {open && (
        <div className="w-screen h-screen bg-black fixed top-0 left-0 opacity-90 flex justify-center">
          <div ref={modalRef} className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded">
              <div className="flex justify-end">
                <div onClick={onClose} className="cursor-pointer">
                  <CrossIcon />
                </div>
              </div>
              <div className="text-start">
                <Input placeholder={"Title"}></Input>
                <Input placeholder={"Link"}></Input>
              </div>
              <div className="flex justify-center w-full">
                <Button variant="primary" text="Submit" />
              </div>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

function Input({ onChange, placeholder}) {
  return (
    <div>
      <input
        placeholder={placeholder}
        type="text"
        className="px-9 py-2 border rounded gap-2 m-2"
        onChange={onChange}
      />
    </div>
  );
}
