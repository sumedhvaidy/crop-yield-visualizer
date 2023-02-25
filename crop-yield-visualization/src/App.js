import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle submitting the selected file here
    console.log('Selected file:', selectedFile);
  };

  return (
    <div className="App">
      <h1>Import a File</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="fileInput" className="fileInputButton">
          Choose File
        </label>
        <input
          id="fileInput"
          type="file"
          accept=".csv,.xlsx,.pdf" // Limit file types to only allow CSV, XLSX, and PDF files
          onChange={handleFileInputChange}
        />
        {selectedFile && <p>Selected file: {selectedFile.name}</p>}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
