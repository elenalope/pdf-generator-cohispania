import mongoose, { Schema } from 'mongoose';

const TemplateSchema = new mongoose.Schema({
    title: String,
    content: [String]
}, { _id: false, discriminatorKey: 'kind' });


const Template = mongoose.model('Template', TemplateSchema);


export  {Template}