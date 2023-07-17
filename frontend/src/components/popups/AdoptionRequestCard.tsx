import React from 'react'
import cat  from '../../assets/alex-cat.jpg'


interface ReportcasePopup {
    img: any
    AdoptionRequestId: any
    name : any 
    time : any
    email : any
    address : any
    contact : any
    onClose: () => void
    onRemove : () => void 
}


function AddAdoptionRequestPopup({  img = cat, AdoptionRequestId = 1 , contact = "123", address = "lums" ,name = "Coco", time = 2, email = " 24100000" ,onClose , onRemove}: ReportcasePopup) {
   
    return (

    <div className="relative bg-[#fdfcfc] overflow-hidden rounded-lg shadow-xl w-96 pr-3.5 pl-3.5 pt-10 pb-10">
        
    
        <div className="navbar">
        <div className="navbar-start"></div>
        <h2 className=" navbar-center text-3xl font-bold text-[#96716A]">Adoption Request</h2>
        <button onClick={onClose} className="navbar-end text-gray-500 hover:text-gray-700 focus:outline-none bg-white rounded-md ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>



        <div className="mb-10 border-t-2 border-b-2 border-black"></div>

        <div className="relative w-full h-64">
        <img className="absolute inset-0 h-full w-full object-cover" src={cat} alt="Cat" />
        </div>

        <div className="p-4 bg-[#EBD6D1] mt-4 rounded-md">
        <p className="text-gray-800 text-2xl mt-2 font-bold"> Adopter : {name}</p>
        {/* <p className="text-gray-400">Adopter's Name: {name}</p> */}
        <p className="text-gray-400">{time}</p>
        <p className="text-gray-800 mt-2 font-bold underline">Contact : {contact}</p>
        <p className="text-gray-800 mt-2">{address}</p>
        <div className="flex justify-end">
                <button className='p-2 py-1 px-2 mx-2 text-sm bg-white rounded-lg text-[#6c2c2c] h-1/2 cursor-pointer' onClick={onRemove}>Remove</button>
                <button className='p-2 py-1 px-2 mx-2 text-sm bg-[#6c2c2c] rounded-lg text-white h-1/2 cursor-pointer' onClick={onClose}>Return</button>
        </div>
        </div>
    </div>
    



  )
}

export default  AddAdoptionRequestPopup
















