import 'dotenv/config'
import {PORT} from './config.js'
import express from 'express'
import cors from 'cors'
import pdfRouter from './routes/pdfRouter.js'
import connect from "../server/database/db.js"



const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', pdfRouter);


app.listen(PORT,async () => {
    console.log(`Server running on port ${PORT}`)
    await connect()
})
