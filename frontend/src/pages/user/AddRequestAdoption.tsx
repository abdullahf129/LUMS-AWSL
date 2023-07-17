import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { instance } from "../../../config/axios.config";
import { useLocation } from "react-router-dom";

function RequestAdoption() {
  const { rollId, AdoptionProfilesId } = useLocation().state;

  // console.log('Adop',AdoptionProfilesId)

  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [contact, setContact] = useState<string>("");
  const [address, setAddress] = useState<string>("");

  const handleSubmit = (event: any) => {
    event.preventDefault();

    instance
      .post("/adoptions/applications/apply", {
        profileId: parseInt(AdoptionProfilesId),
        name: name,
        address: address,
        contact: contact,
      })
      .then(function (response: any) {
        console.log(response);

        alert(response.data.message);

        navigate("/user/adoption", { replace: true });
      })
      .catch(function (error: any) {
        console.log(error.response);
        alert(error.response.data.message);
      });

    setName("");
    setAddress("");
    setContact("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white">
      <h1 className="flex-1 text-xl md:text-4xl font-bold text-center mt-10 mb-5">
        Submit Adoption Request
      </h1>

      <div className="flex justify-center mx-5">
        <input
          type="text"
          placeholder="Your Name"
          className="input input-md input-bordered w-full max-w-xs mt-5"
          onChange={(event) => setName(event.target.value)}
          required
        />
      </div>

      <div className="flex justify-center mx-5">
        <input
          type="text"
          placeholder="Your Contact "
          className="input input-md input-bordered w-full max-w-xs mt-5"
          onChange={(event) => setContact(event.target.value)}
          required
        />
      </div>

      <div className="flex justify-center mx-5">
        <input
          type="text"
          placeholder="Your Address "
          className="input input-md input-bordered w-full max-w-xs mt-5"
          onChange={(event) => setAddress(event.target.value)}
          required
        />
      </div>

      <div className="flex justify-center items-center">
        <button className="bg-[#811F19] text-white font-medium my-10 py-2 px-4 rounded-3xl w-2/6">
          Submit
        </button>
      </div>
    </form>
  );
}

export default React.memo(RequestAdoption);
