import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArchive, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';
import noNotesImage from '../../public/empty.png';
import '../styles/style.css';
import Modal from "../components/Modal";
import { deleteNote, editNote } from '../components/NoteUtils';
import { getInitialData, showFormattedDate } from '../utils/index';

const Home = ({ notes, setNotes, onArchive, onActivate, onDeleteNote }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const [allNotes, setAllNotes] = useState([
    ...getInitialData().map((note) => ({ ...note, isDummy: true, editIcon: true, deleteIcon: true })),
    ...notes
  ]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = allNotes.filter(
    (note) => note && !note.archived && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEditClick = (note) => {
    setModalContent({
      type: 'edit',
      noteId: note.id,
      noteTitle: note.title,
      noteBody: note.body,
    });
    setShowModal(true);
  };

  // const handleArchive = (noteId) => {
  //   // Add your archiving logic here
  //   // For example, you can update the 'archived' property of the note
  //   const updatedNotes = allNotes.map((note) =>
  //     note.id === noteId ? { ...note, archived: true } : note
  //   );
  
  //   // Separate archived and non-archived notes
  //   setAllNotes(updatedNotes); // Add this line
  //   const archivedNotes = updatedNotes.filter((note) => note.archived || note.isDummy);
  //   const nonArchivedNotes = updatedNotes.filter((note) => !note.archived && !note.isDummy);
  
  //   console.log('Original Notes:', allNotes);
  //   console.log('Updated Notes:', updatedNotes);
  //   console.log('Non-Archived Notes:', nonArchivedNotes);
  //   console.log('Archived Notes:', archivedNotes);
  
  //   // Update state for both archived and non-archived notes
  //   setNotes(nonArchivedNotes);
    
  //   setShowModal(false);
  // };

  const handleArchive = (noteId) => {
    // Add your archiving logic here
    // For example, you can update the 'archived' property of the note
    const updatedNotes = allNotes.map((note) =>
      note.id === noteId ? { ...note, archived: true } : note
    );
  
    // Log the current state of updatedNotes
    console.log('Updated Notes:', updatedNotes);
  
    // Separate archived and non-archived notes
    const archivedNotes = updatedNotes.filter((note) => note.archived || note.isDummy);
    const nonArchivedNotes = updatedNotes.filter((note) => !note.archived && !note.isDummy);
  
    console.log('Original Notes:', allNotes);
    console.log('Non-Archived Notes:', nonArchivedNotes);
    console.log('Archived Notes:', archivedNotes);
  
    // Update state for both archived and non-archived notes
    setAllNotes(updatedNotes);
    setNotes(nonArchivedNotes);
  
    setShowModal(false);
  };
  
  
  
  const handleDelete = (noteId) => {
    const noteToDelete = allNotes.find((note) => note.id === noteId);
    if (noteToDelete) {
      if (!noteToDelete.isDummy) {
        const updatedNotes = deleteNote(allNotes, noteId);
        setNotes(updatedNotes.filter((note) => !note.isDummy));
        setAllNotes(updatedNotes);
      } else {
        const updatedDummyNotes = allNotes.filter((dNote) => dNote.id !== noteId);
        setNotes(updatedDummyNotes.filter((note) => !note.isDummy));
        setAllNotes(updatedDummyNotes);
        console.log('Deleting dummy data:', noteToDelete);
      }
  
      setShowModal(false);
    }
  };

  return (
    <div className="container">
      <Link to="/archive" className="arsip-button">
        <FontAwesomeIcon icon={faArchive} /> Arsip
      </Link>
      <header>
        <h1>Aplikasi Catatan</h1>
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
        {filteredNotes.length === 0 ? (
          <img src={noNotesImage} alt="No Notes" className="no-notes-image" />
        ) : (
          <div className="note-cards">
            {filteredNotes.map((note) => (
              <div className="note-card" key={note.id}>
                <Link to={`/note/${note.id}`}>
                  <h3>{note.title}</h3>
                </Link>
                <p>{showFormattedDate(note.createdAt)}</p>
                <div className="actions">
                    <>
                      <button
                        className="archive-button"
                        onClick={() => {
                          setModalContent({
                            type: 'confirm',
                            noteId: note.id,
                            message: 'Anda yakin ingin mengarsipkan catatan ini?',
                          });
                          setShowModal(true);
                        }}
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
              
                </div>
              </div>
            ))}
          </div>
        )}
   </div>
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
            onArchive={(noteId) => handleArchive(noteId)}
          />
        )}

        <div className="action-buttons">
          <Link to="/addnote" className="add-note-button">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
