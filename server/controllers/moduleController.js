import { Template } from '../models/Template.js';

export const addModule = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, content, options } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        const module = { type, content, options };
        document.content.push(module);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteModule = async (req, res) => {
    try {
        const { id, moduleId } = req.params;
        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        const moduleIndex = document.content.findIndex(module => module._id.toString() === moduleId);

        if (moduleIndex === -1) {
            return res.status(404).json({ message: "Module not found in this template" });
        }

        document.content.splice(moduleIndex, 1);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status500.json({ message: error.message });
    }
};
