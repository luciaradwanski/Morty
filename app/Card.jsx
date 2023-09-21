'use client'
import React from 'react'
import {BsFillArrowThroughHeartFill} from 'react-icons/bs'

const Card = ({name, status, image}) => {
    return (
        <div className='w-[300px] h-[450px] rounded-8 shadow-md overflow-hidden m-2 text-center transition-all duration-250 bg-black text-white hover:-translate-y-1 hover:shadow-lg rounded-lg dark:bg-white dark:text-black'>
            <h2 className='font-semibold pb-6'>{name}</h2>
            <img className='w-[300px]' src={image} alt='img not found' />
            
            <div className='flex flex-row justify-center items-center gap-6 mt-4'>
                <BsFillArrowThroughHeartFill className='animate-ping'/>
                <h3 className='font-medium'>{status}</h3>
            </div>   
        </div>
    )
}

export default Card;