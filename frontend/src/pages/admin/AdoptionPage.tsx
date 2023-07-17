import React from 'react'
import AdoptionList from '../../components/list-cards/AdoptionList'
import cat from '../../assets/cat.webp'
import { useNavigate } from 'react-router'
import { instance } from '../../../config/axios.config'
import { useState ,useEffect} from 'react'



interface Adoption {
  img: any
  Name: string
  age: number
  month: number
  hobbies: string
  ShortDescription: string
  LongDescription: string


}



function AdoptionPage({ user = false, request=false }) {


  // Getting all adoptions requests:
  const handleAdoptions = () => {
    console.log("getting all adoptions")
    // event.preventDefault()

    instance.get('/adoptions')
      .then(function (response: any) {

        console.log("this is ur list : ",response.data)
        setAdoptions(response.data)


      })
      .catch(function (error: any) {
        console.log(error);
      });



  }

  useEffect(() => {
		handleAdoptions();
	}, []);

  const [adoptions, setAdoptions] = useState([{
    AdoptionPictures: [{
      AdoptionPicturesId: 1,
      AdoptionProfilesId: 1,
      PhotoName: null
    }],
    AdoptionProfileId: 1,
    Name: "Iblees Sister",
    Age: 2,
    months: 3,
    hobbies: "Sleeping",
    ShortDescription: "Meow Meow Meow",
    LongDescription: "Meow Meow Meow x2",

  }])



  const navigate = useNavigate();

  const handleAddAdoption = () => {

    
    navigate("/admin/add-adoption")

  }

  const handleViewRequests = () => {
    navigate("/admin/adoption-requests")

  }



  const imagePath = `${import.meta.env.VITE_IMAGES_PATH}/`;

  console.log('HIII')

  return (
    <div className='bg-white'>

      {/* <h3 className='text-xl md:text-4xl font-bolb text-center text-base-500 '>Am I </h3>
      <h1 className='text-xl md:text-4xl font-bold text-center '>Home Already?</h1> */}
      <h1 className='text-5xl font-bold text-center p-5'>Adoption</h1>

      


        {!user ? <div className='mt-10'>
        
          <div className='flex justify-between mt-10'>
            <button className='bg-[#EFE5E2] text-[#813F31] font-bold py-2 px-4 rounded-full ml-5' onClick={handleViewRequests}>View Requests</button>
            <button className='bg-[#EFE5E2] text-[#813F31] font-bold py-2 px-4 rounded-full mr-5' onClick={handleAddAdoption}>Add Adoption</button>

        </div>
      </div> : null}



      <div className='mt-5'>

      <div className='flex justify-center mt-3'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>

          {adoptions.map((item, id) => {

            // console.log('What I got',adoptions[id].AdoptionPictures)
            if (adoptions[id].AdoptionPictures.length === 0 || adoptions[id].AdoptionPictures[0].PhotoName === null) {

              return <AdoptionList user={user} request={request} key={id}  adoptionprofilesid={item.AdoptionProfileId} name={item.Name} years={item.Age} shortDescription={item.ShortDescription} longDescription={item.LongDescription} />
            }

            const im = adoptions[id].AdoptionPictures       
            
            const imageUrls = adoptions[id].AdoptionPictures.map((image) => image.PhotoName ?? "").filter(Boolean);
            // console.log(imageUrls)


            return <AdoptionList user={user} request={request} key={id} img={imageUrls} adoptionprofilesid={item.AdoptionProfileId} name={item.Name} years={item.Age} shortDescription={item.ShortDescription} longDescription={item.LongDescription} />
          })}

          
        {/* <img src={`${imagePath}adoptionimgs-1680349521010-983513518.jpg`} alt="My Image" /> */}


        </div>
      </div>



      {/* <AdoptionList /> */}
    </div>
    </div>
  )
  
}

export default AdoptionPage