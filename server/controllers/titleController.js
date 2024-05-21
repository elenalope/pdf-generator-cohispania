import { Template, TitleSchema } from '../models/Template.js';
import mongoose from 'mongoose';

export const addTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;

        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }
        /* const Title = mongoose.model('Title', TitleSchema);
        const newTitle = new Title(title); */
        document.content.push(title);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteTitle = async (req, res) => {
    try {
        const { id: templateId, titleId } = req.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return res.status(404).json({ message: "Template not found" });
        }

        const titleIndex = document.content.findIndex(title => title._id.toString() === titleId);

        if (titleIndex === -1) {
            return res.status(404).json({ message: "Title not found in this template" });
        }

        document.content.splice(titleIndex, 1);
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTitle = async (request, response) => {
    try {
        const { id: templateId, titleId } = request.params;
        const { title: updatedTitle } = request.body;
        const document = await Template.findById(templateId);// me busca el doc por el id
        if (!document) {
            return response.status(404).json({ message: "Template not found" });
        }
        const titleIndex = document.content.findIndex(title => title._id.equals(titleId));  // me busca el title por id

        if (titleIndex === -1) {
            return response.status(404).json({ message: "Title not found in this template" });
        }
        document.content[titleIndex] = { ...document.content[titleIndex]._doc, ...updatedTitle };//estoy actualizando los datos de title
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
