import mongoose, {Schema} from 'mongoose';

const TitleSchema = new mongoose.Schema({
    content: String,
    level: {
        type: String,
        enum: ['h1', 'h2', 'h3', 'h4', 'h5'], 
        default: 'h3' 
    },
    bold: Boolean,
    font: String,
    color: String,
    margin: {
        top: Number,
        bottom: Number,
        left: Number,
        right: Number
    }
},{_id : false})

const ParagraphSchema = new mongoose.Schema({
    content: String,
    Highlight: Boolean,
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
    },},{_id : false})

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
    },{_id : false})

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
    size: { 
        type: Number
     },
     signedBy:Boolean
},{_id : false})    

const ImageSchema = new mongoose.Schema({
    src: String,
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
},{_id : false})

const LinkSchema = new mongoose.Schema({
    src: String,
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
},{_id : false})

const SubsectionSchema = new mongoose.Schema({
    title: TitleSchema,
    paragraph: ParagraphSchema,
    content: [String],
})


const SectionSchema = new mongoose.Schema({
    title: String,
    paragraph: String,
    cover: Boolean,
    img: String,
    orientation: String,
    size: String,
    link: LinkSchema,
    Subsection: [SubsectionSchema]
})

const ChapterSchema = new mongoose.Schema({
    title: String,
    subtitle: String,
    img: String,
    content: [SectionSchema]
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
    content: [ChapterSchema, SectionSchema]
});


const Template = mongoose.model('Template', TemplateSchema);
const Chapter = mongoose.model('Chapter', ChapterSchema);
export  {Template, Chapter}