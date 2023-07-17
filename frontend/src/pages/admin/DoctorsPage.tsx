import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import DoctorsCard from '../../components/list-cards/DoctorCard'
import map from '../../assets/GoogleMapTA.webp'
import { instance } from "../../../config/axios.config"
import { useState } from 'react'
import FilterComponent from '../../components/buttons/filter'

interface Doctor {
  DoctorId: number,
  Name: string,
  Address: string,
  Type: string,
  Contact: string,
}

function DoctorsPage({ user = false }) {



  const navigate = useNavigate();

  const handleAddDoctor = () => {
    navigate("/admin/add-doctor")

  }

  const handleDoctors = (event: any) => {
    event.preventDefault()

    instance.get('/doctors')
      .then(function (response: any) {
        console.log(response.data)
        setDoctors(response.data)

      })
      .catch(function (error: any) {
        console.log(error);
      });

  }

  const [doctors, setDoctors] = useState([{

    DoctorId: 1,
    Name: "Dr. Abdul Wahab",
    Address: 'House # 123, Street # 123, Sector # 123 Islamabad',
    Type: "Doctor",
    Contact: "0300-1234567",


  }])

  const [filteredDoctors, setFilteredDoctors] = useState<any>([])

  const [search, setSearch] = useState('')

  const handleSearch = (event: any) => {
    event.preventDefault()
    setSearch(event.target.value)
    setFilteredDoctors(doctors?.filter((doctor: any) => doctor.Name.toLowerCase().includes(search.toLowerCase())))

  }

  return (

    <div className='bg-white' onLoad={(e) => handleDoctors(e)}>

      <div className='md:h-96 overflow-hidden'>
        <img className='w-screen' src={map} />
      </div>


      <div className='mt-7'>
        <h1 className='text-5xl font-bold text-center py-5'>Doctors Near You</h1>

        <div className='my-7'>
          <FilterComponent onClick={() => console.log('filter')} options={[]} handleSearch={handleSearch} />
        </div>

        {!user ? <div className='flex justify-center mb-10'>

          <button className='bg-[#EFE5E2] text-[#813F31] font-bold py-2 px-4 rounded-full mb-5' onClick={handleAddDoctor}>Add a Doctor</button>
        </div> : null}


        <div className='flex justify-center w-full'>
          <div className='grid grid-cols-1 md:grid-cols-1  xl:grid-cols-3 w-full mx-5'>

            {(filteredDoctors?.length == 0)?doctors.map((item, id) => {
              return (
                <DoctorsCard user={user} key={id} doctorProfileId={item.DoctorId} name={item.Name} type={item.Type} contact={item.Contact} address={item.Address} />

              )

            }):filteredDoctors.map((item: any, id: any) => {
              return (
                <DoctorsCard user={user} key={id} doctorProfileId={item.DoctorId} name={item.Name} type={item.Type} contact={item.Contact} address={item.Address} />
              )
            })}

          </div>

        </div>

      </div>

    </div>
  )
}

export default DoctorsPage