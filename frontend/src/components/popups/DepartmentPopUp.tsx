import React from 'react'
import cat  from '../../assets/alex-cat.jpg'

interface DepartmentPopUp {
        img: any
        name: string
        director: string
        description: string
        memberCount: number
        onClose: () => void; 

}

function DepartmentPopUp({ img = cat, name = "Fostering", director = "Arshad", description = "We deal with Meow issues", memberCount = 12 , onClose}: DepartmentPopUp) {


    return(
        <div className="card w-96 bg-[#EBD6D1] shadow-xl ">
            <div className='flex justify-end'>
                <button className="close-btn btn-md cursor-pointer " onClick={onClose}>
                        <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.4 19.2534L0 17.3794L5.6 9.88311L0 2.38688L1.4 0.512817L7 8.00906L12.6 0.512817L14 2.38688L8.4 9.88311L14 17.3794L12.6 19.2534L7 11.7572L1.4 19.2534Z" fill="#050505"/>
                        </svg>
                </button>
            </div>


            <figure className="px-7 pt-10 -mb-20 z-20">
                <img src={img} alt="Shoes" className="rounded-xl object-cover h-72 w-full" />
            </figure>
            <div className="card-body items-left text-left bg-[#F6EFE3] rounded-xl mx-4 pt-20 pb-10 mb-5">
                <div className="flex justify-between">
                    <h2 className="card-title pt-10">{name}</h2>
                    <span className="inline-block float-right text-[#D27355] pt-12 ">{memberCount} members</span>
                </div>
                <p>
                    <span className="text-black">Director : {director}</span>
                </p>
                <p className="text-gray-400 mt-5">{description}</p>
            </div>
        </div>

     

    )
}

export default DepartmentPopUp
