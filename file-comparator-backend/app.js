const express = require('express');
const multer = require('multer');
const compareController = require('./controllers/compareController');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.json());

app.post('/compare', upload.array('files', 2), compareController.compareFiles);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).json({ status: 'error', message: err.message });
  }
  next();
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
