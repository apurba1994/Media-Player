import React from 'react'

export default function LibrarySong({ song, setCurrentSong, audioRef, currentSong, isPlaying }) {
    const className = `library-song ${song == currentSong ? 'selected' : ''}`
    return (
        <div className={className} onClick={() => {
            setCurrentSong(song);
            if (isPlaying) {
                const playPromise = audioRef.current.play();
                playPromise.then(audio => {
                    audioRef.current.play()
                })
            }
        }}>
            <img src={song.cover} />
            <div className='description'>
                <h4>{song.name}</h4>
                <h5>{song.artist}</h5>
            </div>
        </div>
    )
}
