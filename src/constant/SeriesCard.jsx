import React from 'react'
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const SeriesCard = ({series}) => {
  return (
    <>
    
    <img 
  src={IMAGE_BASE_URL + series.poster_path} 
  className="
    w-[6.8rem] 
    md:w-[12.5rem] 
    mt-2 
    object-cover 
    object-center 
    rounded-md 
    shadow-gray-800 
    cursor-pointer 
    transition-transform 
    duration-300 
    ease-in-out 
    hover:scale-110 
    hover:z-50 
    hover:border-4 
    hover:border-gray-800 
    focus:outline-none 
    focus:ring-4 
    focus:ring-gray-600
  " 
  alt="Series Poster"
/>

    </>
  )
}

export default SeriesCard