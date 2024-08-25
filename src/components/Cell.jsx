// src/components/Cell.jsx
import React, { useState } from 'react';

const Cell = ({ row, col, value, onChange, format, onFormatChange }) => {
  const [isEditing, setEditing] = useState(false);
  const [cellValue, setCellValue] = useState(value);

  const handleDoubleClick = () => setEditing(true);

  const handleChange = (e) => setCellValue(e.target.value);

  const handleBlur = () => {
    onChange(row, col, cellValue);
    setEditing(false);
  };

  const handleFormatChange = (e) => {
    onFormatChange(row, col, e.target.name, e.target.value);
  };

  return (
    <div
      className={`border border-gray-300 p-2 text-center ${format.alignment} ${format.fontSize}`}
      onDoubleClick={handleDoubleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={cellValue}
          onChange={handleChange}
          onBlur={handleBlur}
          autoFocus
          className="w-full h-full p-1 border border-gray-300"
        />
      ) : (
        cellValue
      )}
      <select
        name="alignment"
        value={format.alignment}
        onChange={handleFormatChange}
        className="absolute right-1 top-1"
      >
        <option value="text-left">Left</option>
        <option value="text-center">Center</option>
        <option value="text-right">Right</option>
      </select>
      <select
        name="fontSize"
        value={format.fontSize}
        onChange={handleFormatChange}
        className="absolute right-1 top-5"
      >
        <option value="text-xs">Small</option>
        <option value="text-sm">Medium</option>
        <option value="text-lg">Large</option>
      </select>
    </div>
  );
};

export default Cell;
