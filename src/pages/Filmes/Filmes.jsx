import { useEffect, useState } from 'react'
import './stylesFilmes.css'
import Header from '../../components/Header/Header'
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import FooterCustom from '../../components/FooterCustom/FooterCustom';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';


function Filmes (){

    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [offset, setOffset] = useState(1)
    const [total, setTotal] = useState(8)
    const navigation = useNavigate()



    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/filme/?pag=${offset}`);

                setDatas(response.data.results)

                setTotal(Math.trunc(response.data.results[0].id / 20))

                setIsLoading(false)

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [offset]);
    

    return(
        <>
            {
                isLoading ? (
                    <>
                        <Loading />
                    </>
                ) : (
                    <div className="ctn-filmes">
                        <Header />

                        <div className="anime-list">
                            {datas.map((anime) => (
                                <div key={anime.id} className="anime-item" onClick={() => navigation(`/Details/?name=${anime.name}&type=filme`)}>
                                    <img src={anime.poster} alt={anime.name} />
                                </div>
                            ))}
                        </div>

                        {/*{datas && datas.length > 0 && (
                            <Pagination
                                limit={20}
                                total={datas[0].id}
                                offset={offset}
                                setOffset={setOffset}
                            />
                        )}*/}

                        {datas && datas.length > 0 && (
                            <PaginationComponent
                                total={total}
                                setOffset={setOffset}
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


export default Filmes



