import { useState, useEffect, useCallback } from "react"
import { debounce } from "lodash"
import GlobalApi from "../api/GlobalApi"
import GenreList from "../constant/GenreList"
import MovieList from "../constant/MovieList"

const SearchPages = () => {
  const [query, setQuery] = useState("")
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [isSearching, setIsSearching] = useState(false)

  const searchMovies = useCallback(async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([])
      setIsSearching(false)
      return
    }

    setLoading(true)
    setError(null)
    setIsSearching(true)

    try {
      const response = await GlobalApi.searchMovies(searchQuery)
      console.log("API Response:", response)

      setMovies(response.data.results)
      console.log("Parsed Data:", response.data)
    } catch (err) {
      console.error("Error fetching movies:", err)
      setError(`An error occurred while fetching movies: ${err.message || String(err)}`)
    } finally {
      setLoading(false)
    }
  }, [])

  const debouncedSearch = useCallback(
    debounce((query) => searchMovies(query), 300),
    [], // Corrected dependency array
  )

  useEffect(() => {
    debouncedSearch(query)
    return () => debouncedSearch.cancel()
  }, [query, debouncedSearch])

  return (
    <div>
    <section className="container mx-auto px-4 py-8">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for movies..."
        className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && <p className="mt-4 text-white">Loading...</p>}
      {error && <p className="mt-4 text-red-500">{error}</p>}

      {isSearching ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-8">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 ease-in-out duration-300"
            >
              <img
                src={movie.poster_path ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : "/placeholder.svg"}
                alt={movie.title}
                className="w-full h-auto aspect-[2/3] object-cover"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-white truncate">{movie.title}</h2>
                <p className="text-sm text-gray-400">
                  {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <section className="mt-16 w-mx-auto">
          <div>
            {GenreList.genres.map(
              (item, index) =>
                index < 100 && (
                  <div key={item.id} className="mt-14 mr-8 md:px-16">
                    <h2 className="text-[1.2rem] font-semibold">{item.Name}</h2>
                    <MovieList genreId={item.id} />
                  </div>
                ),
            )}
          </div>
        </section>
      )}
    </section>
    </div>
  )
}

export default SearchPages