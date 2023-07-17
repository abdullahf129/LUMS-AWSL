import React from 'react'
import HomeSegments from '../list-cards/HomeSegments'
import { useNavigate } from 'react-router'
import cat from '../../assets/cat.webp'

interface Props {
    caption: string;
    see_all_link: string;
    items: {
        img: any;
        title: string;
        shortDescription: string;
        longDescription: string;
        postedBy: string;
        timePassed: string;
    }[];
}

export const MainSegment = ({ caption, see_all_link, items }: Props) => {

    const navigate = useNavigate();


    return (
        <div>
            <div className='segment'>
                <div className="max-w-lg mx-auto px-4 mt-10">

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: "flex-end" }}>
                        <span style={{ fontWeight: 'bold', fontSize: '24px' }}>
                            {caption}
                        </span>
                        <span className='pb-1 underline text-[#811F19] font-bold cursor-pointer' onClick={() => navigate(see_all_link)}>See All</span>
                    </div>
                </div>

                <div className="max-w-lg mx-auto px-4 mt-10">

                    {items?.map((item: any, id: any) => {

                        return (
                            <HomeSegments user={true} key={id} img={item?.img || item?.Image || item?.AdoptionPictures?.[0]?.PhotoName } title={item?.title || item?.Name} postedBy={item?.postedBy} timePassed={item?.timePassed} shortDescription={item?.shortDescription || item?.ShortDescription || item?.Type} longDescription={item?.longDescription || item?.LongDescription || item?.Address} />
                        )
                    })}
                </div>
            </div>
            <div className='divider'></div>
        </div>
    )
}
