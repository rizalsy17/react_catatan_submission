// Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArchive } from '@fortawesome/free-solid-svg-icons';
import NoteList from '../components/NoteList';
import AddNoteForm from '../components/AddNoteForm';
import '../styles/style.css';

const Home = ({ notes, setNotes, onArchive }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // useEffect(() => {
  //   localStorage.setItem('notes', JSON.stringify(notes));
  // }, [notes]);

  // Filter notes based on the search term
  const filteredNotes = notes.filter(
    (note) => !note.archived && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // console.log('All notes length:', archivedNotes.length);
  // console.log('Filtered notes length:', filteredNotes.length);

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

        {/* Tampilkan daftar catatan menggunakan NoteList */}
        <NoteList notes={filteredNotes} onArchive={onArchive} setNotes={setNotes} archived={false} />

        {/* Tambah Catatan button */}
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
