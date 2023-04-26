// Import packages
import express, { Express, Request, Response } from "express"
import { config } from "dotenv"

// dotenv configuration
config()
const PORT = process.env.PORT || 5000

// Initialize express
const app: Express = express()

// Home route
app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!")
})

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`)
})
