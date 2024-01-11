const express = require ('express');
const colors = require('colors');
const dotenv = require('dotenv');

const cors = require('cors')
const path = require('path')

const _dirname = path.dirname("")
const buildpath = path.join(_dirname,"../frontend/build")


const connectDB = require('./config/dbconfig');
const userRoutes = require('./routes/userRoutes');
const questionRoutes = require('./routes/questionRoutes');
const responseRoutes = require('./routes/responseRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');


const { errorHandler, notFound } = require("./middlewares/errorMiddlewares")

dotenv.config();
connectDB();
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false})) //urlEncoded
app.use(cors({
    origin:"*"
})) //Cross-Orgin Access

app.use(express.static(buildpath))

app.use("/api/user/", userRoutes);
app.use("/api/question/", questionRoutes);
app.use("/api/response/", responseRoutes);
app.use("/api/feedback/", feedbackRoutes);

app.get('*',function(req,res){
    res.sendFile(path.join(__dirname,'../frontend/build/index.html'))
})

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server is up and running in ${process.env.MODE} mode on port ${process.env.PORT}`))


