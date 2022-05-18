const express = require('express');
const router = express.Router();
const app = express()
const http = require('http')
const server = http.createServer(app)

/* GET home page. */
router.get('/', (req, res) => {
  res.send('<h1>Received a GET request. <h1>');
});

router.post('/', (req, res) => {
  res.send('Received a POST request. ');
});

module.exports = router;