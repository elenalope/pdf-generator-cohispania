import { Chapter, Section } from '../models/Template.js';

export const addSectionFromChapter = async (req, res) => {
    try {
        const { id, chapterId } = req.params;
        const { section } = req.body;

        console.log('id chapter', chapterId);
        console.log('section data', section);
        
        const newSection = new Section({
            title: section.title,
            cover: section.cover,
            img: section.img,
            content: section.content
        });
        await newSection.save();

        const chapter = await Chapter.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: 'Chapter not found' });
        }

        chapter.content.push(newSection._id);
        await chapter.save();

        const populatedChapter = await Chapter.findById(chapterId).populate('content').exec();
        console.log('populatedChapter', populatedChapter);

        res.status(200).json(populatedChapter);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteSectionFromChapter = async (req, res) => {
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

export const updateSectionFromChapter = async (request, response) => {
    try {
        const { id: templateId, sectionId } = request.params;
        const { section: updatedSection } = request.body;
        const document = await Template.findById(templateId);// me busca el doc por el id
        if (!document) {
            return response.status(404).json({ message: "Template not found" });
        }
        const sectionIndex = document.content.findIndex(section => section._id.equals(sectionId));  // me busca el section por id

        if (sectionIndex === -1) {
            return response.status(404).json({ message: "Section not found in this template" });
        }
        document.content[sectionIndex] = { ...document.content[sectionIndex]._doc, ...updatedSection };//estoy actualizando los datos de section
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
