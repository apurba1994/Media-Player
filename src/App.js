import { useState, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import MediaPlayer from './components/MediaPlayer';
import VoiceRecorder from './components/VoiceRecorder';
function App() {
  const [songs, setSongs] = useState([]);


  return (
    <div className='app'>
      <Routes>
        <Route path='/' exact element={<MediaPlayer  songs={songs} setSongs={setSongs} />} />
        <Route path='/recorder' exact element={<VoiceRecorder songs={songs} setSongs={setSongs}  />} />
      </Routes>
    </div>
  );
}

export default App;
