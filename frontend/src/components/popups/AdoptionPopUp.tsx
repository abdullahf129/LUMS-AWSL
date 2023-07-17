import React from "react";
import cat from "../../assets/alex-cat.jpg";
import { useState } from "react";

interface AdoptionPopUp {
  img: any;
  name: string;
  type: string;
  location: string;
  years: number;
  month: number;
  hobbies: string;
  description: string;
  onClose: () => void;
}

function AdoptionPopUp({
  img = [cat],
  name = "Coco",
  type = "animal",
  location = "LUMS",
  years = 2,
  month = 3,
  hobbies = "Playful, Loves Yarn Balls",
  description = " I love fish. My fav feeding spot is PDC. My enemy is Mark. I love my territory you HUMANS!",
  onClose,
}: AdoptionPopUp) {
  const [currentImg, setCurrentImg] = useState(img[0]);
  const images = img;

  const handlePrev = () => {
    const currentIndex = images.indexOf(currentImg);
    const lastIndex = images.length - 1;
    const prevIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
    setCurrentImg(images[prevIndex]);
  };

  const handleNext = () => {
    const currentIndex = images.indexOf(currentImg);
    const lastIndex = images.length - 1;
    const nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
    setCurrentImg(images[nextIndex]);
  };

  const imagePath = `${import.meta.env.VITE_IMAGES_PATH}/`;

  return (
    <div className="relative bg-[#fdfcfc] overflow-hidden rounded-lg shadow-xl w-96 pr-3.5 pl-3.5 pt-10 pb-10">
      <div className="navbar">
        <div className="navbar-start"></div>
        <h2 className=" navbar-center text-3xl font-bold text-[#96716A]">
          My Profile
        </h2>
        <button
          onClick={onClose}
          className="navbar-end text-gray-500 hover:text-gray-700 focus:outline-none bg-white rounded-md ml-auto"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="mb-10 border-t-2 border-b-2 border-black"></div>

    <div className="carousel w-full">
      <div className="relative w-full h-64">
        <img
          key={currentImg}
          className="absolute inset-0 h-full w-full object-cover transition -in delay-300"
          src={`/uploads/${currentImg}`}
          alt="Cat"
        />
        <button
          onClick={handlePrev}
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2 transition-opacity duration-300 hover:opacity-100 opacity-70 focus:outline-none z-10"
        >
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button
          onClick={handleNext}
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-700 rounded-full p-2 transition-opacity duration-300 hover:opacity-100 opacity-70 focus:outline-none z-10"
        >
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
      </div>
      </div>

      <div className="p-4 bg-[#EBD6D1] mt-4 rounded-md">
        <p className="text-gray-800 text-2xl mt-2 font-bold">{name}</p>
        <p className="text-gray-400">{type}</p>
        <p className="text-gray-400">{location}</p>
        <p className="text-gray-400">
          {years} yrs
        </p>
        <p className="text-gray-800 mt-2 font-bold underline">{hobbies}</p>
        <p className="text-gray-800 mt-2">{description}</p>
      </div>
    </div>
  );
}

export default AdoptionPopUp;
