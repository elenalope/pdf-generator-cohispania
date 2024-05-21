import mongoose from 'mongoose';
import {Schema} from 'mongoose'

export const TitleSchema = new mongoose.Schema({
    content: { type: String, required: true },
    level: {
        type: String,
        enum: ['h1', 'h2', 'h3', 'h4', 'h5'], 
        default: 'h4' 
    },
    bold: {
        type: Boolean,
        default: true,
    },
    font: {
        type: String,
        default: 'open sans',
    },
    color: {
        type: String,
        default: 'black',
    },
    margin: {
        top: {
            type: Number,
            default: 10,
        },
        bottom: {
            type: Number,
            default: 10,
        },
        left: {
            type: Number,
            default: 10,
        },
        right: {
            type: Number,
            default: 10,
        }
    }
})

export const ParagraphSchema = new mongoose.Schema({
    text: { type: String, required: true },
    highlight: Boolean,
    color:String,
    fontSize: Number,
    margin: {
        top: Number,
        bottom: Number,
        left: Number,
        right: Number
    },
    padding: String,
    bold: Boolean,
    fontStyle: { 
        type: String, 
        enum: ['normal', 'italic', 'initial', 'inherit'], 
        default: 'normal'
     },
    textAlign: { 
        type: String, 
        enum: ['left', 'center', 'right', 'justify', 'initial', 'inherit'], 
        default: 'initial' 
    }
})

const ListSchema = new mongoose.Schema({
        content: [String],
        ordered:Boolean,
        margin: {
            top: Number,
            bottom: Number,
            left: Number,
            right: Number
        },
        justify: Boolean,
        fontSize: Number,
        bold:Boolean,
        fontStyle: { 
            type: String, 
            enum: ['normal', 'italic', 'initial', 'inherit'], 
            default: 'normal'
         }
    })

const SignatureSchema = new mongoose.Schema({
    fullName: String,
    position:String,
    party:String,
    cif:String,
    signature:String,
    margin: {
        top: Number,
        bottom: Number,
        left: Number,
        right: Number
    },
    size: Number,
    signedBy:Boolean
})    

const ImageSchema = new mongoose.Schema({
    src: { type: String, required: true },
    width: String,
    height: String,
    margin: {
        top: Number,
        bottom: Number,
        left: Number,
        right: Number
    },
    align: {
        type: String,
            enum: ['left', 'center', 'right', 'auto'],
            default:'center'
    }
})

const LinkSchema = new mongoose.Schema({
    src: { type: String, required: true },
    content: String,
    color: String,
    fontSize: Number,
    margin: {
        top: Number,
        bottom: Number,
        left: Number,
        right: Number
    },
    padding: String,
    bold: Boolean,
    fontStyle: { 
        type: String, 
        enum: ['normal', 'italic', 'initial', 'inherit'], 
        default: 'normal'
     },
    textAlign: { 
        type: String, 
        enum: ['left', 'center', 'right', 'justify', 'initial', 'inherit'], 
        default: 'initial' 
    },
})

const SubsectionSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    content: [
        TitleSchema,
        ParagraphSchema,
        ListSchema,
        SignatureSchema,
        ImageSchema,
        LinkSchema],
})


const SectionSchema = new mongoose.Schema({
    title: String,
    cover: Boolean,
    img: String,
    content: [
        TitleSchema,
        ParagraphSchema,
        ListSchema,
        SignatureSchema,
        ImageSchema,
        LinkSchema,
        SubsectionSchema
    ]
})

const ChapterSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    img: String,
    content: [
        SectionSchema,
        TitleSchema,
        ParagraphSchema,
        ListSchema,
        SignatureSchema,
        ImageSchema,
        LinkSchema
    ]
});

const TemplateSchema = new mongoose.Schema({
    name: String,
    title: TitleSchema,
    subtitle: String,
    highlightedValue:String,
    docExplanation: String,
    coverImg:String,
    coverLogo:String,
    headerLogo:String,
    toc: Boolean,
    tocLevels: Number,
    padding: String,
    sectionBreak:Boolean,
    watermark:String,
    includeCover: Boolean,
    includeBackCover: Boolean,
    theme:String,
    sectionVariant:String,
    orientation: String,
    size: String,
    signature:SignatureSchema,
    content: [
        ChapterSchema,
        SectionSchema,
        TitleSchema,
        ParagraphSchema,
        ListSchema,
        SignatureSchema,
        ImageSchema,
        LinkSchema
    ]
});


const Template = mongoose.model('Template', TemplateSchema);

export  {Template}