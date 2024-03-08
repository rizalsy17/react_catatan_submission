// App.jsx
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import NoteDetail from './components/NoteDetail'; // Import NoteDetail component
import AddNoteForm from './components/AddNoteForm';
import Home from './pages/Home';
import Archive from './pages/Archive';
import NotFound from './pages/NotFound';
import Modal from './components/Modal';

const App = () => {
  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('notes')) || [];
    } catch (error) {
      console.error('Error parsing localStorage for notes:', error);
      return [];
    }
  });

  const [archived, setArchived] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('archivedNotes')) || [];
    } catch (error) {
      console.error('Error parsing localStorage for archivedNotes:', error);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('archivedNotes', JSON.stringify(archived));
  }, [notes, archived]);
  
  

  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);


  const onArchive = (noteId) => {
    setNotes((prevNotes) => {
      const updatedNotes = prevNotes.map((note) =>
        note.id === noteId ? { ...note, archived: true } : note
      );
  
      const noteToArchive = updatedNotes.find((note) => note.id === noteId);
  
      if (noteToArchive && !archived.some((note) => note.id === noteId)) {
        setArchived((prevArchived) => {
          const newArchived = [...prevArchived, noteToArchive];
          localStorage.setItem('archivedNotes', JSON.stringify(newArchived));
          return newArchived;
        });
      }
  
      localStorage.setItem('notes', JSON.stringify(updatedNotes));
      return updatedNotes;
    });
  };
  
  // const onDeleteNote = (noteId) => {
  //   setNotes((prevNotes) => {
  //     const updatedNotes = prevNotes.filter((note) => note.id !== noteId);
  //     localStorage.setItem('notes', JSON.stringify(updatedNotes));
  //     return updatedNotes;
  //   });
  // };
  
  
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
        {/* Add the Route for NoteDetail */}
        <Route path="/note/:id" element={<NoteDetail notes={notes} />} />
        <Route
  path="/archive"
  element={
    <Archive
      archivedNotes={archived}
      onActivate={(noteId) => console.log('Activate note', noteId)}
      onDeleteNote={(noteId) => {
        setNotes((prevNotes) => [...prevNotes, archived.find((note) => note.id === noteId)]);
        setArchived((prevArchived) => prevArchived.filter((note) => note.id !== noteId));
      }}
      onEdit={(noteId, editedTitle, editedBody) => {
        // Implement the logic to edit a note in the archivedNotes array
        console.log(`Edit note with ID ${noteId}`);
      }}
      setShowModal={setShowModal}
      setModalContent={setModalContent}
      setNotes={setNotes}
    />
  }
/>

       <Route path="/delete/:id"
          element={
            <Modal
              content={{
                type: 'delete',
                onDeleteNote: (noteId) => {
                  setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
                  localStorage.setItem('notes', JSON.stringify(prevNotes));
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

      {/* Modal */}
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
