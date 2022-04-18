import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useMatch, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { getPopularTv, getTopRatedTv, getTv, Show } from "../api"
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

const BigMovie = styled(motion.div)`
  position: fixed; 
  width: 40vw;
  height: 80vh;
  background-color: red; 
  top: 100px; 
  left: 0; 
  right: 0; 
  margin: 0 auto;
  border-radius: 15px;
  overflow: hidden;
  background-color:${props => props.theme.black.lighter};
`





const Tv = () => {
  const { data: todayTvData, isLoading: todayTvLoading } = useQuery<Show[]>(["tv", "today"], getTv)
  const { data: popTvData, isLoading: topMovieLoading } =
    useQuery<Show[]>(['tv', 'popular'], getPopularTv);
  const { data: topTvData, isLoading: upcomingLoading } =
    useQuery<Show[]>(['tv', 'topTvLoading'], getTopRatedTv);
  const bigTvMatch = useMatch(router.tvDetail)
  const navigate = useNavigate()
  const onOverlayClick = () => {
    navigate(router.tv)
  }
  const onBoxClicked = (id: number, layoutId: string, type?: string) => {
    navigate(`/tv/${id}?type=tv&layoutId=${layoutId}`)
  }
  const clickedTv = useMemo(() => {
    if (!bigTvMatch || !todayTvData || !popTvData || !topTvData) { return }
    const allTvShow = [...todayTvData, ...popTvData, ...topTvData]
    return allTvShow.find((movie) => movie.id === +bigTvMatch.params.id!)
  }, [bigTvMatch, todayTvData])
  return (
    <Wrapper>
      {todayTvLoading ? <Loader>Loading...</Loader> :
        <>
          {todayTvData &&
            <Banner
              title={todayTvData[0].title}
              overview={todayTvData[0].overview}
              image={todayTvData[0].backdrop_path}
            />}
          <AnimatePresence exitBeforeEnter >
            {todayTvData && <Slider onBoxClicked={onBoxClicked} title={"현재"} videos={todayTvData.slice(1)}></Slider>}
            {popTvData && <Slider onBoxClicked={onBoxClicked} title={"인기"} videos={popTvData}></Slider>}
            {topTvData && <Slider onBoxClicked={onBoxClicked} title={"최고 평점"} videos={topTvData}></Slider>}
            {bigTvMatch ? <>
              <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
              {clickedTv && <Modal type="movie" id={bigTvMatch.params.id!} title={clickedTv.title} image={makeImagePath(clickedTv.backdrop_path, "w500")} overview={clickedTv.overview} />}
            </> : null}
          </AnimatePresence>
        </>}
    </Wrapper >
  )
}
export default Tv