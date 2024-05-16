import { Template } from '../models/Template.js';

export const addSubsection = async (req, res) => {
    try {
        const { id, chapterId, sectionId } = req.params;
        const { subsection } = req.body;

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

        section.content.push(subsection);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteSubsection = async (req, res) => {
    try {
        const { id, chapterId, sectionId, subsectionId } = req.params;
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

        const subsection = section.content.id(subsectionId);
        if (!subsection) {
            return res.status(404).json({ message: "Subsection not found" });
        }

        subsection.remove();
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
