import React from 'react'
import cat  from '../../assets/cat.webp'

interface MemberPopUp {
        user: boolean
        img: any
        name: string
        email: string
        department: any
        designation: string
        solvedCases: number
        onClose: () => void;
        onRemove: () => void;

}

function MemberPopUp({ user=false, img = cat, name = "Ayleen Nausahi", email = "", department = "", designation= "Member", solvedCases = 0, onClose,onRemove}: MemberPopUp) {
        return (
            <div className="card w-96 object-contain bg-custom shadow-xl mt-40">
                 <button className="close-btn" onClick={onClose}>
                    <svg width="14" height="20" viewBox="0 0 14 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1.4 19.2534L0 17.3794L5.6 9.88311L0 2.38688L1.4 0.512817L7 8.00906L12.6 0.512817L14 2.38688L8.4 9.88311L14 17.3794L12.6 19.2534L7 11.7572L1.4 19.2534Z" fill="#050505"/>
                    </svg>
                 </button>
            <div className="flex ml-5 mt-5">
            <figure className="w-40  rounded-full shadow-lg z-10 mb-[-50px]">
                    <img src={img} alt="Paws" className="rounded-full h-full w-full object-cover" style={{ borderRadius: '50%' }} />
                </figure>
                <h1 className="card-title ml-2 mr-5 mt-20">{name}</h1>
            </div>
            <div className="card mb-5 mx-5 bg-base-100 mt-5">
                <div className="card-body items-right text-right" style={{ textAlign: 'center' }}>
                    <div className="card-actions items-center justify-end">
                        <svg width="21" height="19" viewBox="0 0 21 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M16.3791 6.83521L12.0657 10.1386C11.2508 10.7475 10.1042 10.7475 9.28922 10.1386L4.93945 6.83521" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path fillRule="evenodd" clipRule="evenodd" d="M15.4143 17.9427C18.3668 17.9504 20.3566 15.6658 20.3566 12.8578V6.57818C20.3566 3.77024 18.3668 1.4856 15.4143 1.4856H5.88368C2.93126 1.4856 0.941406 3.77024 0.941406 6.57818V12.8578C0.941406 15.6658 2.93126 17.9504 5.88368 17.9427H15.4143Z" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    <span className="text-s pl-3">{email}</span>
                    </div>
                <div className="card-actions items-center justify-end">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <mask id="mask0_177_709" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect width="24" height="24" fill="#D9D9D9"/>
                    </mask>
                    <g mask="url(#mask0_177_709)">
                    <path d="M12.0002 23.3L8.6502 20H4.0002V15.35L0.700195 12L4.0002 8.64995V3.99995H8.6502L12.0002 0.699951L15.3502 3.99995H20.0002V8.64995L23.3002 12L20.0002 15.35V20H15.3502L12.0002 23.3ZM12.0002 20.5L14.5002 18H18.0002V14.5L20.5002 12L18.0002 9.49995V5.99995H14.5002L12.0002 3.49995L9.5002 5.99995H6.0002V9.49995L3.5002 12L6.0002 14.5V18H9.5002L12.0002 20.5Z" fill="#7B6F72"/>
                    </g>
                    </svg>

                <span className="text-s pl-3">{department.Name} - {designation}</span>
                
            </div>
            <div className="text-center mt-5">
            <p >Total cases resolved in the last month: {solvedCases}</p>
            
            </div>

            {!user ?<div className="card-actions items-center justify-end mt-5">
                    <button className="btn bg-[#811F19]  rounded-full" onClick={onRemove}>Remove Now</button>
            </div>:null}

            
            </div>
            
            </div>
            <style>{`
                .bg-custom {
                background-color: rgba(239, 229, 226, 1);
                }
                .close-btn {
                    position: absolute;
                    top: 5px;
                    right: 10px;
                    background-color: transparent;
                    border: none;
                    font-size: 20px;
                    cursor: pointer;
                  }
            `}</style>
            </div>

        );
      
}

export default MemberPopUp