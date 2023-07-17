import React, { useState } from 'react';
import person from '../../assets/cat.webp';
import MemberPopUp from '../popups/MemberPopUp';
import { instance } from '../../../config/axios.config';
import { useNavigate } from 'react-router'

interface MemberList {
  user : boolean;
  img: any;
  Name: string;
  rollNumber: string;
  Department: any;
  designation: string;
  solvedCases: number;
  email: string;
  id: number;
  action : any
  actionValue : any
}

function MemberList({
  user = false,
  img = person,
  Name = 'Blah',
  rollNumber = '24100',
  Department = { name: 'Computer Science' },
  designation = 'Member',
  solvedCases = 12,
  email = '',
  id = 1,
  action = null,
  actionValue = false
}: MemberList) {

  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate()

  const handlePopupToggle = () => {
    setShowPopup(!showPopup);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleRemove = () => {
    setShowPopup(false);
    // Add remove function here
    instance.delete(`/members/delete/${id}/`, {
     
       
    })
        .then(function (response: any) {
            console.log(response);
            alert(response.data.message)
            if(actionValue)
              {action(false)}
            else {
              action(true)
            }
            navigate("/admin/members")

        })
        .catch(function (error: any) {
            console.log(error);
        });

  };

  return (
    <div className="relative ">
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-75 z-10"></div>
      )}
      <ul className="list-reset">
        <li
          className="flex items-center mx-auto bg-[#EFE5E2] border rounded-lg mb-3 w-2/3 overflow-hidden cursor-pointer"
          onClick={handlePopupToggle}
        >
          <div className="relative w-1/4 my-5 mx-5  ">
          <img
            src={person}
            alt="User 1"
            className="  rounded-full border border-gray-100 shadow-sm"
          />
          </div>
          <div className="flex-1">
            <div className="font-bold text-center mx-2 text-sm md:text-xl ">
              {Name}
            </div>
          </div>
        </li>
      </ul>
      {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ">

          
          <MemberPopUp
            user = {user}
            img={img}
            name={Name}
            email={email}
            department={Department}
            designation={designation}
            solvedCases={solvedCases}
            onClose={handlePopupClose}
            onRemove={handleRemove}
            
          />
          
        </div>
      )}
    </div>
  );
}

export default MemberList;
