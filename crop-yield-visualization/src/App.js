import logo from './logo.svg';
import React, { useState } from 'react';
import axios from 'axios';
import Chance from 'chance';
import './App.css';
import farm1 from "./data/farm1";
import farm2 from "./data/farm2";
import farm3 from "./data/farm3";

import MyImage from './dirt.PNG';
import Navbar from './Navbar';
const chance = new Chance();
const sampleData = chance.n(() => {
  return chance.integer({ min: 1, max: 5 })
}, 100);



function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [farmDataset, setFarmDataset] = useState(farm1);

  const handleSquareHover = (index) => {
    setHoveredSquare(index);
  };

  const handleFileInputChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFarmChange = (event) => {
    if (event.target.name == "farm1") {
      setFarmDataset(farm1)
    }
    else if (event.target.name == "farm2") {
      setFarmDataset(farm2)
    }
    else setFarmDataset(farm3)

  }

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
      // console.log(response.data)
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <Navbar />
      <div>
        <button name="farm1" onClick={handleFarmChange}>Farm 1</button>
        <button name="farm2" onClick={handleFarmChange}>Farm 2</button>
        <button name="farm3" onClick={handleFarmChange}>Farm 3</button>
        {/* <p>You clicked {farmDataset}</p> */}
      </div>
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
            src={MyImage}
            alt="your-image-description"
            className="grid-overlay-image"
          />
          <div className="grid-overlay">
            {{ farmDataset }.farmDataset.map((datum, index) => {
              const keyMap = {
                1: 'purple',
                2: 'blue',
                3: 'green',
                4: 'yellow',
                5: 'red'
              }
              // {console.log(datum.YIELDLBL)}

              const desiredColor = keyMap[datum.YIELDLBL];
              return <div
                key={index}
                className={`grid-cell ${desiredColor} ${index === hoveredSquare ? 'hovered' : ''
                  } ${index < 50 && index % 10 < 5 ? "left-half" : ""
                  } ${index >= 50 && index % 10 >= 5 ? "right-half" : ""
                  }`}
                onMouseEnter={() => handleSquareHover(index)}
                onMouseLeave={() => handleSquareHover(null)}
              >
                {index === hoveredSquare &&
                  <div className="text">
                      <p>Seeding Applied Rate:{Math.round(datum.AppliedRate)} seeds / acre</p>
                      <p>Elevation:{Math.round(datum.Elevation)} ft </p>
                      <p>Moisture: {Math.round(datum.Moisture)} %</p>
                  </div>}
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
