import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";



const Wrapper = styled.div`
  position:relative;
  top:-100px;
  margin-bottom:300px;
`;

const Row = styled(motion.div)`
  display:grid;
  grid-template-columns:repeat(6, 1fr);
  gap:5px;
  margin-bottom: 10px;
  position: absolute;
  width:100%;
`;
const Box = styled(motion.div) <{ bgPhoto: string }>`
  background-color: white;
  background-image: url(${props => props.bgPhoto});
  background-size: cover;
  background-position:center center;
  height:200px;
  font-size: 64px;
  cursor: pointer;
  &:first-child{
    transform-origin:center left;
  }
  &:last-child{
    transform-origin:center right;
  }
`
const SliderTitle = styled.h2`
  font-size: 28px;
  font-weight: bold;
  padding: 5px 10px;
`
const Info = styled(motion.div)`
  padding:10px;
  background-color: ${(props) => props.theme.black.lighter};
  opacity:0;
  position:absolute;
  bottom:0;
  width:100%;
  h4{
    text-align: center;
    font-size: 18px;
  }
`
const rowVariants = {
  hidden: {
    x: window.outerWidth - 5
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.outerWidth
  },
}
const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.3,
    y: -50,
    transition: {
      duration: 0.3,
      delay: 0.3,
      type: "linear"
    }
  }
}

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      duration: 0.1,
      delay: 0.5,
      type: "linear"
    }
  }
}

const offset = 6;
interface video {
  id: number
  title?: string
  name?: string
  backdrop_path: string
  media_type: string
}
interface sliderProps {
  videos: video[]
  title: string
  onBoxClicked: (id: number, layoutId: string, type?: string,) => void
}
const Slider = ({ title, videos, onBoxClicked }: sliderProps) => {
  const [index, setIndex] = useState<number>(0)
  const [leaving, setLeaving] = useState(false)
  const totalVideos = useMemo(() => videos.length, [videos])
  const increaseIndex = () => {
    if (leaving) return
    const maxIndex = totalVideos ? Math.ceil((totalVideos! - 1) / offset) - 1 : 0
    setIndex((prev) => prev === maxIndex ? 0 : prev + 1)
  }
  const toggleLeaving = () => setLeaving(false)

  return (
    <Wrapper  >
      <SliderTitle onClick={increaseIndex}>{title}</SliderTitle>
      <AnimatePresence initial={false} onExitComplete={toggleLeaving}>
        <Row transition={{ type: "tween", duration: 1 }} key={index} variants={rowVariants} initial="hidden" animate="visible" exit="exit">
          {videos.slice(offset * index, offset * index + offset).map(video =>
            <Box variants={boxVariants}
              layoutId={title + video.id}
              transition={{ type: "linear" }}
              whileHover={"hover"}
              animate={"normal"}
              key={title + video.id}
              onClick={() => { onBoxClicked(video.id, title + video.id, video.media_type) }}
              bgPhoto={makeImagePath(video.backdrop_path, "w500")}
            >
              <Info variants={infoVariants} >
                <h4>{video.title || video.name}</h4>
              </Info>
            </Box>)}
        </Row>
      </AnimatePresence>
    </Wrapper>
  )
}

export default Slider