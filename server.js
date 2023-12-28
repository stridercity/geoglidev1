const express = require('express');
const app = express();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(express.static('public'));

app.post('/save-video', upload.single('video'), (req, res) => {
    const videoBuffer = req.file.buffer;

    const filePath = path.join(__dirname, 'uploads', 'animation.mp4');

    fs.writeFile(filePath, videoBuffer, (err) => {
        if (err) {
            console.error('Error saving video:', err);
            res.status(500).json({ success: false, message: 'Error saving video' });
        } else {
            console.log('Video saved successfully');
            res.setHeader('Content-Type', 'application/json'); // Set the content type to JSON
            res.json({ success: true, message: 'Video saved successfully' });
        }
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});