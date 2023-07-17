import React from 'react'
import DepartmentPopUp from './DepartmentPopUp'
import cat  from '../../assets/alex-cat.jpg'

interface CATaloguePopUp {
    img: any
    name: string
    years : number
    month : number
    hobbies : string 
    description: string
}





function CATalogPopup({  img = cat, name = "Coco", years = 2 , month = 3, hobbies = "Playful, Loves Yarn Balls",description = " I love fish. My fav feeding spot is PDC. My enemy is Mark. I love my territory you HUMANS!"}: CATaloguePopUp) {
   
    return (




    <div className="relative bg-[#fdfcfc] overflow-hidden rounded-lg shadow-xl w-96 pr-3.5 pl-3.5 pt-10 pb-10">
        
    
        <div className="navbar">
        <div className="navbar-start"></div>
        <h2 className=" navbar-center text-3xl font-bold text-[#96716A]">My Profile</h2>
        <button className="navbar-end text-gray-500 hover:text-gray-700 focus:outline-none bg-white rounded-md ml-auto">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        </div>



        <div className="mb-10 border-t-2 border-b-2 border-black"></div>

        <div className="relative w-full h-64">
        <img className="absolute inset-0 h-full w-full object-cover" src={img} alt="Cat" />
        </div>

        <div className="p-4 bg-[#EBD6D1] mt-4 rounded-md">
        <p className="text-gray-800 text-2xl mt-2 font-bold">{name}</p>
        <p className="text-gray-400">{years} yrs, {month} mon</p>
        <p className="text-gray-800 mt-2 font-bold underline">{hobbies}</p>
        <p className="text-gray-800 mt-2">{description}</p>
        </div>
    </div>
    



  )
}

export default CATalogPopup
















