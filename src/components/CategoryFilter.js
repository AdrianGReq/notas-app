import React from 'react';

const CategoryFilter = ({ filter, setFilter }) => {
    const categories = ['personal', 'work', 'tasks', 'other'];

    const handleChange = (event) => {
        const { value, checked } = event.target;
        if (checked) {
            setFilter([...filter, value]);
        } else {
            setFilter(filter.filter(category => category !== value));
        }
    };

    return (
        <div className="mb-4">
            <h2 className="text-lg font-bold">Filtrar por categoría</h2>
            {categories.map(category => (
                <label key={category} className="mr-4">
                    <input
                        type="checkbox"
                        value={category}
                        checked={filter.includes(category)}
                        onChange={handleChange}
                    />
                    {category}
                </label>
            ))}
        </div>
    );
};

export default CategoryFilter;
