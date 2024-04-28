import mongoose, { Schema } from 'mongoose';
import {Template} from './Template.js'



const SectionSchema = new mongoose.Schema({
    title: String,
    cover: Boolean,
    image: String,
    link: String,
    paragraph: String,
    content: [String],
})

const Section = Template.discriminator('Section', SectionSchema);

export  {Section}
