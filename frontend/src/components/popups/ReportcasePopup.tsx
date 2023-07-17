import React from 'react'
import cat  from '../../assets/alex-cat.jpg'
import { instance } from '../../../config/axios.config'


interface ReportcasePopup {
    id: number
    user : boolean;
    img: any
    title: string
    status :string
    time : any 
    postedBy : any
    locationId : number
    locationDescription : any
    shortDescription: string  
    onClose: () => void
}





function ReportcasePopup({ id=2,user =false, img = cat, title = "Coco", time = 2 , postedBy='User',status='Unsolved' ,locationId=1, locationDescription = "Playful, Loves Yarn Balls", shortDescription = " I love fish. My fav feeding spot is PDC. My enemy is Mark. I love my territory you HUMANS!",onClose}: ReportcasePopup) {
   
    const handleClickResolve = (event:any) => {
        event.preventDefault()

        const memberId = localStorage.getItem('userId');


        instance.post(`/incidents/resolve/${id}`, { memberId })
            .then(function (response: any) {
            console.log(response.data);
            alert(response.data.message)
            })
            .catch(function (error: any) {
            console.log(error);
            alert(error.response.data.message)
            });

    }







    return (




        <div className="card  bg-[#EBD6D1] shadow-xl w-96">

        



            <figure className="px-7 pt-10 -mb-20 z-20">
                <img src={`/uploads/${img}`} alt="Shoes" className="rounded-xl object-cover h-72 w-full" />
            </figure>

            <div className="card-body items-left text-left bg-[#F6EFE3] rounded-xl mx-4 pt-20 pb-10 mb-5">
            <div className="flex justify-between">
                <p className="text-gray-800 text-2xl mt-2 font-bold">{title}</p>
                <p className="text-red-400 mt-3 underline  text-right ">{status}</p>
                
            </div>
            <div className="flex justify-between">
            <p className="text-gray-800 mt-2 font-bold underline">{locationDescription}</p>
            <p className="text-gray-400 text-right">{time} ago </p>
            
            </div>
            <p className="text-gray-800">{locationId}</p>
            <p className="text-gray-800 mt-2">{shortDescription}</p>
            
        

        <div className="flex justify-between mt-3">
        <button onClick={handleClickResolve} className="p-1 px-4 mr-1 ml-2 bg-[green]  text-white rounded-lg">
            Resolve Case
        </button>
        <button onClick={onClose} className="p-1 px-4 mr-1 ml-2 bg-white  text-[#6c2c2c] rounded-lg">
            Back
        </button>
        </div>
        </div>



    </div>
    



  )
}

export default ReportcasePopup
















