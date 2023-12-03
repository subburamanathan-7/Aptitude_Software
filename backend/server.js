const express = require ('express');
const colors = require('colors');
const dotenv = require('dotenv');


const connectDB = require('./config/dbconfig');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');

const { errorHandler, notFound } = require("./middlewares/errorMiddlewares")

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false})) //urlEncoded
app.use("/api/user/", userRoutes);
app.use("/api/question/", questionRoutes);



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running in ${process.env.MODE} mode on port ${process.env.PORT}`))


