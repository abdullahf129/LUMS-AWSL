import React, { useState } from 'react';
import person from '../../assets/cat.webp';
import person2 from '../../assets/alex-cat.jpg';
import MemberPopUp from '../popups/MemberPopUp';
import { instance } from '../../../config/axios.config';
import { useNavigate } from 'react-router'


interface LocationList {
  
  name: string;
  id: number ;
  actionValue : boolean;
  setAction : any
  
}

function LocationCard({
  name = "Pepsi Dyning Centre",
  id = 1, actionValue = false , setAction = ()=>{}
  
}: LocationList) {

 
  const navigate = useNavigate();
  const handleRemove = () => {
   

    instance.delete(`/locations/delete/${id}/`, { })
        .then(function (response: any) {
            alert(response.data.message)
            navigate("/admin/locations")
            if(actionValue){setAction(false)} else {setAction(true)}

        })
        .catch(function (error: any) {
            console.log(error);
            navigate("/admin/locations")
        });

  };

  return (
    <div className="relative ">
        <ul className="list-reset">
            <li className="flex flex-col sm:flex-row items-center mx-auto bg-[#EFE5E2] border rounded-lg mb-3 w-2/3 overflow-hidden cursor-pointer">
            <div className="relative w-full sm:w-1/4 my-5 mx-5">
                <img src={person} alt="User 1" className="rounded-full border border-gray-100 shadow-sm w-full h-32 object-cover" />
            </div>
            <div className="flex-1">
                <div className="flex items-center justify-between mx-2 text-sm md:text-xl ">
                <div className="font-bold mb-2 sm:mb-0 overflow-hidden">{name}</div>
                <button className="px-4 py-2 ml-3 my-1 bg-[#811F19] hover:bg-red-600 text-white rounded-md" onClick={handleRemove}>
                    Delete
                </button>
                </div>
            </div>
            </li>
        </ul>
    </div>




  

  );
}

export default LocationCard;
