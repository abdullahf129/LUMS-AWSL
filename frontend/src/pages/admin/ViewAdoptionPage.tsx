import React from 'react'
import AdoptionList from '../../components/list-cards/AdoptionList'
import cat from '../../assets/alex-cat.jpg'
import { useNavigate } from 'react-router'
import { instance } from '../../../config/axios.config'
import { useState, useEffect } from 'react'
import FilterComponent from '../../components/buttons/filter'
import ViewAdoptionList from '../../components/list-cards/ViewAdoptionList'
import cat2 from '../../assets/cat.webp'


interface PendingAdoption {
  img: string;
  AdoptionApplicationId: number;
  AdoptionProfileId: number;
  AdoptionProfile: {
    [key: string]: any;
  };
  Name: string;
  Age: number;
  email: string;
  Address: string;
  Contact: string;
  CreatedAt: string;
  hobbies: string;
  ShortDescription: string;
  LongDescription: string;
}


function ViewAdoptionApplicationPage({ user = false }) {


  const [pendingAdoptions, setPendingAdoptions] = useState<PendingAdoption[]>([]);


  // Getting all adoptions requests:
  useEffect(() => {
    // event.preventDefault()


    instance.get('/adoptions/applications/')
      .then(function (response: any) {
        console.log(response.data.applications);
  

        setPendingAdoptions(response.data.applications)
   
      })
      .catch(function (error: any) {
        console.log(error);
      })
    },[]);

 


  const [filteredDoctors, setFilteredDoctors] = useState<any>([])

  const [search, setSearch] = useState('')
  const [deleteAction , setDeleteAction] = useState(false)

  const handleSearch = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
    setFilteredDoctors(pendingAdoptions?.filter((pendingAdoption: any) => pendingAdoption.Name.toLowerCase().includes(search.toLowerCase())))

  }

  

  return (
    <div className='bg-white'>
     
      <h1 className='text-5xl font-bold text-center p-5'>Adoption</h1>
      <FilterComponent onClick={() => console.log('filter')} options={[]} handleSearch={handleSearch} />
    
    <div>
          {(filteredDoctors?.length == 0)?pendingAdoptions.map((item, key) => {       
          return <ViewAdoptionList key={key} user={false} img={item.AdoptionProfile.AdoptionPictures[0].PhotoName} Address = {item.Address} contact = {item.Contact} requestId= {item.AdoptionApplicationId} name={item.Name} email={item.email} timePassed={item.CreatedAt}  actionValue = {deleteAction} action = {setDeleteAction} />
          }):filteredDoctors.map((item: any, key: any) => {
            return <ViewAdoptionList key={key} user={false} img = {item.AdoptionProfile.AdoptionPictures[0].PhotoName} Address = {item.Address} contact = {item.Contact} requestId= {item.AdoptionApplicationId} name={item.Name} email={item.email} timePassed={item.CreatedAt}  actionValue = {deleteAction} action = {setDeleteAction} />
          })
            
          }

    </div>
        </div>
  )
}

export default ViewAdoptionApplicationPage