import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);

  const handleSquareHover = (index) => {
    setHoveredSquare(index);
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle submitting the selected file here
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await axios({
        method: 'post',
        url: '/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data; boundary=${form._boundary}',
        },
      });
      console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
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

          {/*<input type="file" onChange={handleFileInputChange} />
          <button type="submit">Submit</button>*/}
        </form>
      </div>
      <div className="grid-overlay-container">
        <div className="image-container">
          <img
            src="https://th.bing.com/th/id/OIP.tAkNielolc9DbHjTsLzm0AHaJQ?pid=ImgDet&rs=1"
            alt="your-image-description"
            className="grid-overlay-image"
          />
          <div className="grid-overlay">
            {[...Array(100)].map((_, index) => (
              <div
                key={index}
                className={`grid-cell ${index < 13 ? 'green' : 'red'} ${index === hoveredSquare ? 'hovered' : ''
                  }`}
                onMouseEnter={() => handleSquareHover(index)}
                onMouseLeave={() => handleSquareHover(null)}
              >
                {index === hoveredSquare &&
                  <div className="text">ABCD</div>}
              </div>

            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
