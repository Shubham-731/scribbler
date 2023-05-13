// Import packages
import express, { Express, Request, Response } from "express"
import apiRoutes from "./apis/index"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
import { MONGO_URL, PORT, CLIENT_URL } from "./config/env"

// Initialize express
const app: Express = express()

// Middlewares
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", CLIENT_URL)
    res.header("Access-Control-Allow-Credentials", "true")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    )
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE")
    res.header("Access-Control-Expose-Headers", "Set-Cookie")
    next()
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// APIs
app.use("/api", apiRoutes)

// Connnect to db and start the server
mongoose
    .connect(MONGO_URL)
    .then(() => {
        console.log("Connected to DB!")
        // Start the server
        app.listen(PORT, () =>
            console.log(`Server listening on port ${PORT}...`)
        )
    })
    .catch((error) => {
        console.log("Unable to start the server!")
        throw error
    })
