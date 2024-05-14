import { Template } from '../models/Template.js'; 

export const addChapter = async (request, response) => {
    try {
        const { id } = request.params;
        const { chapter } = request.body;

        const document = await Template.findById(id);

        if (!document) {
            return response.status(404).json({ message: "Document not found" });
        }
        document.content.push(chapter);
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const deleteChapter = async (request, response) => {
    try {
        const { id: templateId , chapterId } = request.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return response.status(404).json({ message: "Template not found" });
        }
        const chapterIndex = document.content.findIndex(chapter => chapter._id === chapterId);

        if (chapterIndex === -1) {
            return response.status(404).json({ message: "Chapter not found in this template" });
        }
        document.content.splice(chapterIndex, 1);
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}