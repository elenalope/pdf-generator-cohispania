import 'dotenv/config'
import {PORT} from './config.js'
import {connect} from './database/db.js'
import express from 'express'
import cors from 'cors'


const app = express()

app.use(cors());
app.use(express.json());
app.use('/', );
