import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import AdoptionList from "../../components/list-cards/AdoptionList";
import { useLocation } from "react-router-dom";

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

function AdoptionRequestPage({ user = true }) {
  const {
    adoptionprofilesid,
    img,
    name,
    type,
    location,
    years,
    month,
    hobbies,
    shortDescription,
    longDescription,
  } = useLocation().state;

  // console.log('IFOR',name)

  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (event: any) => {
    event.preventDefault();

    navigate("/user/add-adoption-request", {
      state: {
        rollId: email,
        AdoptionProfilesId: adoptionprofilesid,
      },
    });

    setEmail("");
    setPrivacy(false);
  };

  return (
    <div className="bg-white">
      <h1 className="text-5xl font-bold text-center py-5">
        Request An Adoption
      </h1>

      <div className="max-w-lg mx-auto px-4 ">
        <AdoptionList
          {...{
            user,
            request: true,
            adoptionprofilesid,
            img,
            name,
            type,
            location,
            years,
            month,
            hobbies,
            shortDescription,
            longDescription,
          }}
        />
      </div>

      <div className="max-w-lg mx-auto px-4 mb-5">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-md p-6"
        >
          <div className="mb-4">
            <label htmlFor="email" className="text-gray-700 text-sm">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full px-3 py-2 border-2 bg-white border-gray-300 rounded-md mt-1 text-gray-700 text-sm focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="flex items-center mb-4">
            <input
              className="mr-2 bg-white"
              type="checkbox"
              id="privacy"
              checked={privacy}
              onChange={(event) => setPrivacy(event.target.checked)}
              required
            />
            <label className="text-gray-700  text-sm">
              I agree to the privacy policy. required{" "}
            </label>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-[#811F19] hover:bg-black text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring focus:border-blue-300 "
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default React.memo(AdoptionRequestPage);
