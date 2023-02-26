import React, { useState } from 'react';
import axios from 'axios';
import './Navbar.css';

function Navbar() {
    const [selectedFile, setSelectedFile] = useState(null);

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
            // console.log(response.data)
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar__logo">Yield The Visualizer</div>
            <ul className="navbar__links">
                <li className><a>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="fileInput">
                            Choose JSON File
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
                </a>
                </li>
                <li className><a href="https://github.com/sumedhvaidy/crop-yield-visualizer">GitHub</a></li>
            </ul>
        </nav>
    );
}

export default Navbar;
