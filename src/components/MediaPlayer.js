import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Library from '../components/Library';
import Nav from '../components/Nav';
import Player from '../components/Player';
import Song from '../components/Song';
import '../styles/app.scss';
function MediaPlayer({ songs, setSongs }) {
    const [libStatus, setlibStatus] = useState(false);
    const [currentSong, setCurrentSong] = useState(songs[0]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [songInfo, setSongInfo] = useState({
        currentTime: 0,
        duration: 0
    });
    const audioRef = useRef();
    const timeUpdateHandler = (e) => {
        const currentTime = e.target.currentTime;
        const duration = e.target.duration;
        setSongInfo({ ...songInfo, currentTime: currentTime || 0, duration: duration || 0 });
    }
    function onEnded(e) {

        const idx = songs.indexOf(currentSong);
        if (idx < 0 || idx >= songs.length - 1) {
            if (idx == songs.length - 1) {
                setIsPlaying(false);
            }
            return;
        }
        setCurrentSong(songs[idx + 1]);
    }
    function onLoaded(e) {
        timeUpdateHandler(e);
        if (isPlaying) {
            const promise = audioRef.current.play();
            promise.then(audio => {
                audioRef.current.play();
            })
        }
    }
    const renderApp = () => {
        if (songs.length > 0) {
            return (
                <div className="App">
                    <Nav libStatus={libStatus} setlibStatus={setlibStatus} />
                    <Library audioRef={audioRef} isPlaying={isPlaying} libStatus={libStatus} currentSong={currentSong} setCurrentSong={setCurrentSong} songs={songs} />
                    <Song currentSong={currentSong} />
                    <Player audioRef={audioRef} songInfo={songInfo} setSongInfo={setSongInfo} songs={songs} setCurrentSong={setCurrentSong} isPlaying={isPlaying} setIsPlaying={setIsPlaying} currentSong={currentSong} />
                    <div>
                        <audio onLoadedData={onLoaded} onEnded={onEnded} onLoadedMetadata={timeUpdateHandler} onTimeUpdate={timeUpdateHandler} ref={audioRef} src={currentSong.audio}></audio>
                    </div>
                </div>
            );
        }
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
                <h1>You dont have any recordings</h1>
                <Link id="stop" className='btn stop-btn' to='/recorder'>Create a new recording</Link>
            </div>
        )
    }
    return renderApp();
}

export default MediaPlayer;
