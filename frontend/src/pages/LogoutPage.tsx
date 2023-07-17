import React, { useState } from 'react';
import ImageInput from '../components/buttons/image-input';
import SubmitButton from '../components/buttons/submit';
import { instance } from "../../config/axios.config"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setActor } from '../redux/ActorSlice'

function LogoutPage() {


    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();

    const handleSubmit = (event: any) => {

        event.preventDefault()

        instance.post('/admin/logout', {
            'email': email,
            'password': password
        })
            .then(function (response: any) {
                console.log('response', response);

                navigate('/', { replace: true })
                window.location.reload()

                alert(response.data.message)
                
            })
            .catch(function (error: any) {
                console.log('error', error?.response?.data?.message);
            });

    };


    return (
        <div>

            <button className='px-5'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
                </svg>
            </button>

            <h1 className='flex-1 text-xl md:text-4xl font-bold text-center mt-10 '>Logout</h1>
            <p className='text-center'>
                Are you sure you want to logout?
            </p>

            <div className="flex justify-center items-center">
                <button
                    className="bg-[#811F19] text-white font-medium my-10 py-2 px-4 rounded-3xl w-2/6"
                    onClick={(e) => handleSubmit(e)}>
                    Logout
                </button>
            </div>

        </div>
    );
};

export default LogoutPage;
