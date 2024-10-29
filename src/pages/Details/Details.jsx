import { useState, useEffect } from 'react'
import './stylesDetails.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { buscar_info_animes, buscar_info_filme } from '../../services/Api'
import ListEpisodios from '../../components/ListEpisodios/ListEpisodios'
import Dropdown from "../../components/Dropdown/Dropdown"
import DropdownItem from "../../components/DropdownItem/DropdownItem"
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
import FooterCustom from '../../components/FooterCustom/FooterCustom'
import axios from 'axios'
import Loading from '../../components/Loading/Loading'


function Details (){

    const [isLoading, setIsLoading] = useState(true) // loading da tela
    const [temp, setTemp] = useState(1) // temporada

    const [searchParams] = useSearchParams()
    const query = searchParams.get('name')
    const type = searchParams.get('type')
    const navigation = useNavigate()

    const [data, setData] = useState({}) // dados do anime
    const [episodios, setEpisodios] = useState([]) // lista de episodios
    const [isRefresh, setIsRefresh] = useState(false) // loading quando carregar os animes
    const [tempList, setTempList] = useState([]) // array de temporadas 1, 2, 3...

    function generateSeasonsArray(seasonNumber) {
        return Array.from({ length: seasonNumber }, (_, i) => i + 1)
    }


    const formatReleaseDate = (dateString) => {
        // Cria um objeto de data a partir da string
        const date = new Date(dateString)
    
        // Array com os nomes dos meses em português
        const meses = [
            "janeiro", "fevereiro", "março", "abril", "maio", "junho",
            "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"
        ];
    
        // Extrai o dia, mês e ano
        const dia = date.getDate()
        const mes = meses[date.getMonth()]
        const ano = date.getFullYear()
    
        // Retorna a data formatada
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

        } catch (error) {
            console.error('Erro ao buscar dados:', error)
        }
    }


    useEffect(() => {
        fetchEpisodios()
    }, [temp])



    const fetchDatas = async () => {
        try {
            const storedToken = await getApiData()
            console.log(type, query)

            // filme
            if (type !== null){
                const filme_api = await buscar_info_filme(storedToken, query)
                const selectedfilme = filme_api.data.find((filme) => filme.name === query)

                if (selectedfilme) {
                    console.log(selectedfilme)
                    setData(selectedfilme)
                } else {
                    console.log("filme não encontrado");
                }

                setIsLoading(false)

                return 'ok'

            }

            // anime
            const anime_api = await buscar_info_animes(storedToken, query)
            
            const selectedAnime = anime_api.data.find((anime) => anime.name === query)

            //console.log(query)

            if (selectedAnime) {
                //console.log(selectedAnime)
                setData(selectedAnime)
                let list = generateSeasonsArray(selectedAnime.seasonNumber)
                setTempList(list)
                setIsLoading(false)

            } else {
                console.log("Anime não encontrado");
            }
    
        } catch (error) {
            console.log("Erro ao buscar dados:", error)
        }
    }


    const rl = [{
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/uuqVT15I6P4ow7NS0stu7aM2X5w.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "Japones",
        "genres": "Harem, Shonen",
        "id": 1,
        "name": "The Quintessential Quintuplets",
        "overview": "Futaro Uesugi, um estudante do segundo ano do colegial que vem de uma família pobre, recebe uma irrecusável proposta para trabalhar como tutor... e descobre que suas pupilas são suas colegas de classe! E pra piorar, são gêmeas quíntuplas... Todas lindíssimas, mas com péssimas notas e um ódio mortal pelos estudos! Sua primeira missão será ganhar a confiança das garotas?! Todo dia é dia de festa nesta comédia romântica 500% adorável envolvendo as irmãs gêmeas da casa das Irmãs Nakano!",
        "poster": "https://image.tmdb.org/t/p/w500/zN8ojNNtQvl5XGtKOBX8iRbhswo.jpg",
        "rating": "8.475",
        "releaseDate": "Fri, 11 Jan 2019 00:00:00 GMT",
        "seasonNumber": 2,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/7AstE6bGgzVH9lFsPvLNifcQwQg.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "Japones",
        "genres": "Ecchi, Harem",
        "id": 13,
        "name": "High School DxD",
        "overview": "Conta a história de Issei Hyodo, um idiota, vagabundo e pervertido, do segundo ano colegial. Quando Issei, supostamente, consegue uma namorada, ele é morto por ela em seu primeiro encontro. Issei é reencarnado como um demônio, e dali em diante, ele será um servo de Rias, um demônio de alto nível que também é a garota mais bonita no colégio de Issei.",
        "poster": "https://image.tmdb.org/t/p/w500/yMYvz4vbKMIXb2IMYYi1GSlNaGx.jpg",
        "rating": "8.61",
        "releaseDate": "Fri, 06 Jan 2012 00:00:00 GMT",
        "seasonNumber": 4,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/trzATBntAkDBwYbfMp6DFnebTiO.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "Japones",
        "genres": "Harem, Ecchi",
        "id": 22,
        "name": "Shuumatsu no Harem",
        "overview": "Após ser diagnosticado com uma doença terminal, Mizuhara Reito decide ser congelado para que no futuro seja despertado quando houver uma cura para a sua doença.\n\nAnos depois, Reito é acordado por uma bela mulher inexpressiva, que o informa que todos os homens da Terra foram mortos por uma doença repentina, e que ele, como um dos poucos homens sobreviventes, deve agora engravidar o máximo de mulheres possíveis.",
        "poster": "https://image.tmdb.org/t/p/w500/pD1p4nclzP6DPwUmWDvACobt47h.jpg",
        "rating": "7.652",
        "releaseDate": "Fri, 07 Jan 2022 00:00:00 GMT",
        "seasonNumber": 1,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/fq0DXgxDLgoilru3M7XVzKjGbOm.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "japones",
        "genres": "Harem, Romance",
        "id": 25,
        "name": "Girlfriend, Girlfriend",
        "overview": "Naoya, o protagonista, está no primeiro ano do colegial. Ele se declara para Saki, sua paixão de infância, que aceita se tornar sua namorada. Sua vida não podia estar melhor, quando uma bela garota chamada Nagisa o convida para sair. Indeciso e incapaz de magoar uma garota tão gentil quanto a Nagisa, Naoya chega a uma conclusão inusitada, dando início a um novo tipo de comédia romântica!",
        "poster": "https://image.tmdb.org/t/p/w500/hVxmYEeWkVwJLTHV1nN7oU4UGjm.jpg",
        "rating": "6.98",
        "releaseDate": "Sat, 03 Jul 2021 00:00:00 GMT",
        "seasonNumber": 2,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/n01pg5coiHIVt9zdlPK6trBfBHv.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "japones",
        "genres": "Harem, Romance",
        "id": 60,
        "name": "The Café Terraceand Its Goddesses",
        "overview": "Hayato retornou à sua terra natal pela primeira vez em três anos, para herdar a cafeteria Familia de sua falecida avó, com quem se desentendeu em vida. O estabelecimento está tão afundado em dívidas que ele pretende transformar o local num estacionamento, mas é impedido por cinco lindas garotas que moram no local, e que eram tratadas pela avó de Hayato como parte da família. Juntos, eles decidem honrar a memória da cozinheira e tentam colocar o local em ordem, em uma comédia romântica sobre amor e família... e cinco pretendentes!",
        "poster": "https://image.tmdb.org/t/p/w500/oI7OrbdEcrTCz9BUOMT75lJRPmt.jpg",
        "rating": "6.9",
        "releaseDate": "Sat, 08 Apr 2023 00:00:00 GMT",
        "seasonNumber": 2,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/jibcH0Gnc7mCXD5vooVqU3e6Wuy.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "japones",
        "genres": "Harem, Romance",
        "id": 24,
        "name": "100 Namoradas Que Te Amam Muuuuuito",
        "overview": "Rentaro Aijo levou 100 foras ao longo do ensino fundamental. Então, ele visita um santuário e reza por melhor sorte no ensino médio. O Deus do Amor aparece para ele e lhe promete que em breve conhecerá 100 pessoas que está destinado a namorar. Mas há um problema: uma vez que o destino apresenta alguém a ele, os dois precisam se amar alegremente. Caso contrário, eles morrerão. O que acontecerá com Rentaro e suas 100 namoradas no ensino médio?",
        "poster": "https://image.tmdb.org/t/p/w500/fOfFcOays1whjqBOEkEznVgyhVi.jpg",
        "rating": "8.102",
        "releaseDate": "Sun, 08 Oct 2023 00:00:00 GMT",
        "seasonNumber": 1,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/bG48yR8UzifLLeYdmNj8kdF9T5B.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "Japones",
        "genres": "Harem, Ecchi, Comedia",
        "id": 122,
        "name": "2.5-jigen no Ririsa",
        "overview": "\"Não tenho interesse em garotas 3D!\", diz Masamune Okumura, presidente do clube de mangá, depois de gritar o nome da personagem 2D que ele adora, Liliel. Em seguida, Ririsa Amano, uma garota que quer ser como Liliel, aparece. Ela revela seu gosto secreto por cosplay e se revela uma otaku que é tão apaixonada por Liliel quanto ele. Mostrando sua coleção de fotos e vídeos, eles iniciam atividades de cosplay juntos na sala do clube. Ao ver Ririsa encarnando sua amada Liliel, será que Okumura conseguirá resistir a pegar a câmera? Essa história de juventude e cosplay, dedicada a todos que amam algo fervorosamente, começa agora!",
        "poster": "https://image.tmdb.org/t/p/w500/weal0UrYsys21fYpFFv3iGyPemq.jpg",
        "rating": "8.7",
        "releaseDate": "Fri, 05 Jul 2024 00:00:00 GMT",
        "seasonNumber": 1,
        "subTitles": "Portugues"
    },
    {
        "active": true,
        "adult": false,
        "back_drop_img": "https://image.tmdb.org/t/p/w500/3wgwDu8XqFIMOtvuKRsX22JN48H.jpg",
        "criadoEm": "Thu, 05 Sep 2024 13:33:17 GMT",
        "download": false,
        "dubbing": "Japones",
        "genres": "Slice of Life, Harem",
        "id": 127,
        "name": "Giji Harem",
        "overview": "Eiji Kitahama entra para o clube de teatro com sonho de ser dono de um harém, como aqueles do seu mangá favorito. Rin Nanakura, uma estudante mais nova, fica perdidamente apaixonada por Eiji e experimenta diferentes personalidades na presença dele para tentar conquistá-lo. Não importa como ela age, uma coisa é certa: seus sentimentos por Eiji continuam a crescer cada vez mais. Será que ela vai conseguir contar a verdade para ele e mostrar quem ela é de verdade?",
        "poster": "https://image.tmdb.org/t/p/w500/4n8PhldOBDNJWoHN55tfQ3Ird5J.jpg",
        "rating": "8",
        "releaseDate": "Fri, 05 Jul 2024 00:00:00 GMT",
        "seasonNumber": 1,
        "subTitles": "Portugues"
    }]


    useEffect(() => {
        setIsLoading(true)
        window.scrollTo(0, 0)
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
                                            !isRefresh ? (
                                                <div className={episodios.length == 0 ? 'ctn-eps-empty' : 'ctn-eps'}>
                                                    <ListEpisodios eps={episodios} />
                                                </div>
                                            ) : (
                                                <>

                                                </>
                                            )
                                        }
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )
                        }

                        <div className='hs-relacionados'>
                            <HorizontalScroll type={"relacionados"} items={rl} />
                        </div>

                        <FooterCustom />

                    
                    </div>
                )
            }
        </>
    )
}


export default Details

