import React, { useState } from 'react';
import ImageInput from '../../components/buttons/image-input';
import SubmitButton from '../../components/buttons/submit';
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'


interface Department {

    departmentId : number;
    name: string;
 
  }




  function AddDepartment(){

    const navigate = useNavigate();

    const handleSubmit = (event: any) => {

        event.preventDefault()

        instance.post('/departments/new', { 
            'Name': name,

        })
            .then(function (response: any) {
                // console.log(response);

                alert(response.data.message)

                navigate('/admin/departments', { replace: true })
                // window.location.reload();

            }
            )
            .catch(function (error: any) {
                // console.log(error.response); 
                alert(error.response.data.message)
            });

        setName('')


    }




    const [name,setName] = useState<string>('');




    return (
        <div className='bg-white'>

            <h1 className='flex-1 text-xl md:text-4xl font-bold text-center mt-10'>Add a AWSL Department</h1>


            <div className='flex justify-center mx-5 mt-10'>
                <input type="text" placeholder="Name" className="input input-md input-bordered w-full max-w-xs mt-5" onChange={(event) => setName(event.target.value)} required />
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


export default AddDepartment;


