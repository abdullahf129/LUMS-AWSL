import React, { useState, useEffect } from 'react'
import AnalysisCard from '../../components/analysis/AnalysisCard'
import StatCard from '../../components/analysis/StatCard'
import { instance } from "../../../config/axios.config"


function AnalysisPage() {

  const [cards, setCards] = useState([{ title: "", value: 0}])


  useEffect(() => {

    instance.get('/admin/analysis')
      .then(function (response: any) {
        setCards(response.data.data)
        console.log(response.data.data);


      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, [])

  // const analysis = [{
  //   title: "Reports",
  //   value: 60,

  // },
  // {
  //   title: "Animals",
  //   value: 20,
  // },
  // {
  //   title: "Area",
  //   value: 70,
  // }]

  return (
    <div>
      {/* <StatCard /> */}

      <div style={{ backgroundColor: "#EBD6D1" }} className='rounded-lg mt-20 pb-10'>
        <h1 className='text-5xl font-bold text-center p-5' style={{ color: "#813F31" }}>Data Analysis</h1>
        <div className='mt-5'>

          {cards?.map((item, key) => {
            return <AnalysisCard key={key} title={item.title} value={item.value} />
          })}

        </div>




      </div>
    </div>
  )
}

export default AnalysisPage