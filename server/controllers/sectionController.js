import { Template } from '../models/Template.js';

export const addSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { section } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        document.content.push(section);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSection = async (req, res) => {
    try {
        const { id: templateId, sectionId } = req.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return res.status(404).json({ message: "Template not found" });
        }

        const sectionIndex = document.content.findIndex(section => section._id.toString() === sectionId);

        if (sectionIndex === -1) {
            return res.status(404).json({ message: "Section not found in this template" });
        }

        document.content.splice(sectionIndex, 1);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
