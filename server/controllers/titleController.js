import { Template, Title } from '../models/Template.js';

export const addTitle = async (req, res) => {
    try {
        const { id } = req.params;
        const { title } = req.body;
        const newTitle = new Title(title);
        await newTitle.save();

        const document = await Template.findById(id);
        if (!document) {
            return res.status(404).json({ message: "Document not found" });
        }

        document.content.push(newTitle._id);
        await document.save();
        const populatedDocument = await Template.findById(id).populate({
            path: 'content',
            model: 'Title'
          }).exec();
        res.status(200).json(populatedDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteTitle = async (req, res) => {
    try {
        const { id, titleId } = req.params;
        const document = await Template.findById(id);

        if (!document) {
            return res.status(404).json({ message: "Section not found" });
        }

        document.content = document.content.filter(ch => ch._id.toString() !== titleId);
        await document.save();

        const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateTitle = async (request, response) => {
    try {
        const { id, titleId } = request.params;
        const { title } = request.body;

        const document = await Template.findById(id);
        if (!document) {
            return response.status(404).json({ message: "Title not found" });
        }
        const titleIndex = document.content.findIndex(ch => ch._id.toString() === titleId);
      if (titleIndex === -1) {
        return res.status(404).json({ message: "title not found" });
      }
  
      document.content[titleIndex] = { ...document.content[titleIndex], ...title};
      await document.save();
  
      const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};
