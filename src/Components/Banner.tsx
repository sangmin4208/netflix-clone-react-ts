import styled from "styled-components"
import { makeImagePath } from "../utils"



const Wrapper = styled.div<{ bgPhoto: string }>`
  height:100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),
    url(${props => props.bgPhoto});
  background-size: cover;
`
const Title = styled.h1`
  font-size: 68px;
  margin-bottom: 20px;
`
const Overview = styled.p`
  font-size: 36px;
  width:50%;
`

interface bannerProps {
  title: string,
  image: string,
  overview: string
}
const Banner = ({ title, image, overview }: bannerProps) => {

  return <Wrapper bgPhoto={makeImagePath(image)}>
    <Title>{title}</Title>
    <Overview>{overview}</Overview>
  </Wrapper>
}

export default Banner