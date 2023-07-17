import React, { useState } from 'react';
import ImageInput from '../../components/buttons/image-input';
import SubmitButton from '../../components/buttons/submit';
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'


interface Doctor {

    doctorProfileId : number;
    name: string;
    address: string;
    type : string;
    contact : string;
  
  
  }




  function AddDoctorPage(){

    const navigate = useNavigate();

    const handleSubmit = (event: any) => {

        event.preventDefault()

        instance.post('/doctors/create', {
            'Name': name,
            'Address': address,
            'Type': type,
            'Contact': contact
        })
            .then(function (response: any) {
                console.log(response);

                alert(response.data.message)

                navigate('/admin/doctors', { replace: true })

            }
            )
            .catch(function (error: any) {
                console.log(error.response);
                alert(error.response.data.message)
            });

        setName('')
        setAddress('')
        setType('')
        setContact('')

    }




    const [name,setName] = useState<string>('');
    const [contact,setContact] = useState<string>('');
    const [address,setAddress] = useState<string>('');
    const [type,setType] = useState<string>('');



    return (
        <div className='bg-white'>

            <h1 className='flex-1 text-xl md:text-4xl font-bold text-center mt-10'>Add a Doctor</h1>


            <div className='flex justify-center mx-5'>
                <input type="text" placeholder="Name" className="input input-md input-bordered w-full max-w-xs mt-5" onChange={(event) => setName(event.target.value)} />
            </div>

            <div className='flex justify-center mx-5'>
                <input type="text" placeholder="Address" className="input input-md input-bordered w-full max-w-xs mt-5" onChange={(event) => setAddress(event.target.value)} />
            </div>

            <div className='flex justify-center mx-5'>
                <input type="text" placeholder="Type" className="input input-md input-bordered w-full max-w-xs mt-5" onChange={(event) => setType(event.target.value)} />
            </div>

            <div className='flex justify-center mx-5'>
                <input type="text" placeholder="Contact" className="input input-md input-bordered w-full max-w-xs mt-5" onChange={(event) => setContact(event.target.value)} />
            </div>

            <div className="flex justify-center items-center">
                <button
                    className="bg-[#811F19] text-white font-medium my-10 py-2 px-4 rounded-3xl w-2/6"
                    onClick={(e) => handleSubmit(e)}>
                    Submit
                </button>
            </div>





        </div>
    );

  }


export default AddDoctorPage;


