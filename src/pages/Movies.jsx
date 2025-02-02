import MovieList from "../constant/MovieList";
import GlobalApi from "../api/GlobalApi";
import GenreList from "../constant/GenreList";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import { useEffect, useState, useRef } from "react";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";
const screenWidth = window.innerWidth;

const Movies = () => {
  const [movieList, setMovieList] = useState([]);
  const elementRef = useRef(null);

  // Fetch trending movies on component mount
  useEffect(() => {
    getTrendingMovies();
  }, []);

  const getTrendingMovies = async () => {
    try {
      const response = await GlobalApi.getTrendingVideos();
      setMovieList(response.data.results);
    } catch (error) {
      console.error("Error fetching trending movies:", error);
    }
  };

  const smoothScroll = (element, targetScroll) => {
    const startScroll = element.scrollLeft;
    const distance = targetScroll - startScroll;
    const duration = 500; // Smooth scroll duration
    let startTime = null;

    const scrollStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const easing = (progress / duration) * (2 - progress / duration); // Ease-in-out
      const newScroll = startScroll + distance * easing;
      element.scrollLeft = newScroll;

      if (progress < duration) {
        window.requestAnimationFrame(scrollStep);
      } else {
        element.scrollLeft = targetScroll; // Ensure target reached
      }
    };

    window.requestAnimationFrame(scrollStep);
  };

  const slideRight = () => {
    if (elementRef.current) {
      elementRef.current.classList.remove("snap-x", "snap-mandatory");
      smoothScroll(
        elementRef.current,
        elementRef.current.scrollLeft + (screenWidth - 190)
      );

      setTimeout(() => {
        elementRef.current.classList.add("snap-x", "snap-mandatory");
      }, 500);
    }
  };

  const slideLeft = () => {
    if (elementRef.current) {
      elementRef.current.classList.remove("snap-x", "snap-mandatory");
      smoothScroll(
        elementRef.current,
        elementRef.current.scrollLeft - (screenWidth - 190)
      );

      setTimeout(() => {
        elementRef.current.classList.add("snap-x", "snap-mandatory");
      }, 500);
    }
  };

  return (
    <div>
      <section className="relative w-full">
        {/* Left Navigation Icon */}
        <HiChevronLeft
          className="text-white text-[2rem] absolute left-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
          onClick={slideLeft}
        />

        {/* Right Navigation Icon */}
        <HiChevronRight
          className="text-white text-[2rem] absolute right-4 top-1/2 transform -translate-y-1/2 z-20 cursor-pointer"
          onClick={slideRight}
        />

        {/* Slider Container */}
        <div
          ref={elementRef}
          className="flex overflow-x-auto w-full px-24 py-4 scrollbar-none snap-x snap-mandatory gap-x-5"
        >
          {movieList.map((movie) => {
            if (!movie.backdrop_path) return null;

            return (
              <div key={movie.id} className="relative min-w-full h-[50vh] snap-center group transition-transform duration-300 ease-in-out hover:scale-105  hover:z-10 ">
                <img
                  src={IMAGE_BASE_URL + movie.backdrop_path || "/placeholder.svg"}
                  alt={movie.title || "Movie Image"}
                  className="min-w-full h-[50vh] object-cover object-center rounded-xl snap-center"
                />
                <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-black to-transparent">
                  <p className="text-white text-xl font-bold mb-4 px-4 py-2 rounded-lg bg-black bg-opacity-50">
                    {movie.title || movie.name}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {/* END SLIDER SECTION */}

      {/* MOVIE LIST SECTION */}
      <section>
        <div>
          {GenreList.genres.map(
            (item, index) =>
              index < 100 && (
                <div className="p-8 mr-8 md:px-16">
                  <h2 className="text-[1.2rem] font-semibold">{item.Name}</h2>
                  <MovieList genreId={item.id} />
                </div>
              )
          )}
        </div>
      </section>
      {/* END MOVIELIST SECTION */}
    </div>
  );
};

export default Movies;
