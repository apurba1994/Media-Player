import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from "uuid"

export default function CustomModal({closeModal,recording,songs,setSongs}) {
    const [inpuValue,setInputValue]=useState('');
    const navigate=useNavigate();
    const [error,setError]=useState('');
    const onFormSubmit=(e)=>{
        e.preventDefault();
        if(!inpuValue){
            setError("Name is required")
            return;
        }
        if(!recording){
            alert("No recordings");
            return;
        }
        const newSong = {
          name: inpuValue,
          cover:
            "https://chillhop.com/wp-content/uploads/2021/03/74d62bc9370a68e440c1b98eaf650344f0a7faea-1024x1024.jpg",
          audio: recording,
          id: uuidv4(),
        };
        setSongs([...songs, newSong]);
        closeModal();
        navigate('/')


    }
    return (
        <div id="myModal" className="modal">
            <div className="modal-content">

                <div className="modal-header">
                    <span className="close" onClick={()=>closeModal()}>&times;</span>
                    <h2>Save Recording</h2>
                </div>

                <div className="modal-body">
                    <form onSubmit={onFormSubmit}>

                        <div className='input-group'>

                            <label>Recording Name</label>

                            <input value={inpuValue} onChange={(e)=>{
                                setError(null);
                                setInputValue(e.target.value)
                                }} placeholder='Enter Recording Name'/>

                            {error  && <span className='error'>{error}</span>}

                        </div>

                    </form>
                </div>

                <div className='modal-footer'>

                    <button onClick={onFormSubmit} className='btn save-btn'>Save</button>

                </div>

            </div>
        </div>
    );
}
