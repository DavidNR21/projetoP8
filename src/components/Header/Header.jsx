import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './stylesHeader.css';

function Header() {

    const [searchText, setSearchText] = useState('');
    const [menuOpen, setMenuOpen] = useState(false); // Estado para controlar o menu
    const navigation = useNavigate()

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Buscar:', searchText)
            navigation(`/Search/?q=${searchText}`)
        }
    };

    const handleChange = (event) => {
        setSearchText(event.target.value);
    };

    const toggleMenu = () => {
        setMenuOpen(!menuOpen); // Alterna o estado do menu
    };

    return (
        <div className='header'>
            <h2 className='logo' onClick={() => navigation(`/`)}>
                Senpai Animes
            </h2>

            {/* nav */}
            <div className={`navbar ${menuOpen ? 'open' : ''}`}> {/* Adiciona classe condicional */}
                <div className='navbar-link' onClick={() => navigation(`/Filmes`)}>
                    Filmes
                </div>
                <div className='navbar-link' onClick={() => navigation(`/Animes`)}>
                    Animes
                </div>
                <div className='navbar-link' onClick={() => navigation(`/Generos`)}>
                    Gêneros
                </div>
            </div>

            {/* search */}
            <div className='search'>
                <input 
                    placeholder='Buscar Filme ou Anime' 
                    type="text" 
                    name="search" 
                    id="searchText" 
                    value={searchText} 
                    onChange={handleChange} 
                    onKeyDown={handleKeyDown}
                />
                <i className='bx bx-search' id='icon-search'></i>
            </div>

            {/* menu */}
            <div className='menu' onClick={toggleMenu}>
                <i className={menuOpen ? 'bx bx-x' : 'bx bx-menu'} id='icon-menu'></i>
            </div>

            {/* Menu Dropdown, condicional */}
            {menuOpen && (
                <div className='dropdown-menu'>
                    <div className='dropdown-link' onClick={() => navigation(`/Filmes`)}>Filmes</div>
                    <div className='dropdown-link' onClick={() => navigation(`/Animes`)}>Animes</div>
                    <div className='dropdown-link' onClick={() => navigation(`/Generos`)}>Gêneros</div>
                    <div className='dropdown-link' onClick={() => navigation(`/Search/?q=null`)}>Busca</div>
                </div>
            )}
        </div>
    );
}

export default Header;
