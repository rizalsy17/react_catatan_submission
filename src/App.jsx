import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteDetail from './components/NoteDetail';
import AddNoteForm from './components/AddNoteForm';
import Home from './pages/Home';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [archived, setArchived] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState([]);

  const onActivate = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, archived: false } : note
      );
      return updatedNotes;
    });

    const updatedArchived = archived.filter((note) => note.id !== noteId);
    setArchived(updatedArchived);
  };

  const onArchive = (noteId) => {
    setNotes((prevNotes) => {
      // Update notes, marking the specified note as archived
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, archived: true } : note
      );
  
      // If setArchived is correctly defined, update the archived state
      setArchived((prevArchived) => [
        ...prevArchived,
        ...updatedNotes.filter((note) => note.id === noteId && !note.isDummy),
      ]);
      
      // Return updated notes
      return updatedNotes;
    });
  };

  const onSaveEdit = (noteId, editedTitle, editedBody) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
      );
      return updatedNotes.filter((note) => !note.isDummy);
    });
  
    const updatedArchived = archived.map((note) =>
      note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
    );
  
    setArchived(updatedArchived);
  };

  const onDeleteNote = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
      return updatedNotes;
    });

    const updatedArchived = archived.filter((note) => note.id !== noteId);
    setArchived(updatedArchived);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home notes={notes} setNotes={setNotes} onArchive={onArchive} onDeleteNote={onDeleteNote} />}
        />
        <Route path="/addnote" element={<AddNoteForm notes={notes} setNotes={setNotes} />} />
        <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
        <Route
          path="/archive"
          element={
            <Archive
              archivedNotes={archived}
              onActivate={onActivate}
              onDeleteNote={onDeleteNote}
              onEdit={onSaveEdit}
              setShowModal={setShowModal}
              setModalContent={setModalContent}
              setNotes={setNotes}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {showModal && (
        <Modal
          content={modalContent}
          onClose={() => {
            setShowModal(false);
            setModalContent(null);
          }}
          onArchive={onArchive}
        />
      )}
    </div>
  );
};

export default App;
