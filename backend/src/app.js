const express= require('express');
const cors = require('cors');
const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//routes
const taskRoutes = require("./routes/taskRoutes");
app.use('/api/tasks',taskRoutes);
module.exports=app;
