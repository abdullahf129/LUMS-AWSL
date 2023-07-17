import React from "react";
import { useState } from "react";

interface ImageInputProps {
  onChange?: (file: File) => void;
  required?: boolean;
}

function ImageInput({ onChange, required }: ImageInputProps) {
  const [previewImage, setPreviewImage] = useState<string>();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      setPreviewImage(undefined);
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      setPreviewImage(event.target?.result as string);
    };

    reader.readAsDataURL(file);

    if (onChange) {
      onChange(file);
    }
  };

  return (
    <div className="flex justify-center w-1/2 mx-auto z-30 ">
      <div className="relative border-dotted border-2 border-gray-400 rounded-lg pt-5 w-1/2 mt-2">
        <input
          type="file"
          accept="image/jpeg, image/png ,image/jpg "
          onChange={handleImageChange}
          required={required}
          className="opacity-0 absolute h-full w-full cursor-pointer "
        />
        <label htmlFor="file-input"></label>
        {previewImage ? (
          <div className="relative h-2/3">
            <img
              src={previewImage}
              alt="Preview of uploaded image"
              className="w-full h-full object-contain"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 ">
            <svg
              width="24"
              height="21"
              viewBox="0 0 24 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.3294 12.9365C11.3294 13.3169 11.6377 13.6252 12.0181 13.6252C12.3984 13.6252 12.7067 13.3169 12.7067 12.9365H11.3294ZM12.505 0.51305C12.2361 0.244117 11.8001 0.244117 11.5311 0.51305L7.14861 4.89557C6.87967 5.1645 6.87967 5.60052 7.14861 5.86946C7.41754 6.13839 7.85356 6.13839 8.1225 5.86946L12.0181 1.97389L15.9136 5.86946C16.1826 6.13839 16.6186 6.13839 16.8875 5.86946C17.1565 5.60052 17.1565 5.1645 16.8875 4.89557L12.505 0.51305ZM12.7067 12.9365V0.999996H11.3294V12.9365H12.7067Z"
                fill="#263238"
              />
              <path
                d="M1 6.96802V17.9864C1 18.747 1.61663 19.3636 2.37729 19.3636H21.2003C21.9609 19.3636 22.5776 18.747 22.5776 17.9864V6.96802"
                stroke="#263238"
                strokeWidth="1.37729"
                strokeLinecap="round"
              />
            </svg>

            <p className="text-xs text-center pb-2 text-gray-600">
              Browse to upload
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageInput;