const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001

app.listen(PORT, () => {})

app.use(express.static('build'))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './build/index.html'))
})