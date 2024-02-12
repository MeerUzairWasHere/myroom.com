import express, { Response, Request } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from './routes/users.route'
const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

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