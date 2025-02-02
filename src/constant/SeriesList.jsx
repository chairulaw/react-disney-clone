import { useEffect, useState, useRef } from "react"
import GlobalApi from "../api/GlobalApi"
import SeriesCard from "./SeriesCard"
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5"

const SeriesList = ({ genreId }) => {
  const [seriesList, setSeriesList] = useState([])
  const elementRef = useRef(null)

  const smoothScroll = (element, targetScroll) => {
    const startScroll = element.scrollLeft
    const distance = targetScroll - startScroll
    const duration = 500 // Smooth scroll duration
    let startTime = null

    const scrollStep = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const easing = (progress / duration) * (2 - progress / duration) // Ease-in-out
      const newScroll = startScroll + distance * easing
      element.scrollLeft = newScroll

      if (progress < duration) {
        window.requestAnimationFrame(scrollStep)
      } else {
        element.scrollLeft = targetScroll // Ensure it reaches the target
      }
    }

    window.requestAnimationFrame(scrollStep)
  }

  const slideRight = () => {
    if (elementRef.current) {
      smoothScroll(
        elementRef.current,
        Math.min(
          elementRef.current.scrollLeft + (window.innerWidth - 190),
          elementRef.current.scrollWidth - (window.innerWidth - 190),
        ),
      )
    }
  }

  useEffect(() => {
    getSeriesByGenreId()
  }, [])

  const getSeriesByGenreId = async () => {
    try {
      const response = await GlobalApi.getSeriesByGenreId(genreId)
      setSeriesList(response.data.results)
    } catch (error) {
      console.error("Error fetching series by genre ID:", error)
    }
  }

  const slideLeft = () => {
    if (elementRef.current) {
      smoothScroll(elementRef.current, Math.max(elementRef.current.scrollLeft - (window.innerWidth - 190), 0))
    }
  }

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      <IoChevronBackOutline
        onClick={slideLeft}
        className="absolute top-1/2 left-[-2.5rem] transform -translate-y-1/2 text-white text-4xl cursor-pointer z-20 hover:scale-110 transition-transform duration-200"
      />

      {/* Series List */}
      <div
        ref={elementRef}
        className="flex flex-row gap-8 overflow-x-auto scrollbar-none scroll-smooth py-4 px-2 relative z-10"
      >
        {seriesList.map((item) => (
          <SeriesCard key={item.id} series={item} />
        ))}
      </div>

      {/* Right Arrow */}
      <IoChevronForwardOutline
        onClick={slideRight}
        className="absolute top-1/2 right-[-2.5rem] transform -translate-y-1/2 text-white text-4xl cursor-pointer z-20 hover:scale-110 transition-transform duration-200"
      />
    </div>
  )
}

export default SeriesList

