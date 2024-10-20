const express = require('express')
const dbConnect = require('./Config/DbConnect')
const cors = require("cors")
const app = express()
const dotenv = require("dotenv");
const port = 3000
const bodyParser = require("body-parser")
const path = require('path');

dotenv.config();
app.use(cors())
app.use(bodyParser.json())

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use("/api/Auth", require("./Routes/Auth.routes"))
app.use("/api/Movie", require("./Routes/Movie.routes"))

app.listen(port, () => {
  dbConnect()
  console.log(`server running port ${port}`)
})