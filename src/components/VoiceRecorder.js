import React, { useEffect, useRef, useState } from 'react';
import fixWebmDuration from 'webm-duration-fix';
import { Link } from 'react-router-dom';
import CustomModal from './CustomModal';
export default function VoiceRecorder({ setSongs, songs, }) {
  const [hour, setHour] = useState("00");
  const [second, setSecond] = useState("00");
  const [minute, setMinute] = useState("00");
  const [isActive, setIsActive] = useState(false);
  const [pause, setPause] = useState(false);
  const [counter, setCounter] = useState(0);
  const [recorder, setRecorder] = useState();
  const [stop, setStop] = useState(false);
  let [recorded, setRecorded] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const playerRef = useRef();
  useEffect(() => {
    const handleSuccess = async function (stream) {
      const options = { mimeType: 'audio/webm' };
      const recordedChunks = [];
      const mediaRecorder = new MediaRecorder(stream, options);
      setRecorder(mediaRecorder);

      mediaRecorder.addEventListener('dataavailable', function (e) {
        if (e.data.size > 0) recordedChunks.push(e.data);
      });

      mediaRecorder.addEventListener('stop', async function () {
        const newBlob = await fixWebmDuration(new Blob(recordedChunks));
        const url = URL.createObjectURL(newBlob);
        playerRef.current.src = url;
        setRecorded(url);
      });
    };

    navigator.mediaDevices.getUserMedia({ audio: true, video: false })
      .then(handleSuccess);
  }, [])

  useEffect(() => {

    let intervalId;

    if (isActive) {
      intervalId = setInterval(() => {
        setCounter((counter) => counter + 1);
        console.log(counter);
        const getSeconds = `0${(counter % 60)}`.slice(-2)
        console.log('sec', getSeconds);
        const minutes = `${Math.floor(counter / 60)}`
        const getMinutes = `0${minutes % 60}`.slice(-2)
        console.log('min', getMinutes);

        const getHours = `0${Math.floor(counter / 3600)}`.slice(-2);
        console.log('hour', getHours);
        setSecond(getSeconds);
        setMinute(getMinutes);
        setHour(getHours);
      }, 1000);
    }
    return () => clearInterval(intervalId);

  }, [isActive, counter])
  function stopTimer() {
    setCounter(0);
    setSecond("00");
    setMinute("00");
    setHour("00");
  }
  function clearAudio() {
    stopTimer();
    setPause(false);
    setIsActive(false);
    setStop(true);
    playerRef.current.src = '';
  }
  function pauseAudioAndTimer() {
    if (recorder) {
      setIsActive(false);
      setPause(false);
      recorder.pause();
    }
  }


  function recordAudio() {
    if (recorder) {
      setIsActive(true);
      setPause(true);
      if (recorder.state == 'paused') {
        recorder.resume();
        return;
      }
      recorder.start();
    }
  }
  function stopAudio() {
    if (recorder && (recorder.state == 'recording' || recorder.state == 'paused')) {
      stopTimer();
      setPause(false);
      setIsActive(false);
      setStop(true);
      recorder.stop();
    }
  }
 
  return (
    <div className='media-player-container'>
      <div className='absolute' style={{ top: '22%', left: '24%' }}>
        <Link to='/' className='btn back-btn' style={{ color: 'black' }}>Navigate to Player</Link>
      </div>
      <div className='container relative'>
        <div className='absolute' style={{ top: '20px', right: '20px', display: 'flex', gap: '20px' }}>
          <button id="clear" className='btn save-btn' onClick={() => {
            stopAudio();
            setShowModal(true);
          }}>Save</button>
          <button id="clear" className='btn clear-btn' onClick={() => clearAudio()}>Clear</button>
        </div>
        <div className='player-warpper' style={{ marginTop: '65px' }}>
          <div style={{ fontSize: "54px" }}>
            <span className="hour">{hour}</span>
            <span>:</span>
            <span className="minute">{minute}</span>
            <span>:</span>
            <span className="second">{second}</span>
          </div>
          <div>
            <audio id="player" ref={playerRef} controls></audio>
          </div>
        </div>
        <div className='btn-wrapper'>
          {!pause ? (<button id="start" className='btn start-btn' onClick={() => recordAudio()}>Start</button>) : <button id="pause" className='btn pause-btn' onClick={() => pauseAudioAndTimer()}>Pause</button>}
          <button id="stop" className='btn stop-btn' onClick={() => stopAudio()}>Stop</button>
        </div>
      </div>
      {showModal && <CustomModal songs={songs} setSongs={setSongs} recording={recorded} closeModal={() => setShowModal(false)} />}
    </div>
  )
}
