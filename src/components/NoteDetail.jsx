import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faArchive, faHome } from '@fortawesome/free-solid-svg-icons';

const NoteDetail = ({ notes, onDelete, onArchive }) => {
  const { id } = useParams();
  const note = notes.find((n) => n.id === id);

  if (!note) {
    return <p>Catatan tidak ditemukan</p>;
  }

  return (
    <div className="center-container">
      <div className="note-detail-container">
        <Link to="/" className="back-button">
          <FontAwesomeIcon icon={faHome} /> Kembali
        </Link>
        <h1 className="note-title">{note.title}</h1>
          <p className="note-meta">
            {new Date(note.createdAt).toLocaleString()}
          </p>
        <div className="note-detail">
          
            <p>{note.body}</p>
        
          {/* <div className="note-actions">
            <button className="action-button" onClick={() => onDelete(note.id)}>
              <FontAwesomeIcon icon={faTrash} /> Hapus
            </button>
            <button className="action-button" onClick={() => onArchive(note.id)}>
              <FontAwesomeIcon icon={faArchive} /> Arsipkan
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
