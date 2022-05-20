const express = require('express');
const router = express.Router();
const app = express()
const http = require('http')
const server = http.createServer(app)


// Homepage
router.get('/', (req, res) => {
  res.send('Received a GET request.');
});




module.exports = router;