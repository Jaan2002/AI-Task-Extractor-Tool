//entry point
const app = require('./src/app');
const mongoose = require("mongoose");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("DB Error:", err));