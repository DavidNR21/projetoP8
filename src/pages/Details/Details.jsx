import { useState, useEffect, useContext } from 'react'
import './stylesDetails.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { buscar_info_animes, buscar_info_filme, buscar_relacionados } from '../../services/Api'
import ListEpisodios from '../../components/ListEpisodios/ListEpisodios'
import Dropdown from "../../components/Dropdown/Dropdown"
import DropdownItem from "../../components/DropdownItem/DropdownItem"
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
import FooterCustom from '../../components/FooterCustom/FooterCustom'
import Loading from "../../components/Loading/Loading"
import axios from 'axios'
import { AuthContext } from '../../context/AuthContext'


function Details (){

    const [isLoading, setIsLoading] = useState(false) // loading da tela
    const [temp, setTemp] = useState(1) // temporada
    const { setEp } = useContext(AuthContext)

    const [searchParams] = useSearchParams()
    const query = searchParams.get('name')
    const type = searchParams.get('type')
    const navigation = useNavigate()

    const [data, setData] = useState({}) // dados do anime
    const [episodios, setEpisodios] = useState([]) // lista de episodios
    const [isRefresh, setIsRefresh] = useState(false) // loading quando carregar os episodios
    const [tempList, setTempList] = useState([]) // array de temporadas 1, 2, 3...
    const [relacionados, setRelacionados] = useState([]) // array dos relaciondos

    function generateSeasonsArray(seasonNumber) {
        return Array.from({ length: seasonNumber }, (_, i) => i + 1)
    }


    const formatReleaseDate = (dateString) => {
        const date = new Date(dateString)
    
        const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ]
    
        const dia = date.getDate()
        const mes = meses[date.getMonth()]
        const ano = date.getFullYear()
    
        return `${dia} de ${mes} de ${ano}`
    }


    const getApiData = () => {
        const apiData = localStorage.getItem('apiKey')
        return apiData ? JSON.parse(apiData) : null
    }

    const fetchEpisodios = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/episodio/details/${query}/${temp}`)

            setEpisodios(response.data.results)
            setIsRefresh(false)
            

        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        }
    }


    useEffect(() => {
        setIsRefresh(true)
        fetchEpisodios()
    }, [temp, query])



    const fetchDatas = async () => {
        try {
            const storedToken = await getApiData()
            console.log(type, query)

            // filme
            if (type !== null){
                const filme_api = await buscar_info_filme(storedToken, query)
                const selectedfilme = filme_api.data.find((filme) => filme.name === query)
                const relacionados_api = await buscar_relacionados(storedToken, selectedfilme.genres.split(",")[0].trim())
                const limitedData_filme = relacionados_api.data.slice(0, 10)


                if (selectedfilme) {
                    //console.log(selectedfilme)
                    setData(selectedfilme)
                    setRelacionados(limitedData_filme)
                } else {
                    console.log("filme não encontrado");
                }
                setIsLoading(false)

                return 'ok'

            }

            // anime
            const anime_api = await buscar_info_animes(storedToken, query)
            
            const selectedAnime = anime_api.data.find((anime) => anime.name === query)

            const rel_api = await buscar_relacionados(storedToken,  selectedAnime.genres.split(",")[0].trim())

            if (selectedAnime) {
                //console.log(selectedAnime)
                setData(selectedAnime)
                setTempList(generateSeasonsArray(selectedAnime.seasonNumber))
                const limitedData = rel_api.data.slice(0, 10)
                setRelacionados(limitedData)
                setIsLoading(false)
            } else {
                console.log("Anime não encontrado");
            }
    
        } catch (error) {
            console.log("Erro ao buscar dados:", error)
        }
    }


    function goPlayer(e){
        setEp(e)
        navigation(`/Player/?name=${e.name}`)
    }


    useEffect(() => {
        setIsLoading(true)
        window.scrollTo(0, 0)
        setTemp(1)
        fetchDatas()
    },[query])



    return (
        <>
            {
                isLoading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <div className="ctn-details">
                        <div className="back-button-div" onClick={() => navigation(-1)}>
                            <i className="bx bx-left-arrow-alt"></i> Voltar
                        </div>

                        
                        <div className="div-img-details">
                            <div className="overlay-gradient"></div>
                            <img className="back-img" alt={data?.name} src={data?.back_drop_img} />
                        </div>

                        <div className="details-content">
                            <img className="poster-img" alt={data?.name} src={data?.poster} />

                            <div className='ctn-infos-anime-vt'>
                                <h3 className='name-anime'>
                                    {data?.name}
                                </h3>

                                {
                                    type == null ? (
                                        <p>
                                            Número de Temporadas: <span>{data?.seasonNumber}</span>
                                        </p>
                                    ) : (
                                        <p>
                                            Duração: <span>{data?.duration}</span>
                                        </p>
                                    )
                                }

                                <p>
                                    Avaliações: <span>{data?.rating}</span>
                                </p>

                                <p>
                                    Legendas: <span>{data?.subTitles}</span>
                                </p>

                                <p>
                                    Data de Lançamento: <span>{formatReleaseDate(data.releaseDate)}</span>
                                </p>

                                <p>
                                    Gêneros: <span>{data?.genres}</span>
                                </p>
                            </div>
                        </div>

                        <div className='ctn-sinopse'>
                            <div className='div-sinopse'>
                                <h4>Sinopse:</h4>
                                <p className="synopsis-text">
                                    {data?.overview}
                                </p>
                            </div>
                        </div>

                        {
                            type == null ? (
                                <>
                                    <div className='ctn-dropdown'>
                                        <div className='drop-div-hz'>
                                            <Dropdown
                                                buttonText={`Temporada ${temp}`}
                                                content={
                                                    <>
                                                        {tempList.map((item, id) => (
                                                            <DropdownItem onClick={() => setTemp(item)} key={id}>{`Temporada ${item}`}</DropdownItem>
                                                        ))}
                                                    </>
                                                }
                                            />
                                        </div>

                                        {
                                            isRefresh ? (
                                                <>
                                                    <Loading />
                                                </>
                                            ) : (
                                                <div className={episodios.length == 0 ? 'ctn-eps-empty' : 'ctn-eps'}>
                                                    <ListEpisodios eps={episodios} />
                                                </div>
                                            )
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className='ctn-div-play'>
                                        <div className='button-container'>
                                            <button className='watch-button' onClick={() => goPlayer(data)}>
                                                Assistir
                                            </button>
                                        </div>
                                    </div>
                                </>
                            )
                        }

                        <div className='hs-relacionados'>
                            <HorizontalScroll type={"relacionados"} items={relacionados} />
                        </div>

                        <FooterCustom />

                    
                    </div>
                )
            }
        </>
    )
}


export default Details
