import mongoose, { Schema } from 'mongoose';
import {Template} from './Template.js'


const ChapterSchema = new mongoose.Schema({
    title: String,
    content: [String],
    templateFather: { type: mongoose.Schema.Types.ObjectId, ref: 'Template', required: true }
});

const Chapter = Template.discriminator('Chapter', ChapterSchema);

export  {Chapter}