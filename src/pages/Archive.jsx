import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCheck, faTrash,faEdit } from '@fortawesome/free-solid-svg-icons';
import noNotesImage from '../../public/empty.png';
import Modal from '../components/Modal';

const Archive = ({ archivedNotes, onActivate, onDeleteNote, onEdit}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const archivedFilter = searchTerm
    ? archivedNotes.filter(
        (note) => !note.archived && note.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : archivedNotes;


  const handleEditArchive = (note) => {
    setModalContent({
      type: 'edit',
      noteId: note.id,
      noteTitle: note.title,
      noteBody: note.body,
    });
    setShowModal(true);
  };

  const handleActivate = (noteId) => {
    setModalContent({
      type: 'activate',
      message: 'Anda yakin ingin mengaktifkan catatan ini?',
      onConfirm: () => {
        onActivate(noteId);
        setShowModal(false);
      },
      noteId: noteId,
    });
    setShowModal(true);
  };

  useEffect(() => {
    localStorage.setItem('archivedNotes', JSON.stringify(archivedNotes));
  }, [archivedNotes]);

  return (
    <div className="container">
      <Link to="/" className="back-button-form">
        <FontAwesomeIcon icon={faHome} /> Kembali
      </Link>
      <header>
        <h1 style={{ textAlign: 'center' }}>Data Arsip</h1>
      </header>
      <section className="content">
        <div className="search-container">
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Cari catatan..."
          />
        </div>
        <div className="container">
      {archivedFilter.length === 0 ? (
        <img src={noNotesImage} alt="No Notes" className="no-notes-image"/>
      ) : (
        <div className="note-cards">
          {archivedFilter.map((note) => (
            <div className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`}>
                <h3>{note.title}</h3>
              </Link>
              <p>{new Date(note.createdAt).toLocaleString()}</p>
              <div className="actions">
                <button className="archive-button" onClick={() => handleActivate(note.id)}>
                  <FontAwesomeIcon icon={faCheck} />
                </button>
                <button
                  className="delete-button"
                  onClick={() => {
                    setModalContent({
                      type: 'delete',
                      noteId: note.id,
                    });
                    setShowModal(true);
                  }}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="edit-button" onClick={() => handleEditArchive(note)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
              </div>
       
          ))}
        </div>
      )}
     </div>
        {showModal && (
          <Modal
            content={modalContent}
            onClose={() => setShowModal(false)}
            onDeleteNote={(noteId) => {
              onDeleteNote(noteId);
              setShowModal(false);
            }}
            onSaveEdit={(noteId, editedTitle, editedBody) => {
              onEdit(noteId, editedTitle, editedBody);
              setShowModal(false);
            }}
            onActivate={(noteId) => {  // Add this line
              onActivate && onActivate(noteId);
              setShowModal(false);
            }}
          />
        )}
      </section>
    </div>
  );
};

export default Archive;
