import React from 'react'
import catt from '../../assets/cat.webp'
import { instance } from "../../../config/axios.config"
import { useNavigate } from 'react-router'

interface CATalogCard {
    CATalogueId: number,
    img: any
    name: string
    speciality: string
    phone: string
    address: string
}

function CATalogCard({ user = false, CATalogueId = 1, img = catt, name = "Iblees Sister", age = "3", description = "Likes to play ball" }) {

    const navigate = useNavigate()

    const deleteCat = () => {

        instance.delete(`/CATalogue/delete/${CATalogueId}/`, {


        })
            .then(function (response: any) {
                console.log(response);
                alert(response.data.message)


                navigate("/admin/catalog", { replace: true })
                window.location.reload()

            })
            .catch(function (error: any) {
                console.log(error);
            });

    };


    return (
        <>
            <div className="card w-96 bg-base-100 shadow-xl m-3">

                {!user ? <div className='flex justify-end mt-3 dropdown dropdown-end'>
                    <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512"><path d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z" /></svg>
                    <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li><a onClick={deleteCat}>Delete</a></li>
                    </ul>

                </div> : null}
                <figure><img src={`/uploads/${img}`} alt={name} /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {name}
                        <div className="badge badge-secondary">{age}y</div>
                    </h2>
                    <p>{description}</p>
                </div>
            </div>
        </>
    )
}

export default CATalogCard
