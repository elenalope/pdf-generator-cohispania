import { Template, Link } from '../models/Template.js';

export const addLink = async (req, res) => {
    try {
        const { id } = req.params;
        const { link } = req.body;
        if (!link || !link.src) {
            return res.status(400).json({ message: 'Invalid link data: src is required' });
        }
        const newLink = new Link(link);
        await newLink.save();

        const document = await Template.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        document.content.push(newLink._id);
        await document.save();

        const populatedDocument = await Template.findById(id).populate({
            path: 'content',
            model: 'Link'
        }).exec();
        res.status(200).json(populatedDocument);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: error.message });
    }
};


export const deleteLink = async (req, res) => {
    try {
        const { id: templateId, linkId } = req.params;
        const document = await Template.findById(templateId);

        if (!document) {
            return res.status(404).json({ message: "Template not found" });
        }
        const link = section.content.id(linkId);
        if (!link) {
            return res.status(404).json({ message: "Link not found" });
        }

        link.remove();
        await document.save();

        res.status(200).json(document);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateLink = async (request, response) => {
    try {
        const { id: templateId, linkId } = request.params;
        const { link: updatedLink } = request.body;
        const document = await Template.findById(templateId);// me busca el doc por el id
        if (!document) {
            return response.status(404).json({ message: "Template not found" });
        }
        const linkIndex = document.content.findIndex(link => link._id.equals(linkId));  // me busca el link por id

        if (linkIndex === -1) {
            return response.status(404).json({ message: "Link not found in this template" });
        }
        document.content[linkIndex] = { ...document.content[linkIndex]._doc, ...updatedLink };//estoy actualizando los datos de link
        await document.save();

        response.status(200).json(document);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
