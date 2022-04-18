import { motion } from "framer-motion";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getMovieDetail, getTvDetail, IDetailResult } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled(motion.div)`
  position: fixed; 
  width: 40vw;
  height: 80vh;
  top: 100px; 
  left: 0; 
  right: 0; 
  margin: 0 auto;
  border-radius: 15px;
  overflow: scroll;
  background-color: ${(props) => props.theme.black.darker};
`
const BigCover = styled.div`
  width:100%;
  height:400px;
  background-size:cover;
  background-position: center center;
`;
const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 46px;
  position: relative;
`;

const BigOverview = styled.p`
  position: relative;
  color: ${(props) => props.theme.white.lighter};
  font-weight:bold;
`;

const GenreList = styled.ul`
  display: flex;
  gap:10px;
`
const Genre = styled.li`
  color: ${(props) => props.theme.white.lighter};
  background-color: orange;
  padding: 5px 10px;
  border-radius:10px;
`
const ModalContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap:30px;
  padding:20px 20px;
  top:-80px;
  overflow:scroll;
`

const Companies = styled.ul`
display: flex;
flex-wrap: wrap;
padding:20px;
border-radius: 3px;
background-color: rgba(200,200,200,0.8);
gap:10px;
`
const Company = styled.li`
img {
  width:100px;
}
h3{
  font-weight: bold;
  color:black;
}
`
const Budget = styled.div`
  h3 {
    font-weight: bold;
  }
`
const Popularities = styled.div``

interface modalProp {
  id: string
  title: string,
  overview: string,
  image: string,
  type: "movie" | "tv"
}


const Modal = ({ id, title, overview, image }: modalProp) => {
  const [searchParams, _] = useSearchParams();
  const type = useMemo(() => searchParams.get('type'), [searchParams])
  const { data, isLoading } = useQuery<IDetailResult>([type, 'detail'],
    () => { return type === "tv" ? getTvDetail(id) : getMovieDetail(id) })

  return <Wrapper layoutId={id} >
    <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${image})` }} />
    <ModalContent>
      <BigTitle>{title}</BigTitle>
      <BigOverview>{overview || data?.overview}</BigOverview>
      {isLoading && "Loading...."}
      {data && <>
        <GenreList>
          {data.genres?.map(genre => <Genre key={genre.id}>{genre.name}</Genre>)}
        </GenreList>
        {data.budget && data.budget !== 0 ? <Budget>
          <h3>제작 비용</h3>
          <p>{data.budget.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</p>
        </Budget> : null}
        {data.popularity && <Popularities>
          인기: {data.popularity}
        </Popularities>}
        {data.production_companies ? <Companies>
          {data.production_companies?.map(company =>
            <Company key={company.id}>
              {company.logo_path ? <img src={makeImagePath(company.logo_path, "w200")} alt="" /> : <h3>{company.name}</h3>}
            </Company>
          )}
        </Companies> : null}

      </>}

    </ModalContent>


  </Wrapper>
}

export default Modal