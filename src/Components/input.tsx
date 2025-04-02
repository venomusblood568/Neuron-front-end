import { useState, forwardRef } from "react";

interface InputProps {
  placeholder: string;
  type?: "text"| "password"; 
  reference?: React.Ref<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type="text",reference }: InputProps, ref) => {
    
    const[showpassword,setshowpassword] = useState(false);
    const isPassword = type === "password"
    
    return (
      <div className="relative flex items-center gap-2">
        <input
          ref={reference || ref}
          placeholder={placeholder}
          type={isPassword && !showpassword ? "password" : "text"}
          className="inline-flex items-center px-4 py-2 rounded-md font-light cursor-pointer border rounded flex justify-center pt-3 gap-2"
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setshowpassword(!showpassword)}
            className="absolute right-3 text-sm text-darkPurple hover:underline"
            >
            {showpassword ? "HIDE" : "SHOW"}
            </button>
        )}
      </div>
    );
  }
);
