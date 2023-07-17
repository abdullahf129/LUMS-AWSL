import React from 'react'
import cat  from '../../assets/cat.webp'

import ReportcasePopup from '../popups/ReportcasePopup'
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom';
import AddAdoptionRequestPopup from '../popups/AdoptionRequestCard'

interface pendingApplication {
    user : any,
    img: any,
    email: any,
    Address : any,
    contact : any,
    name: string,
    requestId : any, 
    timePassed : any ,
    action : any,
    actionValue : any
  }



function ViewAdoptionList({user=true, img=cat, email="24100000", contact = "0333" , Address = "lums" , requestId=1 ,name="Catto", timePassed= "12", action = null, actionValue = false} : pendingApplication) {
  
    const [isOpen, setIsOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleViewClick = () => {
        setIsOpen(true);
      };

    const closePopup = () => {
        setIsOpen(false);
    }



    // Delete function will be used when Backend will be done implemented 

    const handleRemoveClick = () => {

      console.log("deletion ::");
      instance.delete(`/adoptions/applications/delete/${requestId}/`, {

      })
      .then(function (response: any) {
        console.log(response)
        alert(response.data.message)

        navigate("/admin/adoption-requests");
        window.location.reload()
        

      })
      .catch(function (error: any) {
        console.log(error);
        alert(error.response.data.message)
        navigate("/admin/adoption-requests");
        window.location.reload()
      });

    }


  
    return (
    
      <div className='flex justify-center'>  
        <div className='bg-white flex justify-center mb-5' style={{maxWidth: 'calc(100% - 12px)', padding: '0 3px'}}>
          <div className="align-bottom bg-white rounded-lg py-2 text-left overflow-hidden shadow-md transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-2">
            <div className="flex items-center justify-start  overflow-hidden md:justify-between max-w-[calc(100vw - 6px)]">
              <div className="mr-4 w-40 md:w-40 h-28 md:h-28">
                <img className="w-full h-full rounded-lg object-cover object-center" src={`/uploads/${img}`} alt="Profile" />
              </div>
              <div className="w-60 md:w-60 bg-[#f6e4e4] rounded-lg pl-2 pr-2 pt-2 pb-4">
                <div>
                  <div className="flex justify-start">
                    <h2 className="font-bold text-gray-800">Requested by : {name}</h2>
                  </div>
                  {/* <div className="flex justify-start">
                    <h2 className="font-bold text-gray-800">reguest by : {name}</h2>
                  </div> */}
                  <div className="flex justify-start">
                    <h2 className="text-gray-400 text-sm">{timePassed} ago</h2>
                  </div>
                  <div className="flex justify-end">
                    <button className='p-2 py-1 px-2 mx-2 text-sm bg-white rounded-lg text-[#6c2c2c] h-1/2 cursor-pointer' onClick={handleViewClick}>View Adopter</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
            {isOpen && (
            <div className="fixed inset-0 bg-gray-800 bg-opacity-50 z-50 flex items-center justify-center">
              
              <AddAdoptionRequestPopup 

                img ={img}
                AdoptionRequestId = {requestId}
                email = {email}
                name = {name}
                address = {Address}
                contact = {contact}
                time = {timePassed}
                onClose = {closePopup}
                onRemove={handleRemoveClick}
              />
            </div>
          )}
      </div>


    
 
  )
}

export default ViewAdoptionList