import express, { Response, Request } from 'express'
import cors from 'cors'
import "dotenv/config"
import mongoose from "mongoose"

const app = express();

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(cors())

app.get("/api/test", async (req: Request, res: Response) => {
    res.json({ mes: "hello" })
})



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