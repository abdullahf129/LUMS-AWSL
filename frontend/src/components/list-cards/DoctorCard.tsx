import React from 'react'
import cat from '../../assets/cat.webp'
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'
import DoctorPopup from '../popups/DoctorPopup'
import { useState } from 'react'


interface DoctorCard {


    img: any
    doctorProfileId: number
    name: string
    speciality: string
    phone: string
    address: string
}

function DoctorCard({ user = false, doctorProfileId = 1, img = cat, name = "Dr. Shahid Ismail", type = "Dermatologist", contact = "+92-333-1234437", address = "Saadi Commercial" }) {





    const navigate = useNavigate()



    const deleteDoctor = () => {

        instance.delete(`/doctors/${doctorProfileId}/`, {


        })
            .then(function (response: any) {
                console.log(response);
                alert(response.data.message)


                navigate("/admin/doctors", { replace: true })
                window.location.reload()

            })
            .catch(function (error: any) {
                console.log(error);
            });

    };

    const [showPopup, setShowPopup] = useState(false);


    const handlePopUpToggle = () => {
        setShowPopup(!showPopup);
    };







    return (

        <div className='flex flex-row justify-center mb-10 cursor-pointer' onClick={handlePopUpToggle}>


            {showPopup && (
                <div className="fixed top-0 left-0 w-full h-full bg-gray-500 opacity-75 z-10"></div>
            )}

            <div className='flex-1 xl:flex md:flex xs:flex-row justify-center xl:pl-5 w-72'>
                <div className="flex justify-center avatar xs:m-5" >

                    <div className="flex justify-center w-32 xs:w-32 rounded-full">
                        <img  src={img} />
                    </div>
                </div>

                <div className="card bg-base-100 shadow-xl" style={{ backgroundColor: "#EBD6D1" }}>
                    {!user ? <div className='flex justify-end mt-3 dropdown dropdown-end cursor-pointer' onClick={(e) => e.stopPropagation()}>
                        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512"><path d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z" /></svg>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                            <li><a onClick={deleteDoctor}>Delete</a></li>
                        </ul>

                    </div> : null}
                    <div className="card-body w-64 ">
                        <h2 className="card-title inline-block">{name}</h2>
                        <div className='indicator'>
                            <p className='primary text-slate-700 inline-block w-1/2'>{type}</p>
                        </div>

                        <div className="indicator mt-3">
                            <svg aria-hidden="true" focusable="false" className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="1em" height="1em"><path d="M493.4 24.6l-104-24c-11.3-2.6-22.9 3.3-27.5 13.9l-48 112c-4.2 9.8-1.4 21.3 6.9 28l60.6 49.6c-36 76.7-98.9 140.5-177.2 177.2l-49.6-60.6c-6.8-8.3-18.2-11.1-28-6.9l-112 48C3.9 366.5-2 378.1.6 389.4l24 104C27.1 504.2 36.7 512 48 512c256.1 0 464-207.5 464-464 0-11.2-7.7-20.9-18.6-23.4z" /></svg>
                            <span className="text-s pl-3 inline-block">{contact}</span>
                        </div>
                        <div className="indicator ">
                            <svg aria-hidden="true" focusable="false" className="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" width="1.25em" height="1.25em"><path d="M192 48c0-26.5 21.5-48 48-48H400c26.5 0 48 21.5 48 48V512H368V432c0-26.5-21.5-48-48-48s-48 21.5-48 48v80H192V48zM48 96H160V512H48c-26.5 0-48-21.5-48-48V320H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V224H80c8.8 0 16-7.2 16-16s-7.2-16-16-16H0V144c0-26.5 21.5-48 48-48zm544 0c26.5 0 48 21.5 48 48v48H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80v64H560c-8.8 0-16 7.2-16 16s7.2 16 16 16h80V464c0 26.5-21.5 48-48 48H480V96H592zM312 64c-8.8 0-16 7.2-16 16v24H272c-8.8 0-16 7.2-16 16v16c0 8.8 7.2 16 16 16h24v24c0 8.8 7.2 16 16 16h16c8.8 0 16-7.2 16-16V152h24c8.8 0 16-7.2 16-16V120c0-8.8-7.2-16-16-16H344V80c0-8.8-7.2-16-16-16H312z" /></svg>
                            <span className=" text-s h-10  pl-3 inline-block w-2/3">{address}</span>
                        </div>
                    </div>
                </div>
            </div>





            {showPopup && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 ">


                    <DoctorPopup
                        img={img}
                        name={name ? name : name}
                        occupation={type}
                        address={address}
                        contact={contact}
                    />

                </div>
            )}
        </div >
    )
}

export default DoctorCard