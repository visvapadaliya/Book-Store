const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const bookRoutes = require('./routes/BookRoute');

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bookRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports=app;