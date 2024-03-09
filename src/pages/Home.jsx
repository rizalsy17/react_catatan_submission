import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArchive } from '@fortawesome/free-solid-svg-icons';
import NoteList from '../components/NoteList';


import '../styles/style.css';

const Home = ({ notes, setNotes, onArchive,onActivate }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredNotes = notes.filter(
    (note) => !note.archived && note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

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

        <NoteList notes={filteredNotes} onArchive={onArchive} setNotes={setNotes} archived={false} onActivate={onActivate} />

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
