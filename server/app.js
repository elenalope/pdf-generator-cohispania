import ('dotenv/config');
import {PORT} from './config.js'
import {connect} from './database/db.js'
import express from 'express'
import cors from 'cors'
import pdfRouter from './routes/pdfRouter.js'
import chapterRouter from './routes/chapterRouter.js'
import sectionRouter from './routes/sectionRouter.js'
import subsectionRouter from './routes/subsectionRouter.js'
import moduleRouter from './routes/moduleRouter.js';
import { addSectionFromChapter } from '../client/src/services/sectionFromChapter.js';

const app = express()

app.use(cors());
app.use(express.json());
app.use('/api', pdfRouter);
app.use('/api', chapterRouter);
app.use('/api', sectionRouter);
app.use('/api', subsectionRouter);
app.use('/api', moduleRouter);
app.use('/api', sectionFromChapter)

connect();


export const server = app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`)
});

export default app;