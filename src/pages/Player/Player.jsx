import { useContext, useState } from 'react'
import './stylesPlayer.css'
import { AuthContext } from '../../context/AuthContext'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'
import { useNavigate } from 'react-router-dom'



const Player = () => {

    const [isLoading, setIsLoading] = useState(true)
    const navigation = useNavigate()

    const { ep } = useContext(AuthContext)


    return (
        <>
            {
                !isLoading ? (
                    <>
                        
                    </>
                ) : (
                    <div className="player-ctn">
                        <div className='bt-return-player' onClick={() => navigation(-1)}>
                            <i className='bx bx-left-arrow-alt' id='arrow-left-ply'></i>
                        </div>

                        <div className='plyt'>
                            <VideoPlayer src={ep.url} />
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Player