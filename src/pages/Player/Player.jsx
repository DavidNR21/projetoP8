import { useContext, useState } from 'react'
import './stylesPlayer.css'
import { AuthContext } from '../../context/AuthContext'
import { VideoPlayer } from '../../components/VideoPlayer/VideoPlayer'



const Player = () => {

    const [isLoading, setIsLoading] = useState(true)

    const { ep } = useContext(AuthContext)


    return (
        <>
            {
                !isLoading ? (
                    <>
                        
                    </>
                ) : (
                    <div className="player-ctn">
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