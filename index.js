import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import {Book} from "./models/bookModel.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";



const app = express();

app.use(express.json()); //Middleware for parsing request body


//Middleware for handling CORS policy
app.use(cors());

//Handling cors for custom origins
// app.use(cors({
//     origin: 'http://sample',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type']
// }))



app.get('/', (req, res)=>{
    console.log(req);
    return res.status(234).send("I'm leaning MERN stack from scratch");
});

app.use('/books', booksRoute);

mongoose.connect(mongoDBURL)
    .then(()=>{
        console.log("App connected to database");
        app.listen(PORT, (error) => {
            if (error) {
                console.error("Error starting the server:", error);
            } else {
                console.log(`App is listening to port: ${PORT}`);
            }
        });
    }).catch((error)=>{
        console.error(error);
    })
