import { config } from "dotenv"

config()
const NODE_ENV: string = process.env.NODE_ENV || "DEV"
const MONGO_URL: string =
    (NODE_ENV === "PROD"
        ? process.env.MONGO_URL_PROD
        : process.env.MONGO_URL_DEV) || ""
const JWT_SECRET: string = process.env.JWT_SECRET || ""
const PORT: number | string = process.env.PORT || 5000
const CLIENT_URL: string = process.env.CLIENT_URL || ""

if (!MONGO_URL || !JWT_SECRET || !PORT || !CLIENT_URL) {
    throw new Error("Missing environment variables")
}

export { MONGO_URL, JWT_SECRET, PORT, CLIENT_URL, NODE_ENV }
