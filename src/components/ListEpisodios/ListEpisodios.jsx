/* eslint-disable react/prop-types */
import { useContext } from 'react'
import './stylesEpisodios.css'
import { AuthContext } from "../../context/AuthContext"
import { useNavigate } from 'react-router-dom'


const ListEpisodios = ({ eps }) => {

    const { setEp } = useContext(AuthContext)
    const navigation = useNavigate()

    function goPlayer(e){
        setEp(e)
        navigation(`/Player/?name=${e.name}`)
    }

    return (
        <div className="episodios-container">
            {eps.map((episode, index) => (
                <div key={index} className="episodio-card" onClick={() => goPlayer(episode)}>
                    <h4 className="episodio-header">
                        T{episode.seasonNumber} : E{episode.episodioNumber}
                    </h4>
                </div>
            ))}
        </div>
    )
}


export default ListEpisodios
