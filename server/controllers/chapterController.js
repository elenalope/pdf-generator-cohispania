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
        /* const newChapter = document.content[document.content.length - 1]; */

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

export const getChapterById = async (request, response) => {
    try {
        const { id: templateId, chapterId } = request.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return response.status(404).json({ message: "Document not found" });
        }

        const chapter = document.content.id(chapterId);
        
        if (!chapter) {
            return response.status(404).json({ message: "Chapter not found" });
        }

        response.status(200).json(chapter);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};


export const getChapters = async (request, response) => {
    try {
        const { id } = request.params;
        const document = await Template.findById(id);

        if (!document) {
            return response.status(404).json({ message: "Document not found" });
        }

        response.status(200).json(document.content);
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
        const chapterIndex = document.content.findIndex(chapter => chapter._id.equals(chapterId));

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


export const updateChapter = async (request, response) => {
    try {
        const { id: templateId, chapterId } = request.params;
        const { chapter: updatedChapter } = request.body;
        const document = await Template.findById(templateId);// me busca el doc por el id
        if (!document) {
            return response.status(404).json({ message: "Template not found" });
        }
        const chapterIndex = document.content.findIndex(chapter => chapter._id.equals(chapterId));  // me busca el chapter por id

        if (chapterIndex === -1) {
            return response.status(404).json({ message: "Chapter not found in this template" });
        }
        document.content[chapterIndex] = { ...document.content[chapterIndex]._doc, ...updatedChapter };//estoy actualizando los datos de chapter
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};