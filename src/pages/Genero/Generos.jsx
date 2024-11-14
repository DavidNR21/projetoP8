import { useEffect, useState } from 'react'
import './stylesGenero.css'
import Header from '../../components/Header/Header'
import HorizontalGeneros from '../../components/HorizontalGeneros/HorizontalGeneros'
import axios from 'axios'
import FooterCustom from "../../components/FooterCustom/FooterCustom"
import PaginationComponent from "../../components/PaginationComponent/PaginationComponent"

const Generos = () => {

    const [isLoading, setIsLoading] = useState(true)
    const [genero, setGenero] = useState("Ação")
    const [objetos, setObjetos] = useState([])
    const [isLoadingGen, setIsLoadingGen] = useState(true)
    const [pag, setPag] = useState(1)
    const [total, setTotal] = useState(6)

    const mod = [
        {"icon" : "bx bx-search", "titulo" : "Aventura", "id" : "1"},
        {"icon" : "bx bx-trending-up", "titulo" : "Ação", "id" : "2"},
        {"icon" : "bx bxs-bell", "titulo" : "Comedia", "id" : "3"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Drama", "id" : "4"},
        {"icon" : "bx bxs-chat", "titulo" : "Ecchi", "id" : "5"},
        {"icon" : "bx bxs-crown", "titulo" : "Escolar", "id" : "6"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Esporte", "id" : "7"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Fantasia", "id" : "8"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Harem", "id" : "9"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Magia", "id" : "10"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Misterio", "id" : "11"},
        {"icon" : "bx bxs-user-circle", "titulo" : "OVA", "id" : "12"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Romance", "id" : "13"},
        {"icon" : "bx bxs-user-circle", "titulo" : "SCI-FI", "id" : "14"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Seinen", "id" : "15"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Shoujo", "id" : "16"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Shounen", "id" : "17"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Slice of Life", "id" : "18"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Suspense", "id" : "19"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Terror", "id" : "20"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Yaoi", "id" : "21"},
        {"icon" : "bx bxs-user-circle", "titulo" : "Yuri", "id" : "22"},
    ]



    const fetchData = async () => {
        try {
            const response = await axios.get(`http://127.0.0.1:5000/anime/filtrar?item=genres_${genero}&pag=${pag}`);

            setObjetos(response.data.results)
            setTotal(Math.trunc(response.data.count / 20))
            setIsLoadingGen(false)

        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    }

    useEffect(() => {
        fetchData()
        console.log(genero)
    },[genero, pag])

    return(
        <>
            {
                !isLoading ? (
                    <>
                    </>
                ) : (
                    <div className="Generos-ctn">
                        <Header />

                        <div className='scroll-gen' onClick={() => setIsLoading(true)}>
                            <HorizontalGeneros items={mod} setGen={setGenero}/>
                        </div>

                        {
                            isLoadingGen ? (
                                <>
                                </>
                            ) : (
                                <>
                                    <div className='ctn-grid'>
                                        {objetos.map((anime) => (
                                            <div key={anime.id} className="gen-item">
                                                <img src={anime.poster} alt={anime.name} />
                                            </div>
                                        ))}
                                    </div>
                                </>
                            )
                        }

                        {objetos && objetos.length > 0 && (
                            <PaginationComponent
                                total={total}
                                setOffset={setPag}
                            />
                        )}

                        <div style={{height : '90px'}}>
                            <span></span>
                        </div>

                        <FooterCustom />
                        
                    </div>
                )
            }
        </>
    )
}

export default Generos
