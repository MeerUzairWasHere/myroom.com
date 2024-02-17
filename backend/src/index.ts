import express, { Response, Request } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from "mongoose"
import { v2 as cloudinary } from "cloudinary";
import cookieParser from 'cookie-parser'
import path from 'path'


//routes
import userRoutes from './routes/users.route'
import authRoutes from './routes/auth.route'
import myHotelsRoutes from "./routes/my-hotels.route";

const app = express();

app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/users", userRoutes)
app.use("/api/v1/my-hotels", myHotelsRoutes)

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.resolve(__dirname, "../../frontend/dist", "index.html"));
});

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