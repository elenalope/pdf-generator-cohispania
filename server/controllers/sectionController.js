import { Template, Section } from '../models/Template.js';

export const addSection = async (req, res) => {
  try {
    const { id } = req.params;
    const { section } = req.body;

    const newSection = new Section(section);
    await newSection.save();
    const document = await Template.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.content.push(newSection._id);
    await document.save();

    const populatedDocument = await Template.findById(id).populate({
      path: 'content',
      model: 'Section'
    }).exec();
    res.status(200).json(populatedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  
export const getSectionById = async (req, res) => {
  try {
    const { id, sectionId } = req.params;

    const document = await Template.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    const section = await Section.findById(sectionId)
      .populate({
        path: 'content',
        populate: [
          { path: 'content', model: 'Title' },
          { path: 'content', model: 'Paragraph' },
          { path: 'content', model: 'List' },
          { path: 'content', model: 'Signature' },
          { path: 'content', model: 'Image' },
          { path: 'content', model: 'Link' },
          { path: 'content', model: 'Subsection', populate: [
            { path: 'content', model: 'Title' },
            { path: 'content', model: 'Paragraph' },
            { path: 'content', model: 'List' },
            { path: 'content', model: 'Signature' },
            { path: 'content', model: 'Image' },
            { path: 'content', model: 'Link' }
          ] }
        ]
      });

    if (!section) {
      return res.status(404).json({ message: "Section not found" });
    }

    res.status(200).json(section);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

  

  export const updateSection = async (req, res) => {
    try {
      const { id, sectionId } = req.params;
      const { section } = req.body;
  
      const document = await Template.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const sectionIndex = document.content.findIndex(ch => ch._id.toString() === sectionId);
      if (sectionIndex === -1) {
        return res.status(404).json({ message: "Section not found" });
      }
  
      document.content[sectionIndex] = { ...document.content[sectionIndex], ...section };
      await document.save();
  
      const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const deleteSection = async (req, res) => {
    try {
      const { id, sectionId } = req.params;
  
      const document = await Template.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      document.content = document.content.filter(ch => ch._id.toString() !== sectionId);
      await document.save();
  
      const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };