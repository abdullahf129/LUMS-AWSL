import React from 'react'
import cat from '../../assets/alex-cat.jpg'

import ReportcasePopup from '../popups/ReportcasePopup'
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';


function ReportList({ link = '', user = true, img = cat, title = "Catto sick near PDC", postedBy = "Anon", timePassed = "12", shortDescription = "Likes to play ball", longDescription="Thousands of kittens are born each year, and many of them end up in shelters. In fact, an article on humanpro.org reports that over 3.2 million cats end up in shelters each year. And 27% end up euthanized." }) {

  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleViewClick = () => {
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
  }

  return (


    <div onClick={()=> window.location.href = link} className='bg-white'>
      <div className="align-bottom bg-white rounded-lg px-4 py-2 text-left overflow-hidden shadow-md transform transition-all my-8 max-w-lg w-full p-6 cursor-pointer">
        <div className="relative">
          <div className="flex items-center ">
            <div className="mr-4 w-64">
              <img className="rounded-lg object-cover" src={img} alt="Profile" />
            </div>
            <div>
              <div className="flex justify-start">
                <h2 className="text-[#811F19] font-bold text-lg">{title}</h2>
              </div>

              <div className="flex justify-start">
                <h2 className="text-black text-sm">{shortDescription} <a onClick={handleViewClick}></a> </h2>
              </div>

              <div className="flex justify-start">
                <h2 className="text-gray-400 text-xs mt-3">{longDescription} <a onClick={handleViewClick}></a> </h2>
              </div>
            </div>


          </div>
        </div>

      </div>

    </div>
  )
}

export default ReportList