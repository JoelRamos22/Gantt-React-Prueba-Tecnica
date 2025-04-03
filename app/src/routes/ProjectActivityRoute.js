const express = require('express');
const router = express.Router();
const controller = require('../controllers/ProjectActivityController');


router.get('/', controller.getAll);



module.exports = router;
