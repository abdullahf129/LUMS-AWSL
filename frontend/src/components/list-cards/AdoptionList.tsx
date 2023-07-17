import React from "react";
import cat from "../../assets/alex-cat.jpg";

import AdoptionPopUp from "../popups/AdoptionPopUp";
import { instance } from "../../../config/axios.config";
import { useNavigate } from "react-router";

interface Adoption {
  adoptionprofilesid: number;
  img: any;
  name: string;
  type: string;
  location: string;
  years: number;
  month: number;
  hobbies: string;
  shortDescription: string;
  longDescription: string;
}

interface AdoptionPictures {
  AdoptionPicturesId: 1,
  AdoptionProfilesId: 1,
  PhotoName: null
}


function AdoptionList({
  user = false,
  request = true,
  adoptionprofilesid = 1,
  img = ['alex-cat.jpg'],
  name = "Meow",
  type = "animal",
  location = "LUMS",
  years = 2,
  month = 2,
  hobbies = "dance",
  shortDescription = "Likes to play ball",
  longDescription = "Likes to play ballx2",
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleViewClick = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  const handleRemoveClick = () => {
    instance
      .delete(`/adoptions/delete/${adoptionprofilesid}/`, {})
      .then(function (response: any) {
        console.log(response);
        alert(response.data.message);

        window.location.reload();

        navigate("/admin/adoption");
      })
      .catch(function (error: any) {
        alert(error.response.message)
        console.log(error);
      });
  };

  const imagePath = `/uploads/`;


  const handleAdoptClick = () => {
    // console.log(name)

    navigate("/user/request-adoption", {
      state: {
        img: img,
        adoptionprofilesid: adoptionprofilesid,
        name: name,
        type: type,
        location: location,
        years: years,
        month: month,
        hobbies: hobbies,
        shortDescription: shortDescription,
        longDescription: longDescription,
      },
    });
  };

  // console.log(imagePath)
  // console.log(img[0])
  // console.log(`${imagePath}`+img[0])

  
  return (
    <div className="bg-white m-3">
      <div className="align-bottom bg-white rounded-lg px-4  mx-2 py-2 text-left overflow-hidden shadow-md transform transition-all">
        <div className="flex flex-row">
          <div className="mr-3 flex align-middle">
            <img className="w-24 h-42 rounded-lg" src={`/uploads/${img[0]}`} alt="Profile" />
          </div>
          <div className="w-2/3 bg-[#f6e4e4] rounded-lg pl-2 pr-2 pt-2 pb-4  h-42">
            <div>
              <div className="flex justify-start">
                <h2 className="font-bold text-gray-800">{name}</h2>
              </div>
              <div className="flex justify-start">
                <div></div>
                <h2 className=" text-gray-400">
                  {years} y
                </h2>
              </div>

              <div className="flex justify-start">
                <div></div>
                <h2 className=" text-gray-400">{shortDescription} </h2>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-center mt-1">
              {!user ? (
                <button
                  className="p-2 px-4 mx-2 my-1 bg-[#6c2c2c] rounded-lg text-white cursor-pointer"
                  onClick={handleRemoveClick}
                >
                  Remove
                </button>
              ) : (
                !request && (
                  <button
                    className="p-2 px-4 mx-2 my-1 bg-[#6c2c2c] rounded-lg text-white cursor-pointer"
                    onClick={handleAdoptClick}
                  >
                    Adopt
                  </button>
                )
              )}

              <button
                className="p-2 px-4 mx-2 my-1 bg-white rounded-lg text-red cursor-pointer"
                onClick={handleViewClick}
              >
                View
              </button>
            </div>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
          <AdoptionPopUp
            img={img}
            name={name}
            type={type}
            location={location}
            years={years}
            month={month}
            hobbies={shortDescription}
            description={longDescription}
            onClose={closePopup}
          />
        </div>
      )}
    </div>
  );
}

export default AdoptionList;
