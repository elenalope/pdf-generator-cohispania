import { Template, ParagraphSchema } from '../models/Template.js';
import mongoose from 'mongoose';

export const addParagraph = async (req, res) => {
    try {
        const { id } = req.params;
        const { paragraph } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        const Paragraph = mongoose.model('Paragraph', ParagraphSchema);
        const newParagraph = new Paragraph(paragraph);
        document.content.push(newParagraph);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteParagraph = async (req, res) => {
    try {
        const { id: templateId, paragraphId } = req.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return res.status(404).json({ message: "Template not found" });
        }
        const paragraph = section.content.id(paragraphId);
        if (!paragraph) {
            return res.status(404).json({ message: "Paragraph not found" });
        }

        paragraph.remove();
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
