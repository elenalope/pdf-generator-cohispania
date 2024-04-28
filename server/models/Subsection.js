import mongoose, { Schema } from 'mongoose';
import {Template} from './Template.js'



const SubsectionSchema = new mongoose.Schema({
    title: String,
    image: String,
    paragraph: String,
    content: [String],
})

const Subsection = Template.discriminator('Subsection', SubsectionSchema);

export{Subsection}