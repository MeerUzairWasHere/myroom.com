import express, { Response, Request } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from "mongoose"
//routes
import userRoutes from './routes/users.route'
import authRoutes from './routes/auth.route'
import cookieParser from 'cookie-parser'

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)


const start = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string)
        app.listen(process.env.PORT, () =>
            console.log(`Server is listening on port 5000...`)
        );
    } catch (error) {
        console.log(error);
    }
};

start();    