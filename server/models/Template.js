import mongoose, {Schema} from 'mongoose';

// Title
const TitleSchema = new mongoose.Schema({
    content: {type: String, required:true},
    level: { type: String, enum: ['h1', 'h2', 'h3', 'h4', 'h5'] },
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    }
}, { _id: false });

const SubtitleSchema = new mongoose.Schema({
    content: String,
    level: { type: String, enum: ['h2', 'h3', 'h4', 'h5'] },
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    }
}, { _id: false });
// Paragraph
const ParagraphSchema = new mongoose.Schema({
    content: String,
    highlight: Boolean,
    color: String,
    fontSize: {type: Number, min:8, max: 26},
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    padding: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    bold: Boolean,
    fontStyle: { type: String, enum: ['normal', 'italic', 'initial', 'inherit'] },
    textAlign: { type: String, enum: ['left', 'center', 'right', 'justify', 'initial', 'inherit'] }
}, { _id: false });

// List
const ListSchema = new mongoose.Schema({
    content: [String],
    ordered: Boolean,
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    justify: Boolean,
    fontSize: Number,
    bold: Boolean,
    fontStyle: { type: String, enum: ['normal', 'italic', 'initial', 'inherit'] }
}, { _id: false });

// Signature
const SignatureSchema = new mongoose.Schema({
    fullName: String,
    position: String,
    party: String,
    cif: String,
    signature: String,
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    size: { height: Number },
    signedBy: Boolean
}, { _id: false });

// Image
const ImageSchema = new mongoose.Schema({
    src: String,
    width: String,
    height: String,
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    align: { type: String, enum: ['left', 'center', 'right', 'auto'] }
}, { _id: false });

// Link
const LinkSchema = new mongoose.Schema({
    src: String,
    content: String,
    color: String,
    fontSize: Number,
    margin: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    padding: {
        top: Number,
        left: Number,
        bottom: Number,
        right: Number
    },
    bold: Boolean,
    fontStyle: { type: String, enum: ['normal', 'italic', 'initial', 'inherit'] },
    textAlign: { type: String, enum: ['left', 'center', 'right', 'justify', 'initial', 'inherit'] }
}, { _id: false });

////
const SubsectionSchema = new mongoose.Schema({
    title: TitleSchema,
    image: ImageSchema,
    paragraph: ParagraphSchema,
    content: [String],
},{_id : false})

const SectionSchema = new mongoose.Schema({
    title: TitleSchema,
    paragraph: ParagraphSchema,
    signature: SignatureSchema,
    cover: Boolean,
    image: ImageSchema,
    link: LinkSchema,
    break: Boolean,
    list: LinkSchema,
    content: [
        {
            type: Schema.Types.Mixed,
            content:[TitleSchema, ParagraphSchema, ListSchema, SignatureSchema, ImageSchema, LinkSchema]
        }    
    ],
    Subsection: [SubsectionSchema]
},{_id : false})

const ChapterSchema = new mongoose.Schema({
    title: TitleSchema,
    subtitle: SubtitleSchema,
    image: ImageSchema,
    content: [SectionSchema]
},{_id : false});

const TemplateSchema = new mongoose.Schema({
    title: TitleSchema,
    content: [ChapterSchema, SectionSchema]
});

const Template = mongoose.model('Template', TemplateSchema);

export  {Template}