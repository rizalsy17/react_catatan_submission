import React, { useState } from 'react';

const Modal = ({ content, onDeleteNote, onClose, onSaveEdit, onArchive,onActivate  }) => {
  const [editedTitle, setEditedTitle] = useState(content.noteTitle);
  const [editedBody, setEditedBody] = useState(content.noteBody);

  
  const handleConfirm = () => {
    if (content.type === 'delete') {
      console.log(`Hapus catatan dengan ID: ${content.noteId}`);
      onDeleteNote && onDeleteNote(content.noteId);
    } else if (content.type === 'edit') {
      console.log(`Edit catatan dengan ID: ${content.noteId}`);
    } else if (content.type === 'confirm') {
      onArchive && onArchive(content.noteId);
  } else if (content.type === 'activate') {
    onActivate && onActivate(content.noteId);
  }

}

  const handleSaveEdit = () => {
    onSaveEdit(content.noteId, editedTitle, editedBody);
    onClose();
  };


  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="modal-content">
          {/* Tampilkan konten modal sesuai dengan content.type */}
          {content.type === 'delete' && (
            <>
              <h2>Konfirmasi Hapus</h2>
              <p>Anda yakin ingin menghapus catatan ini?</p>
              <button className="confirm-button" onClick={handleConfirm}>
                Hapus
              </button>
            </>
          )}

            {content.type === 'confirm' && (
              <>
                <h2>Konfirmasi Arsip</h2>
                <p>{content.message}</p>
                <button className="confirm-button" onClick={handleConfirm}>
                  Arsipkan
                </button>
              </>
            )}

          {content.type === 'activate' && (
            <>
              <h2>Konfirmasi Aktivasi</h2>
              <p>{content.message}</p>
              <button className="confirm-button" onClick={handleConfirm}>
                Aktifkan
              </button>
            </>
          )}


          {content.type === 'detail' && (
            <>
              <h2>Detail Catatan</h2>
              <div className="detail-info">
                <p><strong>ID:</strong> {content.noteId}</p>
                <p><strong>Judul:</strong> {content.noteTitle}</p>
                <div className="note-content">
                  <p><strong>Isi Catatan:</strong></p>
                  <pre>{content.noteContent}</pre>
                </div>
                <p><strong>Arsip:</strong> {content.archived ? 'Aktif' : 'Nonaktif'}</p>
                <p><strong>Dibuat Pada:</strong> {new Date(content.createdAt).toLocaleString()}</p>
              </div>
            </>
          )}

          {content.type === 'edit' && (
            <>
              <h2>Edit Catatan</h2>
              <label htmlFor="editedTitle" style={{ color: '#a39d9d' }}>Judul:</label>
              <input
                type="text"
                id="editedTitle"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
              />
              <label htmlFor="editedBody" style={{ color: '#a39d9d' }}>Isi Catatan:</label>
              <textarea
                id="editedBody"
                value={editedBody}
                onChange={(e) => setEditedBody(e.target.value)}
              ></textarea>
              <button onClick={handleSaveEdit}>Simpan</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
