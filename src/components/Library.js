import React from 'react'
import LibrarySong from './LibrarySong';

export default function Library({libStatus,songs,setCurrentSong,currentSong,isPlaying,audioRef}) {
  return (
    <div className={`library ${libStatus?'active':''}`}>
        <h1>Library</h1>
        <div className='library-songs'>

            {songs.map((song,index)=>{

                return (
                    <LibrarySong audioRef={audioRef} isPlaying={isPlaying} currentSong={currentSong} setCurrentSong={setCurrentSong} key={index} song={song}/>
                );

            })}

        </div>

    </div>
  )
}
