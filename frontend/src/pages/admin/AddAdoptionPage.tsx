import React, { useState } from 'react';
import ImageInput from '../../components/buttons/image-input';
import SubmitButton from '../../components/buttons/submit';
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'



interface Adoption {

    img: File[]
    type: string
    location: string
    name: string
    age : number
    shortDescription: string
    longDescription: string
    AdoptionProfilesId: number;
  
  
  }

function AddAdoption(){



    const handleImageChange = (file: File) => {
        setAdoption({ ...adoption, img: [...adoption.img, file] });
      };

    const [adoption, setAdoption] = useState<Adoption>({
        name: '',
        type : '',
        age: 0,
        location: '',
        shortDescription: '',
        longDescription: '',
        AdoptionProfilesId: 0,
        img : []

    });

    const navigate = useNavigate();

    const handleAddAdoption = (event: any) => {
        event.preventDefault()

        let data = new FormData();

        for (let i = 0; i < adoption.img.length; i++) {
            data.append('adoptionimgs', adoption.img[i]);
        }

        data.append('name', adoption.name);
        data.append('age', adoption.age.toString());
        data.append('type', adoption.type);
        data.append('location', adoption.location);
        data.append('shortDescription', adoption.shortDescription);
        data.append('longDescription', adoption.longDescription);

        


        

        instance.post('/adoptions/create', data, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
            .then(function (response: any) {
                console.log(response);
                alert(response.data.message)

                navigate('/admin/adoption', { replace: true })

            }
            )
            .catch(function (error: any) {
                console.log(error.response);
                alert(error.response.data.message)
            }
            );

        setAdoption({
            name: '',
            type : '',
            age: 0,
            location: '',
            shortDescription: '',
            longDescription: '',
            AdoptionProfilesId: 0,
            img: []
        })

    };

    return (
        <div>
            <h1 className='flex-1 text-xl md:text-4xl font-bold text-center mt-10 '>Adding a Adoption Profile</h1>

            <div className='flex flex-col items-center mt-10'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_177_869" maskUnits="userSpaceOnUse" x="0" y="12" width="17" height="8">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.996094 12.3669H16.8332V19.3107H0.996094V12.3669Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_177_869)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.91571 13.7794C4.65545 13.7794 2.49583 14.4687 2.49583 15.8294C2.49583 17.2024 4.65545 17.8983 8.91571 17.8983C13.175 17.8983 15.3336 17.209 15.3336 15.8483C15.3336 14.4753 13.175 13.7794 8.91571 13.7794M8.91571 19.3107C6.95705 19.3107 0.996094 19.3107 0.996094 15.8294C0.996094 12.7257 5.5163 12.3669 8.91571 12.3669C10.8744 12.3669 16.8333 12.3669 16.8333 15.8483C16.8333 18.952 12.3141 19.3107 8.91571 19.3107" fill="#7B6F72" />
                                    </g>
                                    <mask id="mask1_177_869" maskUnits="userSpaceOnUse" x="3" y="0" width="12" height="11">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.60547 0.599854H14.2236V10.599H3.60547V0.599854Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_177_869)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.91558 1.94406C6.77496 1.94406 5.03326 3.58349 5.03326 5.59958C5.02626 7.60908 6.75496 9.24757 8.88659 9.2551L8.91558 9.92745V9.2551C11.0552 9.2551 12.7959 7.61473 12.7959 5.59958C12.7959 3.58349 11.0552 1.94406 8.91558 1.94406M8.91557 10.5988H8.88358C5.96209 10.5904 3.5955 8.3464 3.6055 5.59675C3.6055 2.8424 5.98708 0.599365 8.91557 0.599365C11.8431 0.599365 14.2236 2.8424 14.2236 5.59958C14.2236 8.35676 11.8431 10.5988 8.91557 10.5988" fill="#7B6F72" />
                                    </g>
                                </svg>

                            </div>
                            <input type='name' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Name'
                                onChange={(event) => setAdoption({ ...adoption, name: event.target.value })} required

                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="17" height="20" viewBox="0 0 17 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <mask id="mask0_177_869" maskUnits="userSpaceOnUse" x="0" y="12" width="17" height="8">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M0.996094 12.3669H16.8332V19.3107H0.996094V12.3669Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask0_177_869)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.91571 13.7794C4.65545 13.7794 2.49583 14.4687 2.49583 15.8294C2.49583 17.2024 4.65545 17.8983 8.91571 17.8983C13.175 17.8983 15.3336 17.209 15.3336 15.8483C15.3336 14.4753 13.175 13.7794 8.91571 13.7794M8.91571 19.3107C6.95705 19.3107 0.996094 19.3107 0.996094 15.8294C0.996094 12.7257 5.5163 12.3669 8.91571 12.3669C10.8744 12.3669 16.8333 12.3669 16.8333 15.8483C16.8333 18.952 12.3141 19.3107 8.91571 19.3107" fill="#7B6F72" />
                                    </g>
                                    <mask id="mask1_177_869" maskUnits="userSpaceOnUse" x="3" y="0" width="12" height="11">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3.60547 0.599854H14.2236V10.599H3.60547V0.599854Z" fill="white" />
                                    </mask>
                                    <g mask="url(#mask1_177_869)">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M8.91558 1.94406C6.77496 1.94406 5.03326 3.58349 5.03326 5.59958C5.02626 7.60908 6.75496 9.24757 8.88659 9.2551L8.91558 9.92745V9.2551C11.0552 9.2551 12.7959 7.61473 12.7959 5.59958C12.7959 3.58349 11.0552 1.94406 8.91558 1.94406M8.91557 10.5988H8.88358C5.96209 10.5904 3.5955 8.3464 3.6055 5.59675C3.6055 2.8424 5.98708 0.599365 8.91557 0.599365C11.8431 0.599365 14.2236 2.8424 14.2236 5.59958C14.2236 8.35676 11.8431 10.5988 8.91557 10.5988" fill="#7B6F72" />
                                    </g>
                                </svg>

                            </div>
                            <input type='text' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Animal Type'
                                onChange={(event) => setAdoption({ ...adoption, type: event.target.value })} required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7648 6.86377L12.4515 10.1671C11.6365 10.776 10.4899 10.776 9.67496 10.1671L5.3252 6.86377" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8001 17.9713C18.7525 17.979 20.7424 15.6943 20.7424 12.8864V6.60674C20.7424 3.7988 18.7525 1.51416 15.8001 1.51416H6.26942C3.317 1.51416 1.32715 3.7988 1.32715 6.60674V12.8864C1.32715 15.6943 3.317 17.979 6.26942 17.9713H15.8001Z" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input type='number' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Age'
                                onChange={(event) => setAdoption({ ...adoption, age: Number(event.target.value) })} required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7648 6.86377L12.4515 10.1671C11.6365 10.776 10.4899 10.776 9.67496 10.1671L5.3252 6.86377" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8001 17.9713C18.7525 17.979 20.7424 15.6943 20.7424 12.8864V6.60674C20.7424 3.7988 18.7525 1.51416 15.8001 1.51416H6.26942C3.317 1.51416 1.32715 3.7988 1.32715 6.60674V12.8864C1.32715 15.6943 3.317 17.979 6.26942 17.9713H15.8001Z" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input type='string' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Location'
                                onChange={(event) => setAdoption({ ...adoption, location: event.target.value })} required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7648 6.86377L12.4515 10.1671C11.6365 10.776 10.4899 10.776 9.67496 10.1671L5.3252 6.86377" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8001 17.9713C18.7525 17.979 20.7424 15.6943 20.7424 12.8864V6.60674C20.7424 3.7988 18.7525 1.51416 15.8001 1.51416H6.26942C3.317 1.51416 1.32715 3.7988 1.32715 6.60674V12.8864C1.32715 15.6943 3.317 17.979 6.26942 17.9713H15.8001Z" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input type='text' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Short Description'
                                onChange={(event) => setAdoption({ ...adoption, shortDescription: event.target.value })} required
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col items-center mt-5'>
                <div className='flex items-center w-2/3'>
                    <div className='flex-1 relative'>
                        <div className='flex items-center space-x-3 bg-[#0000000A] rounded-lg border-2 px-5  py-2'>
                            <div className='text-gray-400'>
                                <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.7648 6.86377L12.4515 10.1671C11.6365 10.776 10.4899 10.776 9.67496 10.1671L5.3252 6.86377" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15.8001 17.9713C18.7525 17.979 20.7424 15.6943 20.7424 12.8864V6.60674C20.7424 3.7988 18.7525 1.51416 15.8001 1.51416H6.26942C3.317 1.51416 1.32715 3.7988 1.32715 6.60674V12.8864C1.32715 15.6943 3.317 17.979 6.26942 17.9713H15.8001Z" stroke="#7B6F72" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                            <input type='text' className='flex-1 bg-transparent focus:outline-none px-5 w-full' placeholder='Long Description'
                                onChange={(event) => setAdoption({ ...adoption, longDescription: event.target.value })} required
                            />
                        </div>
                    </div>
                </div>
            </div>
            


            <ImageInput onChange={handleImageChange} required />
            <ImageInput onChange={handleImageChange} required />
            <ImageInput onChange={handleImageChange} required/>
            <ImageInput onChange={handleImageChange} required />




            <div className="flex justify-center items-center">
                <button
                    className="bg-[#811F19] text-white font-medium my-10 py-2 px-4 rounded-3xl"
                    onClick={(e) => handleAddAdoption(e)}
                >
                    Add Profile
                </button>
            </div>











        </div>
    )


















}

export default AddAdoption;