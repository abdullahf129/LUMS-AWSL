import React from 'react'
import AnalysisCard from '../../components/analysis/AnalysisCard'
import StatCard from '../../components/analysis/StatCard'
import ReportCard from '../../components/list-cards/ReportCard'
import FilterButton from '../../components/buttons/filter'
import { useState } from 'react'
import person from '../../assets/cat.webp'
import { useEffect } from 'react'
import { instance } from "../../../config/axios.config"

function ReportPage({user =false}) {

  const [reports, setReports] = useState([{
    Image: person,
    IncidentId: 1,
    Title: "Iblees Sister",
    LocationId: 1,
    LocationDescription: "LUMS",
    Description: "Meow Meow Meow",
    ResolvedById: 1,
    CreatedAt: new Date(),

  }
  ])





  const handleReports = (event: any) => {
    event.preventDefault()

    instance.get('/incidents')
      .then(function (response: any) {

        console.log(response.data.data)
        setReports(response.data.data)


      })
      .catch(function (error: any) {
        console.log(error);
      });
    }

    useEffect(() => {
      // event.preventDefault()

      instance.get('/incidents')
        .then(function (response: any) {
  
          console.log(response.data.data)
          setReports(response.data.data)
  
  
        })
        .catch(function (error: any) {
          console.log(error);
        });
    }, [])



  return (
    <div className='bg-white' >
      {/* <StatCard /> */}

      <div style={{ backgroundColor: "#FFFFFF" }} className='rounded-lg mt-20 pb-10'>

        <form className="max-w-sm px-4 flex justify-between pb-5">
            <div className="relative mr-2">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute top-0 bottom-0 w-6 h-6 my-auto text-gray-400 left-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
                </svg>
                <input
                type="text"
                placeholder="Search"
                className="w-full py-3 pl-12 pr-4 text-gray-500 border rounded-md outline-none bg-gray-50 focus:bg-white focus:border-black"
                />
            </div>
            {/* <FilterButton></FilterButton> */}
        </form>




        
        <div className='flex justify-between'>
        
            <h1 className='text-2xl font-bold text-center p-5 pt-0' style={{ color: "#000000" }}>Reported Incidents</h1>
            {/* <a  href= "#" className='text-1xl font-bold text-center p-5 pt-0' style={{ color: "#813F31" }}> See All</a> */}
        </div>
        <div>
          {reports.map((item, key) => {


            let solved = 'Unsolved';

            if (item.ResolvedById !== null )  {
              solved = 'Solved';
            }



            const timeElapsed = Date.now()  - new Date(item.CreatedAt).getTime();

            const hoursElapsed = Math.floor(timeElapsed / 3600000);

            console.log(item.IncidentId)
            
            


            return <ReportCard key={key} user={user} incidentsId={item.IncidentId} img={item.Image} title={item.Title} status={solved} time={hoursElapsed} shortDescription={item.Description} locationid={item.LocationId} location={item.LocationDescription} />
          })}

        </div>




      </div>
    </div>
  )
}

export default ReportPage