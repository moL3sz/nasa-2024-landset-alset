import express from "express"
import dotenv from "dotenv"
import {version} from "../package.json"
import cors from "cors"
import {dbo} from "./config/database.config";
import apiRouter from "./api.router";
dotenv.config();
const APP_PORT = process.env.PORT;


const app = express()

dbo.init()
// --- CORS --- //
app.use(cors())

// --- JSON parser --- //
app.use(express.json())


// --- API router ---
app.use("/api/v1", apiRouter)

app.get("/", (req, res)=>{
	res.status(200).send({version})
})

app.listen(APP_PORT,()=>{
	console.log(`🔥 Server has  started on http://localhost:${APP_PORT}`)
})