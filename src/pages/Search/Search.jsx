import { useEffect, useState } from 'react'
import './stylesSearch.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import FooterCustom from '../../components/FooterCustom/FooterCustom'

const Search = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [inputSearch, setInputSearch] = useState('')
    const [searchParams] = useSearchParams()
    const [res, setRes] = useState([])
    const query = searchParams.get('q')
    const navigation = useNavigate()


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            console.log('Buscando:', inputSearch)
            navigation(`/Search/?q=${inputSearch}`)
        }
    }

    const handleChange = (event) => {
        setInputSearch(event.target.value);
    }

    const fetchSeacrh = async () => {

        try {
            const response = await axios.get(`http://127.0.0.1:5000/anime/?filter=name_${query}`);

            setRes(response.data.results)
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    useEffect(() => {
        fetchSeacrh()
    },[query])


    return (
        <>
            {
                !isLoading ? (
                    <>
                    </>
                ) : (
                    <div className="search-ctn">
                        <div className='ctn-hz-search'>
                            <div className='bt-return' onClick={() => navigation(`/`)}>
                                <i className='bx bx-left-arrow-alt' id='arrow-left'></i>
                            </div>

                            {/* search */}
                            <div className='search-input'>
                                <input 
                                    placeholder={"Digite o deseja assistir"}
                                    type="text"
                                    name="search" 
                                    id="searchText-input" 
                                    value={inputSearch} 
                                    onChange={handleChange} 
                                    onKeyDown={handleKeyDown}
                                />
                                <i className='bx bx-search' id='icon-search-page'></i>
                            </div>

                        </div>

                        {
                            query.length < 2 ? (
                                <>
                                    <div className='await-search'>
                                        <span></span>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='grid-search-page'>
                                        {res.map((anime) => (
                                            <div key={anime.id} className="search-item-page" onClick={() => navigation(`/Details/?name=${anime.name}`)}>
                                                <img src={anime.poster} alt={anime.name} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                        }

                        <div style={{height : "50px"}}>
                            <span></span>
                        </div>

                        <FooterCustom />
                        
                    </div>
                )
            }
        </>
    )
}

export default Search
