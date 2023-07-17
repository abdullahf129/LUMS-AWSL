import React from 'react'
import CATalogPopup from '../components/popups/CATalogPopups'
import DepartmentPopUp from '../components/popups/DepartmentPopUp'
import DoctorPopup from '../components/popups/DoctorPopup';
import ReportCard from '../components/list-cards/ReportCard';

function Test() {
    const departmentData = {
        img: 'department-image.png',
        name: 'Department Name',
        director: 'Department Director',
        description: 'Department Description',
        memberCount : 5
      };

    const CATalogueData = {

        // img: an
        // name: string
        // years : number
        // month : number
        // hobbies : string 
        // description: string
    }



    


  return (
    <div>
        {/* <CATalogPopup></CATalogPopup> */}
        <ReportCard></ReportCard>
        {/* <DepartmentPopUp{...departmentData}></DepartmentPopUp> */}
        <DoctorPopup></DoctorPopup>
    </div>
    

  )
}

export default Test