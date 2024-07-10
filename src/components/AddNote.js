import React, { useState } from 'react';

const AddNote = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('personal');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title && content) {
            onAdd({ title, content, category });
            setTitle('');
            setContent('');
            setCategory('personal');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="add-note-form mb-4 p-4 border rounded-md shadow-md bg-white">
            <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Title</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="input w-full p-2 border rounded bg-[#fffaf0]"
                    required
                />
            </div>
            <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="textarea w-full p-2 border rounded bg-[#fffaf0]"
                    rows="3"
                    required
                ></textarea>
            </div>
            <div className="mb-2">
                <label className="block text-sm font-semibold mb-1">Category</label>
                <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="select w-full p-2 border rounded bg-[#fffaf0]"
                    required
                >
                    <option value="personal">Personal</option>
                    <option value="work">Work</option>
                    <option value="tasks">Tasks</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <button type="submit" className="button w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Add Note</button>
        </form>
    );
};

export default AddNote;
