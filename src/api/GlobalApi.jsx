import axios from "axios"

const movieBaseUrl = "https://api.themoviedb.org/3"
const api_key = "f452bf27427ee5547a5c20022531cb2b"

const GlobalApi = {

  // MOVIES API
  getMovieByGenreId: (id) => {
    return axios.get(`${movieBaseUrl}/discover/movie`, {
      params: {
        api_key: api_key,
        with_genres: id,
      },
    })
  },

  getTrendingVideos: () => {
    return axios.get(`${movieBaseUrl}/trending/all/day`, {
      params: {
        api_key: api_key,
      },
    })
  },


  // SEARCH MOVIES API
  searchMovies: (searchQuery) => {
    return axios.get(`${movieBaseUrl}/search/movie`, {
      params: {
        api_key: api_key,
        query: encodeURIComponent(searchQuery),
      },
    })
  },



// SERIES API
  getSeriesByGenreId: (id) => {
    return axios.get(`${movieBaseUrl}/discover/tv`, {
      params: {
        api_key: api_key,
        with_genres: id,
      },
    })
  },
  
  // DISNEY ORIGINALS API
  getDisneyPlusOriginals: () => {
    return axios.get(`${movieBaseUrl}/discover/tv`, {
      params: {
        api_key: api_key,
        with_networks: 2739, // Disney+ network ID
      },
    });
  },

  getTrendingSeries: () => {
    return axios.get(`${movieBaseUrl}/trending/tv/week`, {
      params: {
        api_key: api_key,
      },
    })
  },
}


export default GlobalApi

