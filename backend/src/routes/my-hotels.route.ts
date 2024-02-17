import express, { Request, Response } from 'express'
import User from '../models/user.model'
import multer from 'multer'
import { body, check, validationResult } from 'express-validator'
import { v2 as cloudinary } from "cloudinary";
import Hotel from '../models/hotel.model';
import { verifyToken } from '../middleware/auth.middleware';
import { HotelType } from '../shared/types';

const router = express.Router()

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 //5MB
    }
})

router.post("/", verifyToken, [
    check("name").notEmpty().withMessage("Name is required"),
    check("city").notEmpty().withMessage("City is required"),
    check("country").notEmpty().withMessage("Country is required"),
    check("description").notEmpty().withMessage("Description is required"),
    check("type").notEmpty().withMessage("Hotel type is required"),
    check("pricePerNight")
        .notEmpty()
        .isNumeric()
        .withMessage("Price per night is required and must be a number"),
    check("facilities")
        .notEmpty()
        .isArray()
        .withMessage("Facilities are required"),
], upload.array("imageFiles", 6), async (req: Request, res: Response) => {
    const errors = validationResult(req)
    const errorMsgs = errors.array().map(error => error.msg);

    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: errorMsgs })
    }
    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = req.body;

        const imageUrls = await uploadImages(imageFiles);

        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdated = new Date();
        newHotel.userId = req.userId;

        const hotel = new Hotel(newHotel);
        await hotel.save();

        res.status(201).send(hotel);
    } catch (error) {
        console.log("Error creating hotel:", error)
        res.status(500).json({ msg: "something went wrong!" })
    }
})




















async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        let dataURI = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.uploader.upload(dataURI);
        return res.url;
    });

    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
}

export default router;