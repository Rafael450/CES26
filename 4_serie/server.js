const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const util = require('util');


const readdir = util.promisify(fs.readdir);
const stat = util.promisify(fs.stat);


const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// POST route for file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.redirect('/');
});

// GET route for form data processing
app.get('/process-form', (req, res) => {
  const formData = req.query;
  res.send(`Received form data: ${JSON.stringify(formData)}`);
});

// Route to get list of files
app.get('/files', (req, res) => {
  fs.readdir('./public/uploads/', (err, files) => {
    if (err) {
      return res.status(500).send("Error reading files.");
    }
    res.json(files);
  });
});

// Updated route to support AJAX call to fetch JSON data about files
app.get('/get-json', async (req, res) => {
  try {
    const files = await readdir('./public/uploads/');
    const statsPromises = files.map(file => stat(`./public/uploads/${file}`));
    const stats = await Promise.all(statsPromises);

    let totalSize = 0;
    let biggestFile = { name: "", size: 0 };
    let smallestFile = { name: "", size: Infinity };
    let averageSize = 0;
    let totalFiles = stats.length;
    let latestFile = { name: "", date: 0 };

    stats.forEach((s, index) => {
      totalSize += s.size;
      if (s.size > biggestFile.size) {
        biggestFile = { name: files[index], size: s.size };
      }
      if (s.size < smallestFile.size) {
        smallestFile = { name: files[index], size: s.size };
      }
      if (s.mtimeMs > latestFile.date) {
        latestFile = { name: files[index], date: s.mtimeMs };
      }
    });

    averageSize = totalSize / totalFiles;

    res.json({
      files, 
      totalFiles,
      totalSize,
      averageSize,
      biggestFile,
      smallestFile,
      latestFile,
      // 5 other ideas:
      oldestFile: files[0],
      mostRecentUpload: files[files.length - 1],
      firstUploadedFileDate: stats[0]?.mtime || null,
      lastUploadedFileDate: stats[stats.length - 1]?.mtime || null,
      diskAvailable: 100 - ((totalSize / 1000000000) * 100)  // Assuming 1GB capacity for simplicity
    });
  } catch (err) {
    res.status(500).send("Error processing files.");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
