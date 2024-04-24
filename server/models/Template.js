import mongoose from 'mongoose';

const contentSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['chapter', 'section', 'subsection', 'paragraph', 'title', 'list', 'signature', 'image', 'link', 'break'],
        required: true
    },
     title: {
        type: String,
        required: true
     },
     content: [String],
     src: {
        type: String,
        required: false
     },
     level: {
        type: String,
        required: false
     },
    cover: {
        type: Boolean,
        default: false
    },
    ordered: {
        type: Boolean,
        default: false
    },
    fullName: {
        type: String,
        required: false
    },
    position: {
        type: String,
        required: false
    },
    party:{
        type: String,
        required: false
    },
    date: {
        type: String,
        required: false
    }},{
        _id:false
    });
    
    const TemplateSchema = new Schema({
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: false
        },
        docExplanation:[String],
        highlightedValue: {
            type: String,
            required: false
        },
        padding: {
            type: String,
            required: false
        },
        toc:{
            type: Boolean,
            required: false
        },
        data: [contentSchema],
        
        })
    



const Template = mongoose.model('Template', TemplateSchema);

export default Template;