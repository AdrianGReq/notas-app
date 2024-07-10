import React from 'react';

const Note = ({ note, onEdit, onDelete }) => {
    const { id, title, content, category } = note;

    const categoryColors = {
        personal: '#8eb8e5', // Aumentar la saturación de azul
        work: '#d3b8ae',
        tasks: '#6cbf6f', // Aumentar la saturación de verde
        other: '#d6b8db',
    };

    const lightCategoryColors = {
        personal: '#e3f2fd',
        work: '#f7f1ef',
        tasks: '#d0f1d1',
        other: '#f9f3fa',
    };

    const categoryIcons = {
        personal: 'icon-personal.png',
        work: 'icon-work.png',
        tasks: 'icon-tasks.png',
        other: 'icon-other.png',
    };

    return (
        <div className="p-4 border-l-4 rounded-md shadow-md mb-4 flex items-center justify-between" style={{ backgroundColor: lightCategoryColors[category], borderColor: categoryColors[category] }}>
            <div className="flex-1">
                <h3 className="text-lg font-semibold">{title}</h3>
                <p className="text-gray-700">{content}</p>
            </div>
            <div className="flex items-center space-x-4">
                <img src={categoryIcons[category]} alt={category} className="w-12 h-12 object-contain" />
                <div className="flex space-x-2">
                    <button onClick={() => onEdit(note)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                    <button onClick={() => onDelete(id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                </div>
            </div>
        </div>
    );
};

export default Note;
