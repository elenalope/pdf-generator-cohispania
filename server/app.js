import 'dotenv/config'
import {PORT} from './config.js'
import {connect} from './database/db.js'
import express from 'express'
import cors from 'cors'
import pdfRouter from './routes/pdf.js'


const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', pdfRouter);


connect();

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})