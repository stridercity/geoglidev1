const express = require('express');
const cors = require('cors'); // Add the cors middleware
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Set up Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Define the /save-video route
app.post('/save-video', upload.single('video'), (req, res) => {
    console.log('Received POST request to /save-video');

    if (!req.file) {
        console.error('No video file received');
        return res.status(400).json({ success: false, message: 'No video file received' });
    }

    const videoBuffer = req.file.buffer; // Buffer containing the video data

    // Specify the file path where you want to save the video
    const filePath = path.join(__dirname, 'uploads', 'animation.mp4');

    // Write the buffer to a file
    fs.writeFile(filePath, videoBuffer, (err) => {
        if (err) {
            console.error('Error saving video:', err);
            return res.status(500).json({ success: false, message: 'Error saving video' });
        }

        console.log('Video saved successfully');
        res.json({ success: true, message: 'Video saved successfully' });
    });
});

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});