import express from 'express';
import color from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import connectDB from './config/db.js';
import { errorHandle } from './middlewares/errorMiddleware.js';
// import { notFound } from './middlewares/errorMiddleware.js';
import userRouter from './routers/userRouter.js';
import adminRouter from './routers/adminRouter.js';
import analysisRouter from './routers/analysisRouter.js';
import path from 'path';


// config for environment vaiables
dotenv.config()

// connect to database -> call the function
connectDB()

// initial express app
const app = express();


// Express middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors()) // Cross Origin Resource Sharing


// morgan only for development environment
if (process.env.NODE_ENV === 'development') {
    app.use(morgan("dev")) // its help to show response code and path
}


// Router
app.use('/api/users', userRouter)
app.use('/api/admin', adminRouter)
app.use('/api/analysis', analysisRouter)

// Error handle 
app.use(errorHandle)


// development mode 
// app.use(notFound)


// Heroku deployment

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
    
    app.use(express.static(path.join(__dirname, '/client/build')))

    app.get('*', (req, res) => 
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    )

}else{

    app.get('/', (req, res) => {
        res.send('API is running...')
    })
}

// app port
const PORT = process.env.PORT || 5000; 

// port listen
app.listen(PORT, () => {
    console.log(`server is running ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.bgYellow.black);
})