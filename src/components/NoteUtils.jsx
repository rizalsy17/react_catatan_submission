const deleteNote = (data, noteId) => {
    return data.filter((note) => note.id !== noteId);
  };
  
  const editNote = (data, noteId, editedTitle, editedBody) => {
    return data.map((note) =>
      note.id === noteId ? { ...note, title: editedTitle, body: editedBody } : note
    );
  };
  
  const activateNote = (data, noteId) => {
    return data.map((note) =>
      note.id === noteId ? { ...note, archived: false } : note
    );
  };
  
  const archiveDummyNote = (notes, noteId) => {
    return notes.map((note) =>
      note.id === noteId && note.isDummy ? { ...note, archived: true } : note
    );
  };
  
  
  
  
  export { editNote, activateNote, deleteNote, archiveDummyNote  };
  