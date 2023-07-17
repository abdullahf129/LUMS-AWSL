import { useNavigate } from 'react-router'
import MemberList from '../../components/list-cards/MemberList'
import MemberPopUp from '../../components/popups/MemberPopUp'
import LocationCard from '../../components/list-cards/LocationCard'
import { instance } from "../../../config/axios.config"
import person from '../../assets/cat.webp'
import { useState } from 'react'
import { useEffect } from 'react'


function LocationPage({user =false}) {

  interface LocationList {
    img: any,
    name: string,
    locationId : number 
  }

  const handlelocations = (event: any) => {
    event.preventDefault()

    instance.get('/locations')
      .then(function (response: any) {

        
        setlocations(response.data.data)


      })
      .catch(function (error: any) {
        console.log(error);
      });
      
  }
  
  
  const [locations, setlocations] = useState([{
    Name: "Pepsi Dying Coke",
    LocationId : 1
  }
  ])

  const [deleteAction , setDeleteAction] = useState(false);

  useEffect(()=>{

      instance.get('/locations')
        .then(function (response: any) {
  
          
          setlocations(response.data.data)
  
  
        })
        .catch(function (error: any) {
          console.log(error);
        });

  
  }, [deleteAction])



  const navigate = useNavigate();

  const handleAddLocation = () => {
    navigate("/admin/add-locations")

  }


  return (
    <div className='bg-white' onLoad={(e) => handlelocations(e)}>


      <div className='rounded-lg mt-20 pb-10 flex justify-between items-center'>
        <h1 className='text-xl md:text-4xl font-bold text-left p-5 text-[#813F31]'>Incident Locations</h1>
        {!user ? < button className='bg-[#EFE5E2] text-[#813F31] font-bold py-2 px-4 rounded-full mr-5' onClick={handleAddLocation}>Add Location</button>: null}
      </div>

      <div className='mt-5'>

        {locations.map((item, id) => {
          return <LocationCard id = {item.LocationId} name = {item.Name} actionValue = {deleteAction} setAction = {setDeleteAction}/>
        })}

      </div>
    </div>


  )
}

export default LocationPage