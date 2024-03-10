import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArchive, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { getInitialData, showFormattedDate } from '../utils/index';
import { deleteNote, editNote } from './NoteUtils'; // Mengimpor fungsi-fungsi dari utilitas
import Modal from './Modal';
import noNotesImage from '../../public/empty.png';

const NoteList = ({ notes, onArchive, setNotes }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [allNotes, setAllNotes] = useState([
    ...getInitialData().map((note) => ({ ...note, isDummy: true, editIcon: true, deleteIcon: true })),
    ...notes
  ]);


  const handleEditClick = (note) => {
    const updatedDummyNotes = allNotes.map((dNote) =>
      dNote.id === note.id ? { ...dNote, isDummy: true, editIcon: true, deleteIcon: true } : dNote
    );
    setModalContent({
      type: 'edit',
      noteId: note.id,
      noteTitle: note.title,
      noteBody: note.body,
    });
    setShowModal(true);
    setNotes(updatedDummyNotes.filter((note) => !note.isDummy));
    setAllNotes(updatedDummyNotes);
  };
  
  const handleArchive = (noteId) => {
    const noteToArchive = allNotes.find((note) => note.id === noteId);
  
    if (noteToArchive) {
      setModalContent({
        type: 'confirm',
        message: 'Anda yakin ingin mengarsipkan catatan ini?',
        onConfirm: () => {
          const updatedNotes = allNotes.map((note) =>
            note.id === noteId
              ? { ...note, archived: true, isDummy: note.isDummy ? true : false }
              : note
          );
  
          if (!noteToArchive.isDummy) {
            // Handle regular note deletion if it's not a dummy note
            const updatedNotesWithoutDummy = deleteNote(updatedNotes, noteId);
            setNotes(updatedNotesWithoutDummy.filter((note) => !note.isDummy));
            setAllNotes(updatedNotesWithoutDummy);
          } else {
            // Handle dummy note deletion
            const updatedDummyNotes = updatedNotes.filter((dNote) => dNote.id !== noteId);
            setAllNotes(updatedDummyNotes);
            console.log('Deleting dummy data:', noteToArchive);
          }
  
          setShowModal(false);
        },
        noteId: noteId,
      });
  
      setShowModal(true);
    }
  };
  
  
  
  

  const handleDelete = (noteId) => {
    const noteToDelete = allNotes.find((note) => note.id === noteId);
    if (noteToDelete) {
      if (!noteToDelete.isDummy) {
        // Menggunakan fungsi deleteNote dari utilitas dan memperbarui state notes dan allNotes
        const updatedNotes = deleteNote(allNotes, noteId);
        setNotes(updatedNotes.filter((note) => !note.isDummy));
        setAllNotes(updatedNotes); // Add this line
      } else {
        const updatedDummyNotes = allNotes.filter((dNote) => dNote.id !== noteId);
        // Menggabungkan dummyNotes yang diperbarui dan userNotes untuk memperbarui state setNotes dan allNotes
        setNotes(updatedDummyNotes.filter((note) => !note.isDummy));
        setAllNotes(updatedDummyNotes); // Add this line
        console.log('Deleting dummy data:', noteToDelete);
      }
  
      setShowModal(false);
    }
  };

  return (
    <div className="container">
      {allNotes.length === 0 ? (
        <img src={noNotesImage} alt="No Notes" className="no-notes-image" />
      ) : (
        <div className="note-cards">
          {allNotes.map((note) => (
            <div className="note-card" key={note.id}>
              <Link to={`/note/${note.id}`}>
                <h3>{note.title}</h3>
              </Link>
              <p>{showFormattedDate(note.createdAt)}</p>
              <div className="actions">
              {(!note.isDummy || note.editIcon) && (
                <>
              <button
                className="archive-button"
                onClick={() => handleArchive(note.id)}
              >
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
                 </>
               )}
             </div>
           </div>
         ))}
       </div>
     )}

     {showModal && (
       <Modal
         content={modalContent}
         onDeleteNote={(noteId) => handleDelete(noteId)}
         onClose={() => setShowModal(false)}
         onSaveEdit={(noteId, editedTitle, editedBody) => {
           const updatedNotes = editNote(allNotes, noteId, editedTitle, editedBody);
           setNotes(updatedNotes.filter((note) => !note.isDummy));
           setAllNotes(updatedNotes);
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
