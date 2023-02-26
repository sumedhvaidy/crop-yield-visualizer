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

  const getYIELDLBLRange = (label) => {
    if (label == 1) {
      return "0-57 bu/ac"
    } else if (label == 2) {
      return "58-83 bu/ac"
    } else if (label == 3) {
      return "84-245 bu/ac"
    } else if (label == 4) {
      return "246-862 bu/ac"
    } else if (label == 5) {
      return "863-1666 bu/ac"
    }
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
      <div className='body'>
       
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
                  {index === hoveredSquare && <div className='text'>
                      <p className='hover-text'>Seed Application: {Math.round(datum.AppliedRate)} seeds / acre</p>
                      <p className='hover-text'>Elevation: {Math.round(datum.Elevation)} ft </p>
                      <p className='hover-text'>Moisture: {datum.Moisture.toFixed(2)} %</p>
                      <p className='hover-text'>Predicted Yield: {getYIELDLBLRange(datum.YIELDLBL)}</p>
                  </div> }
                </div>

              })}
            </div>
          </div>
        </div>

        <div className="sub-group">
          <div className="button-group">
            <button className="button" name="farm1" onClick={handleFarmChange}>Farm 1</button>
            <button className="button" name="farm2" onClick={handleFarmChange}>Farm 2</button>
            <button className="button" name="farm3" onClick={handleFarmChange}>Farm 3</button>
            <p class="legend_text">Import a File</p>
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
              {/* <button className="submit">Submit</button> */}
            </form>
          </div>

          <div className="button-group">
            <div >
          <div className='legend_row'><button className='legend_purple legend_button' name="purple_label"></button><p class="legend_text" >0-57 bu/ac</p></div>
          <div className='legend_row'><button className='legend_blue legend_button' name="blue_label"></button><p class="legend_text"> 58-83 bu/ac</p></div>
          <div className='legend_row'><button className='legend_green legend_button' name="green_label"></button><p class="legend_text">84-245 bu/ac</p></div>
          <div className='legend_row'><button className='legend_yellow legend_button' name="yellow_label"></button><p class="legend_text">246-862 bu/ac</p></div>
          <div className='legend_row'><button className='legend_red legend_button' name="red_label"></button><p class="legend_text">863-1666 bu/ac</p></div>
        </div>
          </div>
        </div>

        

      </div>
    </div>
  );
}

export default App;
