const express = require('express');
const router = express.Router();

router.get('/status', (req, res) => {
  res.json({ status: 'OK', message: 'El servidor está funcionando correctamente' });
});

module.exports = router;
