import React, { useState } from 'react';
import ImageInput from '../../components/buttons/image-input';
import SubmitButton from '../../components/buttons/submit';
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { setActor } from '../../redux/ActorSlice'


interface Member {
    img: any,
    name: string;
    department: string,
    designation: string,
    rollNumber: string;

}

function LoginPage({member=false}) {

    const actor = useSelector((state: any) => state.actor.value)
    const dispatch = useDispatch()

    const [login, setLogin] = useState('');


    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();


    const handleSubmit = (event: any) => {

        event.preventDefault()

        if (!member) {

        instance.post('/admin/login', {
            'email': email,
            'password': password
        })
            .then(function (response: any) {

                dispatch(setActor('admin'))
                setLogin(response.data.message)
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('actor', 'admin');

                navigate('/admin/analysis', { replace: true })

            })
            .catch(function (error: any) {
                console.log(error.response);
                alert(error.response.data.message)
            });

        } else {            
            console.log(email, password);
            
            instance.post('/members/login', {
                'email': email,
                'password': password

            })
                .then(function (response: any) {

                    dispatch(setActor('member'))
                    setLogin(response.data.message)
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('actor', 'awsl-member');
                    
                    navigate('/', { replace: true })

                }
                )
                .catch(function (error: any) {
                    console.log(error.response);
                    alert(error.response.data.message)
                }
                );

        }



        setEmail('')
        setPassword('')

    };


    return (
        <div>

            <h1 className='flex-1 text-xl md:text-4xl font-bold text-center mt-10'>Login</h1>

            {login ? <div className="flex justify-center alert alert-success shadow-lg mt-5">
                <div className='items-center'>
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>{login}</span>
                </div>
            </div> : null}

            <div className='flex bg-white justify-center mx-5'>
                <span className="indicator-item badge">Required</span>
                <input type="text" placeholder="Your Email" className="input input-md input-bordered w-full max-w-xs mt-5 bg-white" onChange={(event) => setEmail(event.target.value)} />
            </div>

            <div className='flex bg-white justify-center mx-5'>
                <span className="indicator-item badge">Required</span>
                <input type="password" placeholder="Your Password" className="input input-md input-bordered w-full max-w-xs mt-5 bg-white" onChange={(event) => setPassword(event.target.value)} />
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
};

export default LoginPage;
