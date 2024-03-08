// src/components/NoteList.jsx

import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import noNotesImage from '../../public/empty.png';
import Modal from './Modal';

const NoteList = ({ notes, onArchive, setNotes, setShowModalProp, setModalContentProp }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleEditClick = (note) => {
    setModalContent({
      type: 'edit',
      noteId: note.id,
      noteTitle: note.title,
      noteBody: note.body,
    });
    setShowModal(true);
  };

  const handleArchive = (noteId) => {
    setModalContent({
      type: 'confirm',
      message: 'Anda yakin ingin mengembalikan catatan ini?',
      onConfirm: () => {
        onArchive(noteId); // Panggil fungsi onArchive untuk mengembalikan catatan dari arsip
        setShowModal(false);
      },
      noteId: noteId,
    });
    setShowModal(true);
  };
  
  return (
    <div className="container">
      {notes.length === 0 ? (
        <img src={noNotesImage} alt="No Notes" style={{ width: '600px', height:'400px', marginBottom: '160px'}}/>
      ) : (
        <div className="note-cards">
          {notes.map((note) => (
            <div className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <h3>{note.title}</h3>
              </Link>
              <p>{new Date(note.createdAt).toLocaleString()}</p>
              <div className="actions">
                <button className="archive-button" onClick={() => handleArchive(note.id)}>
                  <FontAwesomeIcon icon={faArchive} />
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
                <button className="edit-button" onClick={() => handleEditClick(note)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <Modal
          content={modalContent}
          onDeleteNote={(noteId) => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            setShowModal(false);
          }}
          onClose={() => setShowModal(false)}
          onSaveEdit={(noteId, editedTitle, editedBody) => {
            setNotes((prevNotes) =>
              prevNotes.map((note) =>
                note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
              )
            );
            setShowModal(false);
          }}
          onArchive={(noteId) => {
            onArchive && onArchive(noteId);
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
};

export default NoteList;
