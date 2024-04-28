import mongoose, { Schema } from 'mongoose';

const TemplateSchema = new mongoose.Schema({
    title: String,
    content: [String]
});

const Template = mongoose.model('Template', TemplateSchema);


////

const ChapterSchema = new mongoose.Schema({
    title: String,
    content: [String],
    templateFather : {type: Schema.Types.ObjectId, ref: 'Template'}
});

const Chapter = Template.discriminator('Chapter', ChapterSchema);

////

const SectionSchema = new mongoose.Schema({
    title: String,
    cover: Boolean,
    image: String,
    link: String,
    paragraph: String,
    content: [{String}],
    templateFather : {type: Schema.Types.ObjectId, ref: 'Template'}
})

const Section = Template.discriminator('Section', SectionSchema);

////

const SubsectionSchema = new mongoose.Schema({
    title: String,
    image: String,
    paragraph: String,
    content: [String],
    templateFather : {type: Schema.Types.ObjectId, ref: 'Template'}
})

const Subsection = Template.discriminator('Subsection', SubsectionSchema);


module.exports = {Template, Chapter, Section, Subsection}