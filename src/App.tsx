import { BrowserRouter, Route, Router, Routes } from "react-router-dom"
import Header from "./Components/Header"
import Home from "./Routes/Home"
import router from "./Routes/router"
import Search from "./Routes/Search"
import Tv from "./Routes/Tv"

function App() {

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={router.home} element={<Home />}></Route>
        <Route path={router.movies} element={<Home />}></Route>
        <Route path={router.tv} element={<Tv />}></Route>
        <Route path={router.tvDetail} element={<Tv />}></Route>
        <Route path={router.search} element={<Search />}></Route>
        <Route path={router.searchDetail} element={<Search />}></Route>
      </Routes>
    </BrowserRouter >
  )
}

export default App
