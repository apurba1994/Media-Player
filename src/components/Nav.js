import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMusic,faAdd } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
export default function Nav({ libStatus, setlibStatus }) {
  return (
    <nav>
      <h1>MPlayer</h1>
      <div>
        <Link to='/recorder'>
          <FontAwesomeIcon icon={faAdd} />
          New Record
        </Link>
        <button onClick={() => setlibStatus(!libStatus)}>
          Library
          <FontAwesomeIcon icon={faMusic} />
        </button>
      </div>
    </nav>
  )
}
