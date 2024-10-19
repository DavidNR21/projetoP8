import { useCallback, useEffect, useState } from 'react'
import './stylesHome.css'
import Header from '../../components/Header/Header'
import HorizontalScroll from '../../components/HorizontalScroll/HorizontalScroll'
import FormSugestao from '../../components/FormSugestao/FormSugestao'
import FooterCustom from '../../components/FooterCustom/FooterCustom'
import CardDestaque from '../../components/CardDestaque/CardDestaque'
import { buscar_animes, buscar_animes_andamento, buscar_animes_release, buscar_token } from '../../services/Api'


function Home (){

    const [isLoading, setIsLoading] = useState(true)
    const [colections, setColections] = useState([])
    const [andamento, setAndamento] = useState([])
    const [release, setRelease] = useState([])

    const getApiData = () => {
        const apiData = localStorage.getItem('apiKey')
        return apiData ? JSON.parse(apiData) : null
    }


    const handleCopy = () => {
        const pixInput = document.getElementById('pix-input')
        pixInput.select()
        document.execCommand('copy');
        alert(`Pix copiado: ${pixInput.value}`)
    };

    const mockData = {
        image: 'https://image.tmdb.org/t/p/w500/gArCVC4ML529WMCEqOXbALdQbUq.jpg',
        title: 'Oshi no Ko',
        synopsis: 'A talentosa e bonita Ai Hoshino de 16 anos é uma ídolo adorada por seus fãs. A personificação da donzela pura. Mas nem tudo que brilha é ouro. O ginecologista Amemiya Gorou acaba se encontrando com a Ai que estava grávida e promete a ela um parto seguro. Gorou se encontra com uma misteriosa pessoa e acaba sendo morto, mas não era o fim! Gorou abre os seus olhos novamente, mas agora como o recém-nascido filho da Ai! Com o seu mundo virado de cabeça para baixo, Gorou aprende que o mundo do estrelato é cheio de problemas e que nem sempre talento garante o sucesso. Conseguirá ele proteger o sorriso da Ai que ele tanto adora junto de uma aliada inesperada?',
    }

    const saveApiData = (u) => {
        localStorage.setItem('apiKey', JSON.stringify(u))
    }


    const fetchDatas = useCallback(async () => {
        try {
            // Função para validar ou obter o token
            const getValidToken = async () => {
                let storedToken = await getApiData()  // Tenta recuperar token do localStorage
    
                if (!storedToken) {
                    console.log("Token não encontrado. Buscando novo token...")
                    const newToken = await buscar_token()
                    saveApiData(newToken.data) // Armazena o novo token no localStorage
                    return newToken.data  // Retorna o novo token
                }
    
                try {
                    // Testa o token armazenado chamando a API
                    console.log(storedToken, "aqui")

                    const teste =  await buscar_animes(storedToken)

                    //console.log("Token válido.")

                    if (teste.status !== 200){
                        console.log(teste.status)
                        const refreshedToken = await buscar_token()

                        saveApiData(refreshedToken.data) // Armazena o novo token no localStorage
                        return refreshedToken.data  // Retorna o novo token
                    }

                } catch (error) {
                    console.log("Token expirado ou inválido. Buscando novo token...", error)
                }

                return storedToken
            }
    
            // Valida ou obtém o token válido
            const validToken = await getValidToken()

    
            // Com o token válido, realiza as chamadas à API
            const anime_api = await buscar_animes(validToken)
            const andamento_api = await buscar_animes_andamento(validToken)
            const release_api = await buscar_animes_release(validToken)
    
            // Atualiza os estados com os dados recebidos
            setColections(anime_api.data)
            setAndamento(andamento_api.data)
            setRelease(release_api.data)
    
        } catch (error) {
            console.log("Erro ao buscar dados:", error)
        }
    }, [])


    useEffect(() => {
        fetchDatas()
    }, [])


    return(
        <>
            {
                !isLoading ? (
                    <>
                    </>
                ) : (
                    <div className="home">
                        <Header />

                        <div className='hd-destaque'>
                            <CardDestaque image={mockData.image} title={mockData.title} synopsis={mockData.synopsis} />
                        </div>

                        <div className='ctn-lancamentos'>
                            <h3 className='ctn-lancamentos-h3'>
                                Lancamentos
                            </h3>

                            <div className='hs-lancamento'>
                                <HorizontalScroll items={release} />
                            </div>
                        </div>

                        <div className='ctn-lancamentos'>
                            <h3 className='ctn-lancamentos-h3'>
                                Em Andamento
                            </h3>

                            <div className='hs-lancamento'>
                                <HorizontalScroll items={andamento} type={"andamento"} />
                            </div>
                        </div>

                        <div className='ctn-lancamentos'>
                            <h3 className='ctn-lancamentos-h3'>
                                Animes
                            </h3>

                            <div className='hs-lancamento'>
                                <HorizontalScroll items={colections} />
                            </div>
                        </div>

                        <div className='frm-request'>
                            <FormSugestao />
                        </div>

                        <div className='ctn-Ads'>
                            
                        </div>

                        <FooterCustom />

                    </div>
                )
            }
        </>
    )
}


export default Home



