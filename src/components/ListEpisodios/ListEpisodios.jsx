/* eslint-disable react/prop-types */
import './stylesEpisodios.css'


const ListEpisodios = ({ eps }) => {



    return (
        <div className="episodios-container">
            {eps.map((episode, index) => (
                <div key={index} className="episodio-card">
                    <h4 className="episodio-header">
                        T{episode.seasonNumber} : E{episode.episodioNumber}
                    </h4>
                </div>
            ))}
        </div>
    )
}


export default ListEpisodios
