// src/components/Grid.jsx
import React, { useState, useEffect } from 'react';
import Cell from './Cell';
import SearchBar from './SearchBar';

const GRID_SIZE = 1000;

const Grid = () => {
  const [data, setData] = useState(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill('')));
  const [filteredData, setFilteredData] = useState(data);
  const [formats, setFormats] = useState(Array.from({ length: GRID_SIZE }, () => Array(GRID_SIZE).fill({ alignment: 'text-left', fontSize: 'text-sm' })));

  const handleCellChange = (row, col, value) => {
    const newData = data.map((r, i) => r.map((cell, j) => (i === row && j === col ? value : cell)));
    setData(newData);
  };

  const handleFormatChange = (row, col, property, value) => {
    const newFormats = formats.map((r, i) => r.map((format, j) => (i === row && j === col ? { ...format, [property]: value } : format)));
    setFormats(newFormats);
  };

  const handleSearch = (query) => {
    const newFilteredData = data.map(row => row.map(cell => cell.includes(query) ? cell : ''));
    setFilteredData(newFilteredData);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <div className="grid grid-cols-10 gap-0">
        {filteredData.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Cell
              key={`${rowIndex}-${colIndex}`}
              row={rowIndex}
              col={colIndex}
              value={cell}
              onChange={handleCellChange}
              format={formats[rowIndex][colIndex]}
              onFormatChange={handleFormatChange}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Grid;
