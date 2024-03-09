import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const NoteDetail = ({ notes }) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return <p>Catatan tidak ditemukan</p>;
  }

  return (
    <div className="center-container">
      <div className="note-detail-container">
        <Link to="/" className="back-button-form ">
          <FontAwesomeIcon icon={faHome} /> Kembali
        </Link>
        <h1 className="note-title">{note.title}</h1>
          <p className="note-meta">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        <div className="note-detail">
          
            <p>{note.body}</p>
      
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
