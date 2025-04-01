import { forwardRef } from "react";

interface InputProps {
  placeholder: string;
  reference?: React.Ref<HTMLInputElement>;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, reference }: InputProps, ref) => {
    return (
      <div className="gap-2">
        <input
          ref={reference || ref}
          placeholder={placeholder}
          type="text"
          className="inline-flex items-center px-4 py-2 rounded-md font-light cursor-pointer border rounded flex justify-center pt-3 gap-2"
        />
      </div>
    );
  }
);
