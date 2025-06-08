const express = require('express');
const path = require('path');
const archiver = require('archiver');
const fs = require('fs');

const app = express();
const PORT = 3000;

// Serve static files from public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to download the folder as zip
app.get('/download-folder', (req, res) => {
  const folderPath = path.join(__dirname, 'data');
  const archive = archiver('zip', { zlib: { level: 9 } });

  res.attachment('data-folder.zip');
  archive.directory(folderPath, false);
  archive.pipe(res);
  archive.finalize();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
