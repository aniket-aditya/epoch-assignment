const express = require('express');
const morgan = require('morgan');
const convertRoutes = require('./routes/convert');

const app = express();
app.use(express.json());
app.use(morgan('combined'));

app.use('/convert', convertRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
