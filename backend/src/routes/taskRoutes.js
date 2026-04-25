const express= require('express');
const router = express.Router();
const {extractTasks} = require('../components/taskController');
//POST /api/tasks/extract
router.post('/extract',extractTasks);
module.exports = router;
