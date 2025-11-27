import React, { useState } from 'react';
import './App.css';

function App() {
  // ХРАНИЛИЩЕ ДАННЫХ - здесь хранятся все наши заметки
  const [notes, setNotes] = useState([]);
  
  // ТЕКУЩАЯ ЗАМЕТКА - которую мы сейчас смотрим или редактируем
  const [currentNote, setCurrentNote] = useState(notes[0]);
  
  // ПОИСК - что пользователь ввел в поле поиска
  const [search, setSearch] = useState('');

  // ДЛЯ РЕДАКТИРОВАНИЯ ЗАГОЛОВКА И ТЕКСТА
  const [editTitle, setEditTitle] = useState(currentNote?.title || '');
  const [editText, setEditText] = useState(currentNote?.text || '');

  // ФУНКЦИЯ: создаем новую заметку
  const addNewNote = () => {
    const newNote = {
      id: Date.now(), // уникальный номер (используем текущее время)
      title: 'Новая заметка',
      text: 'Начните писать здесь...'
    };
    
    // Добавляем новую заметку в начало списка
    setNotes([newNote, ...notes]);
    // И сразу ее открываем для редактирования
    setCurrentNote(newNote);
    setEditTitle('Новая заметка');
    setEditText('Начните писать здесь...');
  };

  // ФУНКЦИЯ: выбираем заметку для просмотра
  const selectNote = (note) => {
    setCurrentNote(note);
    setEditTitle(note.title);
    setEditText(note.text);
  };

  // ФУНКЦИЯ: обновляем заголовок заметки
  const updateNoteTitle = (newTitle) => {
    setEditTitle(newTitle);
    
    // Обновляем в текущей заметке
    const updatedNote = { ...currentNote, title: newTitle };
    setCurrentNote(updatedNote);
    
    // Ищем эту заметку в общем списке и обновляем ее
    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  // ФУНКЦИЯ: обновляем текст заметки
  const updateNoteText = (newText) => {
    setEditText(newText);
    
    const updatedNote = { ...currentNote, text: newText };
    setCurrentNote(updatedNote);
    
    const updatedNotes = notes.map(note => 
      note.id === currentNote.id ? updatedNote : note
    );
    setNotes(updatedNotes);
  };

  // ФУНКЦИЯ: удаляем заметку
  const deleteNote = (noteToDelete, e) => {
    e.stopPropagation(); // Чтобы при клике не открывалась заметка
    
    // Оставляем все заметки, кроме той, которую удаляем
    const filteredNotes = notes.filter(note => note.id !== noteToDelete.id);
    setNotes(filteredNotes);
    
    // Если удаляем текущую заметку, то выбираем первую из оставшихся
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

  // ФИЛЬТРАЦИЯ: ищем заметки по названию
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  // ВИЗУАЛЬНАЯ ЧАСТЬ - то, что видит пользователь
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