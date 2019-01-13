const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');

let app = express();
app.use(bodyParser.json());
app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = { app };
