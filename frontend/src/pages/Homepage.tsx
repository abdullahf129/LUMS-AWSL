import React, { useEffect } from 'react'
import cat1 from '../assets/pexels-francesco-ungaro-96938.jpg'
import cat2 from '../assets/pexels-pixabay-416160.jpg'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router'
import { Navigate } from 'react-router'
import cat from '../assets/cat.webp'
import { MainSegment } from '../components/home-page/MainSegment'
import { instance } from "../../config/axios.config"



function Homepage() {

  const [segment, setSegment] = React.useState([

  ])

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/user/report");

  }

  useEffect(() => {

    instance.get("/homepage/").then((res) => {
      setSegment(res.data.data)
      console.log(res.data.data)

    }).catch((err) => {
      console.log(err);

    })

  }, [])

  return (
    <div>
      <div className="hero min-h-screen box" style={{ backgroundImage: `url(${cat1})` }}>
        <div className="hero-overlay bg-opacity-60"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">The Animal Welfare Society</h1>
            <p className=" text-xl mb-5">Welcomes You Towards Change On Campus</p>

            <motion.button whileHover={{
              scale: 1.2,
              transition: { duration: 0.2 },
            }}
              whileTap={{ scale: 0.9 }}
              className="btn bg-[#811F19] hover:bg-[#811F19]" onClick={handleClick} >Report Incident</motion.button>

          </div>
        </div>
      </div>

      <div className='segments-group'>

      {segment.map((item: any, key) => {
          return (
            <MainSegment key={key} caption={item.caption} see_all_link={item.see_all_link} items={item.items} />
          )
        })
        }

        {/* <MainSegment caption={'Recent Cases'} see_all_link='/user/report' items={[
          {
            img: cat,
            title: "How To Adopt A Cat",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a cat and I want to adopt another one. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"

          },
          {
            img: cat,
            title: "How To Groom A Dog",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a dog and I want to groom him. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"
          },
        ]} />

        <MainSegment caption={'CATalogue'} see_all_link='/user/catalog' items={[
          {
            img: cat,
            title: "How To Adopt A Cat",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a cat and I want to adopt another one. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"

          },
          {
            img: cat,
            title: "How To Groom A Dog",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a dog and I want to groom him. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"
          },
        ]} />

        <MainSegment caption={'Adoption'} see_all_link='/user/adoption' items={[
          {
            img: cat,
            title: "How To Adopt A Cat",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a cat and I want to adopt another one. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"

          },
          {
            img: cat,
            title: "How To Groom A Dog",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a dog and I want to groom him. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"
          },
        ]} />

        <MainSegment caption={'Doctors'} see_all_link='/user/doctors' items={[
          {
            img: cat,
            title: "How To Adopt A Cat",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a cat and I want to adopt another one. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"

          },
          {
            img: cat,
            title: "How To Groom A Dog",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a dog and I want to groom him. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"
          },
        ]} />

        <MainSegment caption={'Pet Information'} see_all_link='/pet-care' items={[
          {
            img: cat,
            title: "How To Adopt A Cat",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a cat and I want to adopt another one. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"

          },
          {
            img: cat,
            title: "How To Groom A Dog",
            timePassed: "2",
            postedBy: "Anony",
            shortDescription: "I have a dog and I want to groom him. How do I do that?",
            longDescription: "I have a cat and I want to adopt another one. How do I do that? I have a cat and I want to adopt another one. How do I do that?"
          },
        ]} /> */}

      </div>
    </div>
  )
}

export default Homepage