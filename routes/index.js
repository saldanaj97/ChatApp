const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.send('Received a GET request. ');
});

router.post('/', (req, res) => {
  res.send('Received a POST request. ');
});

router.put('/', (req, res) => {
  res.send('Received a PUT request. ');
});

router.delete('/', (req, res) => {
  res.send('Received a DELETE request.');
});

module.exports = router;