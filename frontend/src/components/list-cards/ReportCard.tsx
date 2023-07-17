import React from 'react'
import cat  from '../../assets/alex-cat.jpg'
import ReportCasePopup from '../popups/ReportcasePopup'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { instance } from '../../../config/axios.config'


function ReportCard({incidentsId=1,user =false,img=cat,title="EMERGENCY",postedBy="User",locationid=1, location="Cat near PDC" ,status="Solved" , time=2 ,shortDescription="Likes to play ball"}) {
  
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
    instance.delete(`/incidents/delete/${incidentsId}/`, {
      
       
    })
        .then(function (response: any) {
            console.log(response);
            alert(response.data.message)
            window.location.reload()
        })
        .catch(function (error: any) {
            console.log(error);
        });

  }


  return (
    
    <div className='mb-4 ml-2 mr-2'>

      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-75 z-10"></div>
      )}
   <div className="align-bottom bg-[#EBD6D1] rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
  <div className="relative">
    <div className="flex items-center">
      <div className="mr-4">
        <img className="w-24 h-32 rounded-lg object-cover" src={`/uploads/${img}`} alt="Profile" />
      </div>
      <div className="w-2/3 bg-[#f6e4e4] rounded-lg pl-2 pr-2 pt-2 pb-2 h-32">
                <div>
            <div className="flex justify-between">
                <h2 className="font-bold text-gray-800">{location}</h2>
                <h2 className=" text-gray-800">{status}</h2>
            </div>
            <div className="flex justify-between">
                <div></div>
                <h2 className=" text-gray-400">{time} hours ago</h2>
            </div>
            </div>

        <div className="flex justify-between mt-2">
          <button onClick={handlePopupToggle} className="p-2 px-4 mr-1 ml-2 bg-[#6c2c2c]  text-white rounded-lg"> 
            View-info
          </button>

            {!user &&<button onClick={handleRemove} className="p-2 ml-1 bg-[#ebe5e5] rounded-lg flex items-center">
          Decline

        </button>}

        


            </div>
        </div>

        </div>
        </div>

    </div>

    {showPopup && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ">

          
          <ReportCasePopup
            id = {incidentsId}
            user = {user}
            img={img}
            title={title}
            locationId={locationid}
            status={status}
            time = {time}
            postedBy={postedBy}
            locationDescription={location}
            shortDescription={shortDescription}
            onClose={handlePopupClose} 
          />
          
        </div>
      )}
    </div>






 
  )
}

export default ReportCard