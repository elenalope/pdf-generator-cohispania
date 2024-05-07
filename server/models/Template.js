import mongoose, {Schema} from 'mongoose';

const SubsectionSchema = new mongoose.Schema({
    title: String,
    image: String,
    paragraph: String,
    content: [String],
},{_id : false})

const SectionSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    signature: String,
    cover: Boolean,
    image: String,
    orientation: String,
    size: String,
    link: String,
    list: [String],
    Subsection: [SubsectionSchema]
},{_id : false})

const ChapterSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    image: String,
    content: [SectionSchema]
},{_id : false});

const TemplateSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    size: String,
    toc: Boolean,
    tocLevels: Number,
    padding: String,
    orientation: String,
    image: String,
    includeCover: Boolean,
    includeBackCover: Boolean,
    content: [ChapterSchema, SectionSchema]
});

const Template = mongoose.model('Template', TemplateSchema);

export  {Template}