import React from 'react'
import { useNavigate } from 'react-router-dom'
import person from '../../assets/cat.webp'
import DepartmentPopUp  from '../../components/popups/DepartmentPopUp'
import DepartmentCard from '../../components/list-cards/DepartmentCard'
import { instance } from '../../../config/axios.config'
import { useState } from 'react'

function DepartmentPage() {

  const navigate = useNavigate();

  const [departments, setDepartments] = useState([{
    DepartmentId: 1,
    Name: "CS",


  }])

  const handleAddDeparment = () => {
    navigate("/admin/add-department")
  }


  const handleDepartments = () => {
    // Add remove function here
    instance.get(`/departments`)

      .then(function (response: any) {
        // console.log(response);
        setDepartments(response.data)
      }
      )
      .catch(function (error: any) {
        console.log(error);
      }
      )


  }

  return (
    <div style={{ backgroundColor: "#EBD6D1" }} className='rounded-lg mt-20 pb-10' onLoad={handleDepartments}>
      <div className='flex justify-evenly items-center '>
        <h1 className='text-5xl font-bold text-center p-5'>Departments</h1>
        <div className='flex justify-end mt-3 dropdown dropdown-end cursor-pointer'>
          <svg tabIndex={1} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512"><path d="M240 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H176V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H384c17.7 0 32-14.3 32-32s-14.3-32-32-32H240V80z" /></svg>
          <ul tabIndex={1} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
            <li><a className='cursor-pointer' onClick={handleAddDeparment}>Add</a></li>
          </ul>
        </div>
      </div>

      <div className='flex justify-center mt-10 mx-4 flex-wrap '>
        <div className='w-1/2 '>
          <div className="flex justify-center flex-wrap">
            {departments.map((department, key) => (
              <DepartmentCard key={key} DepartmentsId={department.DepartmentId} Name={department.Name} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DepartmentPage