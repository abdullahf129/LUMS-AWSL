import React, { useState } from 'react';
import DepartmentPopUp from '../popups/DepartmentPopUp';
import catt from '../../assets/cat.webp';
import { instance } from '../../../config/axios.config';
import { useNavigate } from 'react-router';



interface DepartmentCard {
  img: any;
  DepartmentsId : number;
  Name: string;
  Director: string;
  Description: string;
  MemberCount: number;

}

function DepartmentCard({ img = catt, DepartmentsId=1, Name = 'Fostering', Director = 'Hamza', Description = 'We deal in Meo issues', MemberCount = 12, }) {

  const [showPopUp, setShowPopUp] = useState(false);

  const handleClick = () => {
    setShowPopUp(true);
  };

  const handlePopupClose = () => {
    setShowPopUp(false);
  };

  const handleDropdownClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  const navigate =useNavigate()

  const handleDelete = () => {
    // console.log('delete');
    instance.delete(`/departments/${DepartmentsId}/`, {
     
    })
        .then(function (response: any) {
            // console.log(response);
            alert(response.data.message)
            navigate("/admin/departments", { replace: true })
            window.location.reload()

        })
        .catch(function (error: any) {
            alert(error.response.message.data)
            console.log(error);
        });
  };


  return (
    <>
      <div onClick={handleClick} className="card bg-base-100 shadow-xl my-2 cursor-pointer">

        <div className=" flex justify-end dropdown  dropdown-end bg-transparent " onClick={handleDropdownClick}>
        <svg tabIndex={0} xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 mt-2" viewBox="0 0 512 512"><path d="M56 472a56 56 0 1 1 0-112 56 56 0 1 1 0 112zm0-160a56 56 0 1 1 0-112 56 56 0 1 1 0 112zM0 96a56 56 0 1 1 112 0A56 56 0 1 1 0 96z" /></svg>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
                <li><a className='cursor-pointer' onClick={handleDelete}>Delete</a></li>
            </ul>
        </div>

        <figure>
          <img src={img} alt={Name} />
        </figure>
        


        <div className="card-body">
          <h2 className="card-title">
            {Name}
            <div className="badge badge-secondary">{MemberCount}</div>
          </h2>
          <p>{Description}</p>
        </div>
      </div>


      {showPopUp && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setShowPopUp(false)}
          ></div>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-20">
            <DepartmentPopUp img={img} name={Name} director={Director} description={Description} memberCount={MemberCount} onClose={handlePopupClose}/>
          </div>
        </>
      )}
    </>
  );
}

export default DepartmentCard;
