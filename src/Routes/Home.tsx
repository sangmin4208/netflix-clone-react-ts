import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useMatch, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getMovies, Show, topMovies, upcomingMovie } from "../api"
import Banner from "../Components/Banner"
import Modal from "../Components/Modal"
import Slider from "../Components/Slider"
import { makeImagePath } from "../utils"
import router from "./router"

const Wrapper = styled.div`
  background: black;
`
const Loader = styled.div`
  height:20vh;
  display:flex;
  justify-content: center;
  align-items:center;
`


const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100vw;
  height:100vh;
  background-color: rgba(0,0,0,0.5);
  opacity:0;
`






const Home = () => {
  const { data: nowPlayingMovieData, isLoading: nowPlayingMovieLoading } = useQuery<Show[]>(["movies", "nowPlaying"], getMovies)
  const { data: topMovieData, isLoading: topMovieLoading } =
    useQuery<Show[]>(['movie', 'topMovie'], topMovies);
  const { data: upcomingData, isLoading: upcomingLoading } =
    useQuery<Show[]>(['movie', 'upcoming'], upcomingMovie);
  const bigMovieMatch = useMatch(router.movies)
  const navigate = useNavigate()
  const onBoxClicked = (movieId: number, layoutId: string) => {
    navigate(`/movies/${movieId}?type=movie&layoutId=${layoutId}`)
  }

  const onOverlayClick = () => {
    navigate(router.home)
  }
  const clickedMovie = useMemo(() => {
    if (!bigMovieMatch || !nowPlayingMovieData || !upcomingData || !topMovieData) { return }
    const allMovies = [...nowPlayingMovieData, ...topMovieData, ...upcomingData]
    return allMovies.find((movie) => movie.id === +bigMovieMatch.params.id!)
  }, [bigMovieMatch, nowPlayingMovieData])
  return (
    <Wrapper>
      {nowPlayingMovieLoading ? <Loader>Loading...</Loader> :
        <>
          {nowPlayingMovieData &&
            <Banner
              title={nowPlayingMovieData[0].title}
              overview={nowPlayingMovieData[0].overview}
              image={nowPlayingMovieData[0].backdrop_path}
            />}
          <AnimatePresence exitBeforeEnter >
            {nowPlayingMovieData && <Slider onBoxClicked={onBoxClicked} title={"?????? ??????"} videos={nowPlayingMovieData.slice(1)}></Slider>}
            {topMovieData && <Slider onBoxClicked={onBoxClicked} title={"?????? ??????"} videos={topMovieData}></Slider>}
            {upcomingData && <Slider onBoxClicked={onBoxClicked} title={"?????? ??????"} videos={upcomingData}></Slider>}
            {bigMovieMatch ? <>
              <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
              {clickedMovie && <Modal type="movie" id={bigMovieMatch.params.id!} title={clickedMovie.title} image={makeImagePath(clickedMovie.backdrop_path, "w500")} overview={clickedMovie.overview} />}
            </> : null}
          </AnimatePresence>
        </>}
    </Wrapper >
  )
}
export default Home