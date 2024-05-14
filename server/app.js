import ('dotenv/config');
import {PORT} from './config.js'
import {connect} from './database/db.js'
import express from 'express'
import cors from 'cors'
import pdfRouter from './routes/pdfRouter.js'
import chapterRouter from './routes/chapterRouter.js'
import sectionRouter from './routes/sectionRouter.js'


const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', pdfRouter);
app.use('/api', chapterRouter);
app.use('/api', sectionRouter);
connect();

app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
})