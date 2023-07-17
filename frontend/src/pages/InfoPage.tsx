import React, { useState } from 'react';
import { useNavigate } from 'react-router'
import cat from '../assets/cat.webp'
import info from '../assets/Group 72.svg'
import InfoPageCard from '../components/list-cards/InfoPageCard'

function InfoPage() {



    const recentCases = [{
        img: cat,
        title: "How To Adopt A Cat",
        timePassed: "2",
        postedBy: "Usman W.",
        shortDescription: "Adopting a Cat is Good for You, Your Community, and the Cat!",
        longDescription: "Thousands of kittens are born each year, and many of them end up in shelters. In fact, an article on humanpro.org reports that over 3.2 million cats end up in shelters each year. And 27% end up euthanized. Many others end up living out their lives in shelters, never adopted.",
        link: "https://evidation.com/blog/adopting-a-cat-is-good-for-you-your-community-and-the-cat",

    },
    {
        img: cat,
        title: "How To Adopt A Dog",
        timePassed: "2",
        postedBy: "Usman W.",
        shortDescription: "5 REASONS TO ADOPT, NOT SHOP",
        longDescription: "Every year, approximately 6.5 million pets enter animal shelters nationwide, and 1.5 million become euthanized. And with the current shelter crisis, numbers are on the rise.",
        link: "https://greatergood.org/blog/misc/5-reasons-to-adopt-not-shop?utm_source=google&utm_medium=cpc&utm_term=01102023&utm_content=misc-pets-responsive-v1&utm_campaign=pets&utm_term=adopt%20dog&utm_campaign=Misc+Blogs+-+Planet&utm_source=adwords&utm_medium=ppc&hsa_acc=2430908076&hsa_cam=13924236408&hsa_grp=127025824716&hsa_ad=544411075627&hsa_src=g&hsa_tgt=kwd-15191542&hsa_kw=adopt%20dog&hsa_mt=b&hsa_net=adwords&hsa_ver=3&gclid=CjwKCAjw0N6hBhAUEiwAXab-TShEeVWuUHENjoT_YcvFyGPZcUPQphCbYv0tRT01UByProhg4DOOQxoCfBgQAvD_BwE",
    },
    ]




    const [email, setEmail] = useState('');
    const [privacy, setPrivacy] = useState(false);


    const navigate = useNavigate();


    const handleSubmit = (event: any) => {

        event.preventDefault()

        navigate('/user/add-report', { state: { rollId: email } });

        setEmail('')
        setPrivacy(false);


    };


    return (
        <div>
            <div className='mt-7'>
                <h1 className='text-5xl font-bold text-center py-5'>More On Pets!</h1>
            </div>

            <div className='flex justify-center md:h-96 overflow-hidden'>
                <img className='w-[75%]' src={info} />
            </div>

            <div className="max-w-lg mx-auto px-4 mt-10">

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-end" }}>
                    <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
                        Recent Articles
                    </span>
                    <span className='pb-1 underline text-[#811F19] font-bold'>See All</span>
                </div>
            </div>

            <div className="max-w-lg mx-auto px-4 mt-10">

                {recentCases.map((item, id) => {
                    return (
                        <InfoPageCard link={item.link} user={true} key={id} img={item.img} title={item.title} postedBy={item.postedBy} timePassed={item.timePassed} shortDescription={item.shortDescription} longDescription={item.longDescription} />
                    )
                })}
            </div>

        </div>


    );
};

export default InfoPage;
