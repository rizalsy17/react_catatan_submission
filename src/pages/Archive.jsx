// Archive.jsx
import React, { useState } from 'react';
import NoteList from '../components/NoteList';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import Modal from '../components/Modal';

const Archive = ({ archivedNotes, onActivate, onDeleteNote, onArchive, onEdit, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const handleActivate = (noteId) => {
    onActivate(noteId);
  };

  const handleDelete = (noteId) => {
    setModalContent({
      type: 'delete',
      noteId: noteId,
      onDeleteNote: () => {
        onDeleteNote(noteId);
        setShowModal(false);
      },
    });
    setShowModal(true);
  };
  

  const handleEdit = (noteId) => {
    const noteToEdit = archivedNotes.find((note) => note.id === noteId);
  
    setModalContent({
      type: 'edit',
      noteId: noteToEdit.id,
      noteTitle: noteToEdit.title,
      noteBody: noteToEdit.body,
      onSaveEdit: (editedTitle, editedBody) => {
        onEdit(noteId, editedTitle, editedBody);
        setShowModal(false);
      },
    });
  
    setShowModal(true);
  };

  const handleArchive = (noteId) => {
    setModalContent({
      type: 'confirm',
      message: 'Anda yakin ingin mengembalikan catatan ini?',
      onConfirm: () => {
        onArchive(noteId);
        setShowModal(false);
      },
      noteId: noteId,
    });
    setShowModal(true);
  };

  return (
    <div>
      <Link to="/" className="back-button">
        <FontAwesomeIcon icon={faHome} /> Kembali
      </Link>
      <header>
        <h1 style={{ textAlign: 'center' }}>Data Arsip</h1>
      </header>

      <NoteList
        notes={archivedNotes}
        setNotes={setNotes}
        archived={true}
        onActivate={handleActivate}
        onDeleteNote={handleDelete}
        onArchive={handleArchive}
        onEdit={handleEdit}
      />

{showModal && (
  <Modal
    content={modalContent}
    onClose={() => setShowModal(false)}
    onDeleteNote={(noteId) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
      setShowModal(false);
    }}
    onSaveEdit={(noteId, editedTitle, editedBody) => {
      // Implement logic to save the edited note in the archivedNotes array
      console.log(`Save edited note with ID ${noteId}`);
      setShowModal(false);
    }}
    onArchive={(noteId) => {
      // Implement logic to archive the note in the archivedNotes array
      onArchive && onArchive(noteId);
      setShowModal(false);
    }}
  />
)}

    </div>
  );
};

export default Archive;
