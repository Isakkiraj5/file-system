const express = require("express");
const dotenv = require('dotenv');
const fs = require('fs');

const app = express();

dotenv.config();

// API endpoint to create a text file with current timestamp
app.get('/createFile', async (req, res) => {
    try {
        const timestamp = new Date().toISOString().replace(/:/g, '-'); 
        const filename = `${timestamp}.txt`;

        await fs.promises.writeFile(`./current/${filename}`, timestamp);
        res.send(`File ${filename} created successfully`);
    } catch (err) {
        console.error('Error creating file:', err);
        res.status(500).send("Error creating file");
    }
});

// API endpoint to retrieve all text files in the folder
app.get('/getTextFiles', async (req, res) => {
    try {
        const files = await fs.promises.readdir('./current');
        const textFiles = files.filter(file => file.endsWith('.txt'));
        res.json(textFiles);
    } catch (err) {
        console.error('Error retrieving files:', err);
        res.status(500).send("Error retrieving files");
    }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server listening on port", PORT));
