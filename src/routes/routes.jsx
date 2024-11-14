import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home/Home";
import Filmes from "../pages/Filmes/Filmes";
import Animes from "../pages/Animes/Animes";
import Search from "../pages/Search/Search";
import Details from "../pages/Details/Details";
import Player from "../pages/Player/Player";
import Login from "../pages/Login/Login"; // Certifique-se de que o caminho está correto
import Register from "../pages/Register/Register"; // Certifique-se de que o caminho está correto

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/Filmes" element={<Filmes />} />
                <Route path="/Animes" element={<Animes />} />
                <Route path="/Search" element={<Search />} />
                <Route path="/Details" element={<Details />} />
                <Route path="/Player" element={<Player />} />
                <Route path="/login" element={<Login />} /> {/* Adicionando rota para Login */}
                <Route path="/register" element={<Register />} /> {/* Adicionando rota para Register */}
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;
