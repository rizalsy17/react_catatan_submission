import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteDetail from './components/NoteDetail';
import AddNoteForm from './components/AddNoteForm';
import Home from './pages/Home';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';

const App = () => {
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || []);
  const [archived, setArchived] = useState(() => JSON.parse(localStorage.getItem('archivedNotes')) || []);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('archivedNotes', JSON.stringify(archived));
  }, [archived]);

  const onArchive = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, archived: true } : note
      );

      const noteToArchive = updatedNotes.find((note) => note.id === noteId);

      if (noteToArchive && !archived.some((note) => note.id === noteId)) {
        setArchived((prevArchived) => {
          const newArchived = [...prevArchived, noteToArchive];
          return newArchived;
        });
      }

      return updatedNotes;
    });
  };

const onSaveEdit = (noteId, editedTitle, editedBody) => {
  setNotes((prevNotes) => {
    const updatedNotes = prevNotes.map((note) =>
      note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
    );

    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    return updatedNotes;
  });

  setArchived((prevArchived) => {
    const updatedArchived = prevArchived.map((note) =>
      note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
    );

    localStorage.setItem('archivedNotes', JSON.stringify(updatedArchived));
    return updatedArchived;
  });
};

const onActivate = (noteId) => {
  setNotes((prevNotes) => {
    const updatedNotes = prevNotes.map((note) =>
      note.id === noteId ? { ...note, archived: false } : note
    );
    localStorage.setItem('notes', JSON.stringify(updatedNotes));
    return updatedNotes;
  });

  const updatedArchived = archived.filter((note) => note.id !== noteId);
  setArchived(updatedArchived);
  localStorage.setItem('archivedNotes', JSON.stringify(updatedArchived));
};

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Home notes={notes} setNotes={setNotes} onArchive={onArchive} onDeleteNote={(noteId) => {
            setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
            localStorage.setItem('notes', JSON.stringify(prevNotes.filter((note) => note.id !== noteId)));
          }} />}
        />
        <Route path="/addnote" element={<AddNoteForm notes={notes} setNotes={setNotes} />} />
        <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
        <Route
  path="/archive"
  element={
    <Archive
      archivedNotes={archived}
      onActivate={onActivate}  
      onDeleteNote={(noteId) => {
        const archivedFilter = archived.filter((note) => note.id !== noteId);
        setArchived(archivedFilter);
        localStorage.setItem('archivedNotes', JSON.stringify(archivedFilter));
      }}
      onEdit={onSaveEdit}
      setShowModal={setShowModal}
      setModalContent={setModalContent}
      setNotes={setNotes}
    />
  }
/>


        <Route
          path="/delete/:id"
          element={
            <Modal
              content={{
                type: 'delete',
                onDeleteNote: (noteId) => {
                  setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
                  setArchived((prevArchived) => prevArchived.filter((note) => note.id !== noteId));
                  localStorage.setItem('notes', JSON.stringify(prevNotes));
                  localStorage.setItem('archivedNotes', JSON.stringify(prevArchived));
                  setShowModal(false);
                },
                noteId: ':id',
              }}
              onClose={() => setShowModal(false)}
              onArchive={onArchive}
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
