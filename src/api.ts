const API_KEY = '8ab900821b609fea06077e7066635b87'
const BASE_PATH = 'https://api.themoviedb.org/3'

export interface Show {
  id: number
  backdrop_path: string
  overview: string
  poster_path: string
  title: string
  name?: string
  media_type: string
}

interface Genre {
  id: number
  name: string
}
interface Company {
  id: number
  logo_path: string
  name: string
}
interface Langauge {
  english_name: string
}
export interface IDetailResult {
  budget?: number
  genres: Genre[]
  popularity: number
  production_companies: Company[]
  spoken_languages: Langauge
  vote_average: number
  vote_count: number
  overview: string
}

export function getMovies(): Promise<Show[]> {
  return fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}&page=1`).then(
    (response) => response.json().then((shows) => shows.results)
  )
}

export function topMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&page=1`).then(
    (response) => response.json().then((shows) => shows.results)
  )
}
export function upcomingMovie() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&page=1`).then(
    (response) => response.json().then((shows) => shows.results)
  )
}
export function getMovieDetail(movieId: string): Promise<IDetailResult> {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  )
}
export function getTvDetail(tvId: string): Promise<IDetailResult> {
  return fetch(`${BASE_PATH}/tv/${tvId}?api_key=${API_KEY}`).then((response) =>
    response.json()
  )
}

export function getTv(): Promise<Show[]> {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&page=1`).then(
    (response) =>
      response
        .json()
        .then((shows) =>
          shows.results.map((show: Show) => ({ ...show, title: show.name }))
        )
  )
}
export function getPopularTv() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&page=1`).then(
    (response) =>
      response
        .json()
        .then((shows) =>
          shows.results.map((show: Show) => ({ ...show, title: show.name }))
        )
  )
}
export function getTopRatedTv() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&page=1`).then(
    (response) =>
      response
        .json()
        .then((shows) =>
          shows.results.map((show: Show) => ({ ...show, title: show.name }))
        )
  )
}

export function searchAll(keyword: string | null) {
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`)
    .then((response) => response.json())
    .then((shows) =>
      shows.results.map((show: Show) => {
        if (!show.title) {
          return {
            ...show,
            title: show.name,
          }
        } else {
          return show
        }
      })
    )
}
