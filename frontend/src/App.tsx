import { AdminNavbar } from './components/navbar/AdminNavbar'
import { UserNavbar } from './components/navbar/UserNavbar'
import { MemberNavbar } from './components/navbar/MemberNavbar'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/Homepage'
import DoctorsPage from './pages/admin/DoctorsPage'
import AdoptionPage from './pages/admin/AdoptionPage'
import CATalogPage from './pages/admin/CATalogPage'
import MembersPage from './pages/admin/MembersPage'
import DepartmentPage from './pages/admin/DepartmentPage'
import AnalysisPage from './pages/admin/AnalysisPage'
import Test from "./pages/Test"
import Menu from "./pages/MenuPage"
import ReportPage from './pages/Report'
import LoginPage from './pages/admin/LoginPage'
import AddMemberPage from './pages/admin/AddMemberPage'
import LogoutPage from './pages/LogoutPage'
import AddAdoptionPage from './pages/admin/AddAdoptionPage'
import AddDoctorPage from './pages/admin/AddDoctorPage'
import AdoptionRequestPage from './pages/user/AdoptionRequestPage'
import AddRequestAdoption from './pages/user/AddRequestAdoption'
import AddDepartment from './pages/admin/AddDepartment'
import RecentReports from './pages/admin/RecentReportsPage'
import { useSelector, useDispatch } from 'react-redux'
import { ActorSlice } from './redux/ActorSlice'
import AddReportPage from './pages/AddReport'
import ViewAdoptionApplicationPage from './pages/admin/ViewAdoptionPage'
import AddCATaloguePage from './pages/admin/AddCatalogue'
import LocationPage from './pages/admin/LocationPage'
import AddLocationPage from './pages/admin/AddLocationPage'
import InfoPage from './pages/InfoPage'
import AdminMenuPage from './components/navbar/AdminMenu'
import MemberMenuPage from './components/navbar/MemberMenu'
import { useEffect, useState } from 'react'





export const App = () => {

  const actor = useSelector((state: any) => state.actor.value)

  return (
    <div>

      {!actor?<UserNavbar />: actor === 'admin' ? <AdminNavbar /> : <MemberNavbar /> }
   

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/test" element={<Test />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/pet-care" element={<InfoPage />} />


        <Route path="/admin">
          <Route path="login" element={<LoginPage />} />
          <Route path="doctors" element={<DoctorsPage />} />
          <Route path="adoption" element={<AdoptionPage />} />
          <Route path="catalog" element={<CATalogPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="departments" element={<DepartmentPage />} />
          <Route path="analysis" element={<AnalysisPage />} />
          <Route path="report" element={<ReportPage />} />
          <Route path="add-member" element={<AddMemberPage />} />
          <Route path="add-adoption" element={<AddAdoptionPage />} />
          <Route path="adoption-requests" element={<ViewAdoptionApplicationPage />} />
          <Route path="add-doctor" element={<AddDoctorPage />} />
          <Route path="add-catalog" element={<AddCATaloguePage />} />
          <Route path="add-department" element={<AddDepartment />} />
          <Route path="emergency" element={<RecentReports />} />
          <Route path="locations" element={<LocationPage/>} />
          <Route path="add-locations" element={<AddLocationPage/>} />
          <Route path="Menu" element={<AdminMenuPage/>} />

        </Route>



        <Route path="/user">
          <Route path="catalog" element={<CATalogPage user={true} />} />
          <Route path="adoption" element={<AdoptionPage user={true} request={false} />} />
          <Route path="members" element={<MembersPage user={true} />} />
          <Route path="doctors" element={<DoctorsPage user={true} />} />

          <Route path="Menu" element={<Menu/>} />
          <Route path="report" element={<ReportPage/>} />
          <Route path="add-report" element={<AddReportPage />} />
          <Route path="see-reports" element={<RecentReports user={true}/>} />
          <Route path="request-adoption" element={<AdoptionRequestPage />} />
          <Route path="add-adoption-request" element={<AddRequestAdoption />} />
          




        </Route>

        <Route path="/awsl-member">
          <Route path="report" element={<ReportPage />} />
          <Route path="catalog" element={<CATalogPage user={true} />} />
          <Route path="doctors" element={<DoctorsPage user={true} />} />
          <Route path="members" element={<MembersPage user={true} />} />
          <Route path="emergency" element={<RecentReports />} />
          <Route path="adoption" element={<ViewAdoptionApplicationPage />} />
          <Route path="login" element={<LoginPage member={true} />} />
          <Route path="Menu" element={<MemberMenuPage/>} />

        </Route>


        <Route path="*" element={<h1>404 Not Found</h1>} />
      </Routes>

    </div>
  )
}
