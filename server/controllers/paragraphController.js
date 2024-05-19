import { Template, Paragraph } from '../models/Template.js';

export const addParagraph = async (req, res) => {
    try {
        const { id } = req.params;
        const { paragraph } = req.body;

        const newParagraph = new Paragraph(paragraph);
        await newParagraph.save();

        const document = await Template.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        document.content.push(newParagraph._id);
        await document.save();

        const populatedDocument = await Template.findById(id).populate({
            path: 'content',
            model: 'Paragraph'
          }).exec();
        res.status(200).json(populatedDocument);
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
