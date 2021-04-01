const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path')
const dotenv = require("dotenv")

const app = express();
const connectDb = require('./config/connect')
dotenv.config({ path: "./config/.env" });
connectDb()



const auth = require('./routes/auth')
const category = require('./routes/category')
const user = require('./routes/user')
const blog = require('./routes/blog')


app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors());


app.use('/api', auth)
app.use('/api', user)
app.use('/api', category)
app.use('/api', blog)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});