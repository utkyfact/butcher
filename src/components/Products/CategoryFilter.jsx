import React from 'react';
import { CATEGORIES } from '../../utils/constants';

const CategoryFilter = ({ selected, onSelect }) => (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(category => (
        <button
          key={category}
          onClick={() => onSelect(category)}
          className={`px-4 py-2 rounded-xl font-medium transition-all ${
            selected === category 
              ? 'bg-red-600 text-white shadow-lg' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );

export default CategoryFilter;