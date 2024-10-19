import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../pages/Home/Home"
import Filmes from "../pages/Filmes/Filmes"
import Animes from "../pages/Animes/Animes"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element = { <Home /> } />
                <Route path="/Filmes" element = { <Filmes /> } />
                <Route path="/Animes" element = { <Animes /> } />
            </Routes>
        </BrowserRouter>
    )
}



export default AppRoutes


