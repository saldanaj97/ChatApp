const express = require('express');
const router = express.Router();
const app = express()
const http = require('http')
const server = http.createServer(app)

// Avoid the cors cross policy error
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // TODO: Change later for security?
  next();
});

// Homepage
router.get('/', (req, res) => {
  res.send('Received a GET request.');
});


module.exports = router;