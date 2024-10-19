/* eslint-disable react/prop-types */
import './stylesCardDestaque.css';


const CardDestaque = ({ image, title, synopsis }) => {


    return (
        <div className="card-destaque" style={{ backgroundImage: `url(${image})` }}>
            <div className="overlay">
                <div className="card-content">
                    <h2 className="card-title">{title}</h2>
                    <p className="card-synopsis">{synopsis}</p>
                    <div className="btn-details">Ver Detalhes</div>
                </div>
            </div>
        </div>
    );
};


export default CardDestaque;

