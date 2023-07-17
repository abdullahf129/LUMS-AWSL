import React, { useEffect, useState } from 'react'
import cat from '../assets/cat.webp'
import CATalogCard from '../../components/catalog/CATalogCard'
import { instance } from "../../../config/axios.config"



function CATalogPage({ user = false }) {

    const [cats, setCats] = useState([])

    useEffect(() => {

        instance.get('/CATalogue')
            .then(function (response: any) {
                setCats(response.data.data)
                console.log(response.data.data);
                

            })
            .catch(function (error: any) {
                console.log(error);
            });
    }, [])


    return (
        <div style={{ backgroundColor: "#EBD6D1" }} className='rounded-lg pb-10'>
            <div className='flex justify-center items-center'>
                <h1 className='text-5xl font-bold text-center p-5'><span style={{ fontFamily: 'Delicious Handrawn' }}>CAT</span>alogue</h1>
                {!user ? <div className='flex justify-end mt-3 dropdown dropdown-end cursor-pointer'>
                    <svg tabIndex={1} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
                    <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a href='/admin/add-catalog'>Add</a></li>
                    </ul>
                </div> : null}
            </div>

            <div className='flex justify-center'>
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>

                    {cats.map((cat: any, index) => {
                        return (
                            <div key={cat.CATalogueId} className='flex w-full justify-center'><CATalogCard CATalogueId={cat.CATalogueId}  user={user} img={cat.Image} name={cat.Name} description={cat.LongDescription} age={cat.Age}  /></div>
                        )
                    })}

                </div>
            </div>








        </div>

    )
}

export default CATalogPage