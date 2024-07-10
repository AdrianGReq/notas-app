import React from 'react';
import Note from './Note';

const NoteList = ({ notes, setCurrentNote, deleteNote, filter }) => {
    const filteredNotes = filter.length > 0
        ? notes.filter(note => filter.includes(note.category))
        : notes;

    const handleEditNote = (note) => {
        setCurrentNote(note);
    };

    const handleDeleteNote = (id) => {
        deleteNote(id);
    };

    return (
        <div>
            {filteredNotes.map(note => (
                <Note 
                    key={note.id} 
                    note={note} 
                    onEdit={handleEditNote} 
                    onDelete={handleDeleteNote} 
                />
            ))}
        </div>
    );
};

export default NoteList;
