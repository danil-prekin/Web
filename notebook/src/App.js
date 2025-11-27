import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  
  const [currentNote, setCurrentNote] = useState(notes[0]);
  
  const [search, setSearch] = useState('');

  const [editTitle, setEditTitle] = useState(currentNote?.title || '');
  const [editText, setEditText] = useState(currentNote?.text || '');


  const addNewNote = () => {
    const newNote = {
      id: Date.now(), 
      title: 'Новая заметка',
      text: 'Начните писать здесь...'
    };
    
    setNotes([newNote, ...notes]);
    setCurrentNote(newNote);
    setEditTitle('Новая заметка');
    setEditText('Начните писать здесь...');
  };

  const selectNote = (note) => {
    setCurrentNote(note);
    setEditTitle(note.title);
    setEditText(note.text);
  };

  const updateNoteTitle = (newTitle) => {
    setEditTitle(newTitle);
    
    const updatedNote = { ...currentNote, title: newTitle };
    setCurrentNote(updatedNote);
    
    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const updateNoteText = (newText) => {
    setEditText(newText);
    
    const updatedNote = { ...currentNote, text: newText };
    setCurrentNote(updatedNote);
    
    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  const deleteNote = (noteToDelete, e) => {
    e.stopPropagation(); 
    
    const filteredNotes = notes.filter(note => note.id !== noteToDelete.id);
    setNotes(filteredNotes);
    

    if (currentNote.id === noteToDelete.id) {
      if (filteredNotes.length > 0) {
        setCurrentNote(filteredNotes[0]);
        setEditTitle(filteredNotes[0].title);
        setEditText(filteredNotes[0].text);
      } else {
        setCurrentNote(null);
        setEditTitle('');
        setEditText('');
      }
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );


  return (
    <div className="notebook">
      
      {/* ЛЕВАЯ КОЛОНКА - список заметок */}
      <div className="sidebar">
        <h2>Мои заметки</h2>
        
        {/* Кнопка добавления новой заметки */}
        <button className="add-btn" onClick={addNewNote}>
          + Новая заметка
        </button>
        
        {/* Поле поиска */}
        <input
          type="text"
          placeholder="Поиск заметок..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        
        {/* Список заметок */}
        <div className="notes-list">
          {filteredNotes.length === 0 ? (
            <div className="no-notes">
              {search ? 'Заметки не найдены' : 'Нет заметок'}
            </div>
          ) : (
            filteredNotes.map(note => (
              <div
                key={note.id}
                className={`note-item ${currentNote?.id === note.id ? 'active' : ''}`}
                onClick={() => selectNote(note)}
              >
                <div className="note-header">
                  <h3>{note.title}</h3>
                  <button 
                    className="delete-btn"
                    onClick={(e) => deleteNote(note, e)}
                  >
                    ×
                  </button>
                </div>
                <p>{note.text.substring(0, 30)}...</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* ПРАВАЯ КОЛОНКА - редактор текста */}
      <div className="editor">
        {currentNote ? (
          <>
            {/* ПОЛЕ ДЛЯ РЕДАКТИРОВАНИЯ ЗАГОЛОВКА */}
            <input
              type="text"
              value={editTitle}
              onChange={(e) => updateNoteTitle(e.target.value)}
              placeholder="Название заметки"
              className="title-input"
            />
            
            {/* БОЛЬШОЕ ПОЛЕ ДЛЯ ТЕКСТА */}
            <textarea
              value={editText}
              onChange={(e) => updateNoteText(e.target.value)}
              placeholder="Начните писать вашу заметку..."
              className="text-editor"
            />
          </>
        ) : (
          <div className="welcome-message">
            <h2>Добро пожаловать в блокнот!</h2>
            <p>Создайте новую заметку или выберите существующую из списка слева.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;