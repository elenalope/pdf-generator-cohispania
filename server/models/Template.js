import mongoose, {Schema} from 'mongoose';

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['chapter', 'section', 'subsection', 'paragraph', 'title', 'list', 'signature', 'image', 'link', 'break'],
        required: true
    },
    title: String,
    content: [String],
    src: String,
    level: String,
    cover: Boolean,
    ordered: Boolean,
    fullName: String,
    position: String,
    party:String,
    date: String
},{
        _id:false
    });
    
    const TemplateSchema = new Schema({
        title: String,
        subtitle: String,
        docExplanation:[String],
        highlightedValue: String,
        padding: String,
        toc:Boolean,
        data: [contentSchema],
        
        })
    
const Template = mongoose.model('Template', TemplateSchema);

export default Template;