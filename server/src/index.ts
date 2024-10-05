import express from "express"
import dotenv from "dotenv"
import {version} from "../package.json"
import cors from "cors"
dotenv.config();
const APP_PORT = process.env.PORT;


const app = express()

// --- CORS --- //
app.use(cors())

// --- JSON parser --- //
app.use(express.json())


app.get("/", (req, res)=>{
	res.status(200).send({version})
})

app.listen(APP_PORT,()=>{
	console.log(`🔥 Server has started on http://localhost:${APP_PORT}`)
})