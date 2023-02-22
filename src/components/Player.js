import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight, faPlay, faPause, faL } from '@fortawesome/free-solid-svg-icons';
export default function Player({ currentSong, isPlaying, setIsPlaying, songs, setCurrentSong, audioRef, setSongInfo, songInfo }) {
    const handleAudioPlayHandler = () => {
        setIsPlaying(!isPlaying);
        if (isPlaying) {
            audioRef.current.pause();
        }
        else {
            audioRef.current.play();
        }
    }
    const getTime = (time) => {
        return Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2);
    }
    const onChangeHandler = (e) => {
        audioRef.current.currentTime = e.target.value;
        setSongInfo({ ...songInfo, currentTime: e.target.value });
    }

    const backHandler = () => {
        const idx = songs.indexOf(currentSong);
        if (idx < 1) {
            return;
        }
        setCurrentSong(songs[idx - 1]);
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            playPromise.then(audio => {
                audioRef.current.play()
            })
        }
        setCurrentSong(songs[idx - 1]);
        
    }

    const forwardHandler = () => {
        const idx = songs.indexOf(currentSong);
        if (idx < 0 || idx >= songs.length - 1) {
            return;
        }
        setCurrentSong(songs[idx + 1]);
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            playPromise.then(audio => {
                audioRef.current.play()
            })
        }
    }

    return (
        <div className='player'>
            <div className='time-control'>
                <p>{getTime(songInfo.currentTime)}</p>
                <input min={0} max={songInfo.duration ?? 0} onChange={onChangeHandler} value={songInfo.currentTime ?? 0} type="range" />
                <p>{getTime(songInfo.duration)}</p>
            </div>
            <div className='play-control'>
                <FontAwesomeIcon size='2x' className='skip-back' icon={faAngleLeft} onClick={() => { backHandler() }} />
                <FontAwesomeIcon size='2x' className='play' onClick={handleAudioPlayHandler} icon={isPlaying ? faPause : faPlay} />
                <FontAwesomeIcon size='2x' className='skip-forward' icon={faAngleRight} onClick={() => { forwardHandler() }} />
            </div>
        </div>
    )
}
