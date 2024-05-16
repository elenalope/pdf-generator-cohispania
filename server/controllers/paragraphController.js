import { Template } from '../models/Template.js';

export const addParagraph = async (req, res) => {
    try {
        const { id, chapterId, sectionId } = req.params;
        const { paragraph } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        const chapter = document.content.id(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        const section = chapter.content.id(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
        }

        section.content.push(paragraph);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteParagraph = async (req, res) => {
    try {
        const { id, chapterId, sectionId, paragraphId } = req.params;
        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Template not found" });
        }

        const chapter = document.content.id(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: "Chapter not found" });
        }

        const section = chapter.content.id(sectionId);
        if (!section) {
            return res.status(404).json({ message: "Section not found" });
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
