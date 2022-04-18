import { useSearchParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion"
import { useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useMatch, useNavigate } from "react-router-dom"
import styled from "styled-components"
import { searchAll, Show } from "../api"
import Slider from "../Components/Slider"
import { makeImagePath } from "../utils"
import router from "./router"
import Modal from "../Components/Modal";

const Wrapper = styled.div`
  background: black;
  padding:60px;
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



const SliderContainer = styled.section`
position: relative;
top:150px;
`
const SearchResult = styled.h2`
  margin-top:20px;
  font-size: 28px;
`
const Search = () => {
  const [searchParams, _] = useSearchParams();
  const keyword = useMemo(() => searchParams.get('keyword'), [searchParams])
  const { data, isLoading } = useQuery<Show[]>(['search', keyword], () =>
    searchAll(keyword)
  );
  const movies = useMemo(() => {
    return data?.filter(show => show.media_type === "movie")
  }, [data])
  const tvs = useMemo(() => {
    return data?.filter(show => show.media_type === "tv")
  }, [data])
  const keywordMatch = useMatch(router.searchDetail)
  const navigate = useNavigate()
  const onBoxClicked = (id: number, type?: string) => {
    if (type) return navigate(`/search/${id}?keyword=${keyword}&type=${type}`)
    navigate(`/search/${id}?keyword=${keyword}`)
  }
  const onOverlayClick = () => {
    navigate(router.search + `?keyword=${keyword}`)
  }
  const clickedShow = useMemo(() => {
    if (!keywordMatch || !data) { return }
    return data.find((show) => show.id === +keywordMatch.params.id!)
  }, [keywordMatch, data])
  return (
    <Wrapper>
      <SearchResult>{keyword} 검색 결과</SearchResult>
      {isLoading ? <Loader>Loading...</Loader> :
        <>
          <SliderContainer>
            {movies && <Slider onBoxClicked={onBoxClicked} title={"영화"} videos={movies.slice(1)}></Slider>}
            {tvs && <Slider onBoxClicked={onBoxClicked} title={"드라마"} videos={tvs}></Slider>}
          </SliderContainer>

          <AnimatePresence>
            {keywordMatch ? <>
              <Overlay onClick={onOverlayClick} exit={{ opacity: 0 }} animate={{ opacity: 1 }} />
              {clickedShow && <Modal type="movie" id={keywordMatch.params.id!} title={clickedShow.title} image={makeImagePath(clickedShow.backdrop_path, "w500")} overview={clickedShow.overview} />}
            </> : null}
          </AnimatePresence>
        </>}
    </Wrapper >
  )
}
export default Search
