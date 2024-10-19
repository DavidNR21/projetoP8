import { useEffect, useState } from 'react'
import './stylesFilmes.css'
import Header from '../../components/Header/Header'
import axios from 'axios';
import PaginationComponent from '../../components/PaginationComponent/PaginationComponent';
import FooterCustom from '../../components/FooterCustom/FooterCustom';


function Filmes (){

    const [datas, setDatas] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [offset, setOffset] = useState(1)
    const [total, setTotal] = useState(8)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`https://api.cloudfilmes.com/filme/?pag=${offset}`, {
                    headers: {
                        Authorization: `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25vbWUiOiJhZG1pbiIsImV4cCI6MTc1MjkzNjQ2OSwiZGlhcyI6MzY1LCJzZW5oYSI6ImFkbWluIiwicGVybWlzc29lcyI6ImFsbCJ9.qutMEFpS1UY6jrZnJpGysxr10cg9GUMY4cmS2BdJvtY`,
                    },
                });

                setDatas(response.data.results)

                setTotal(Math.trunc(response.data.results[0].id / 20))

            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        fetchData();
    }, [offset]);
    

    return(
        <>
            {
                !isLoading ? (
                    <>
                    </>
                ) : (
                    <div className="ctn-filmes">
                        <Header />

                        <div className="anime-list">
                            {datas.map((anime) => (
                                <div key={anime.id} className="anime-item" onClick={() => console.log(offset)}>
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



