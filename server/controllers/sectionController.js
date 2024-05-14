// sectionController.js
import { Template } from '../models/Template.js';

export const addSection = async (req, res) => {
    try {
        const { id } = req.params;
        const { section } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        // Suponiendo que quieres añadir la sección al primer capítulo.
        if (document.content.length === 0 || !document.content[0].content) {
            return res.status(400).json({ message: "No chapters available to add a section" });
        }

        document.content[0].content.push(section);
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

        let sectionFound = false;

        // Iterar sobre los capítulos para encontrar y eliminar la sección
        for (const chapter of document.content) {
            const sectionIndex = chapter.content.findIndex(section => section._id.toString() === sectionId);

            if (sectionIndex !== -1) {
                chapter.content.splice(sectionIndex, 1);
                sectionFound = true;
                break;
            }
        }

        if (!sectionFound) {
            return res.status(404).json({ message: "Section not found in this template" });
        }

        await document.save();
        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
