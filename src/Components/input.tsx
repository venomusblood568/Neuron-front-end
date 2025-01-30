import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, reference }: InputProps, ref) => {
    return (
      <div>
        <input
          ref={reference || ref} 
          placeholder={placeholder}
          type="text"
          className="px-4 py-2 border rounded m-2"
        />
      </div>
    );
  }
);
