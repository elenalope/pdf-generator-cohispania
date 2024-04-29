import mongoose, { Schema } from 'mongoose';

const SubsectionSchema = new mongoose.Schema({
    title: String,
    image: String,
    paragraph: String,
    content: [String],
},{_id : false})

const SectionSchema = new mongoose.Schema({
    title: String,
    cover: Boolean,
    image: String,
    link: String,
    paragraph: String,
    content: [String],
    Subsection: [SubsectionSchema]
},{_id : false})

const ChapterSchema = new mongoose.Schema({
    title: String,
    content: [SectionSchema]
},{_id : false});

const TemplateSchema = new mongoose.Schema({
    title: String,
    content: [ChapterSchema]
});

const Template = mongoose.model('Template', TemplateSchema);

export  {Template}