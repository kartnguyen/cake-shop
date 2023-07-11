const express = require('express');
const app = express();
const client_view = require('./render_client.js');
const port = 3000;

app.use(express.static(__dirname + '/public'));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

app.get('/*', (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(client_view.html());
})