import mongoose, { Schema } from 'mongoose';

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['chapter', 'section', 'subsection', 'title', 'paragraph', 'list', 'signature', 'image', 'link'],
        required: true
    },
    title: String,
    subtitle: String,
    img: String,
    content: {
        type: Schema.Types.Mixed,
        required: true
    },
    cover: Boolean,
    orientation: String,
    size: String,
    level: String,
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    highlight: Boolean,
    color: String,
    fontSize: Number,
    bold: Boolean,
    fontStyle: String,
    textAlign: String,
    ordered: Boolean,
    justify: Boolean,
    fullName: String,
    position: String,
    party: String,
    cif: String,
    signature: String,
    signedBy: Boolean,
    width: String,
    height: String,
    align: String,
    src: String,
    padding: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    theme: String,
    sectionVariant: String,
    includeCover: Boolean,
    includeBackCover: Boolean,
    toc: Boolean,
    tocLevels: Number,
    padding: String,
    sectionBreak: Boolean,
    watermark: String,
    config: {
        theme: String,
        sectionVariant: String,
        orientation: String,
        size: String
    }
}, {
    _id: false
});

const TemplateSchema = new Schema({
    title: String,
    subtitle: String,
    highlightedValue: String,
    docExplanation: [String],
    coverImg: String,
    coverLogo: String,
    headerLogo: String,
    toc: Boolean,
    tocLevels: Number,
    padding: String,
    sectionBreak: Boolean,
    watermark: String,
    includeCover: Boolean,
    includeBackCover: Boolean,
    config: {
        theme: String,
        sectionVariant: String,
        orientation: String,
        size: String
    },
    data: [contentSchema]
});

const Template = mongoose.model('Template', TemplateSchema);
export default Template;