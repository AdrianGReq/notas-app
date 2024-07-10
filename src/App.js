import React, { useState, useEffect } from 'react';
import NoteList from './components/NoteList';
import AddNote from './components/AddNote';
import EditNote from './components/EditNote';
import CategoryFilter from './components/CategoryFilter';
import ChartComponent from './components/Chart';
import { getNotes, saveNotes } from './utils/data';
import './styles/main.css';

function App() {
    const [notes, setNotes] = useState([]);
    const [currentNote, setCurrentNote] = useState(null);
    const [filter, setFilter] = useState([]);

    useEffect(() => {
        const storedNotes = getNotes();
        setNotes(storedNotes);
    }, []);

    useEffect(() => {
        saveNotes(notes);
    }, [notes]);

    const addNote = (note) => {
        setNotes([...notes, { ...note, id: Date.now() }]);
    };

    const updateNote = (updatedNote) => {
        setNotes(notes.map(note => note.id === updatedNote.id ? updatedNote : note));
        setCurrentNote(null);
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    return (
        <div className="app-container mx-auto p-4 max-w-4xl" style={{ backgroundColor: '#f0f8fa' }}>
            <h1 className="text-2xl font-bold mb-4">Aplicación de Notas</h1>
            <CategoryFilter filter={filter} setFilter={setFilter} />
            <AddNote onAdd={addNote} />
            {currentNote && <EditNote note={currentNote} updateNote={updateNote} />}
            <NoteList 
                notes={notes} 
                setCurrentNote={setCurrentNote} 
                deleteNote={deleteNote} 
                filter={filter} 
            />
            <div className="mt-8">
                <ChartComponent notes={notes} filter={filter} />
            </div>
        </div>
    );
}

export default App;
