import React from 'react'
import AdoptionList from '../../components/list-cards/AdoptionList'
import cat from '../../assets/cat.webp'
import { useNavigate } from 'react-router'
import { instance } from '../../../config/axios.config'
import { useState } from 'react'



interface Requests {
    Name: string
    Address: string
    ContactNumber : string
    AdoptionProfilesId : number
    AdoptionApplicationId : number


}



    
