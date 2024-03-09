import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

const AddNoteForm = ({ notes, setNotes }) => {
  const [newNote, setNewNote] = useState({ title: '', body: '' });
  const [charCount, setCharCount] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newCharCount = value.length;
  
    const isTitleField = name === 'title';
    const isTitleWithinLimit = isTitleField && newCharCount <= 50;
    if (isTitleWithinLimit) {
      setNewNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
      setCharCount(newCharCount);
    }
    else {
      setNewNote((prevNote) => ({
        ...prevNote,
        [name]: value,
      }));
    }
  };
  
  const handleAddNote = () => {
    if (newNote.title.trim() && newNote.body.trim()) {
      const timestamp = +new Date();
      const id = `notes-${timestamp}`;
      const createdAt = new Date().toISOString();
      const archived = false;

      const updatedNotes = [
        ...notes,
        { id, title: newNote.title, body: newNote.body, archived, createdAt },
      ];

      setNotes(updatedNotes);
      navigate('/');

      // Kosongkan formulir setelah menambah catatan
      setNewNote({ title: '', body: '' });
      setCharCount(0); 
    } else {
      alert('Judul dan isi catatan tidak boleh kosong!');
    }
  };

  return (
    <div className='center-container'>
      <div className="add-note-form-container">
      <Link to="/" className="back-button-form">
          <FontAwesomeIcon icon={faHome} /> Kembali
        </Link>
        <h2>Tambah Catatan Baru</h2>
        <form>
          <label htmlFor="title">Judul:</label>
          <div className="input-container">
            <input
              type="text"
              id="title"
              name="title"
              value={newNote.title}
              onChange={handleInputChange}
            />
            <p className="char-count">{`(${charCount}/50)`}</p>
          </div>


          <label htmlFor="noteContent">Isi Catatan:</label>
          <textarea
            id="body"
            name="body"
            value={newNote.body}
            onChange={handleInputChange}
          ></textarea>

          <button type="button" onClick={handleAddNote}>
            Tambah Catatan
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddNoteForm;
