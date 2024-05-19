import { Template, Chapter } from '../models/Template.js';

export const addChapter = async (req, res) => {
  try {
    const { id } = req.params;
    const { chapter } = req.body;
    const newChapter = new Chapter(chapter);
    await newChapter.save();

    const document = await Template.findById(id);
    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    document.content.push(newChapter._id);
    await document.save();

    const populatedDocument = await Template.findById(id).populate('content');
    res.status(200).json(populatedDocument);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getChapters = async (req, res) => {
    try {
      const { id } = req.params;
      const document = await Template.findById(id).populate('content');
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      res.status(200).json(document.content);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const getChapterById = async (req, res) => {
    try {
      const { id, chapterId } = req.params;
      const document = await Template.findById(id).populate('content');
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
      const chapter = document.content.id(chapterId);
      if (!chapter) {
        return res.status(404).json({ message: "Chapter not found" });
      }
      res.status(200).json(chapter);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const updateChapter = async (req, res) => {
    try {
      const { id, chapterId } = req.params;
      const { chapter } = req.body;
  
      const document = await Template.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      const chapterIndex = document.content.findIndex(ch => ch._id.toString() === chapterId);
      if (chapterIndex === -1) {
        return res.status(404).json({ message: "Chapter not found" });
      }
  
      document.content[chapterIndex] = { ...document.content[chapterIndex], ...chapter };
      await document.save();
  
      const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  

  export const deleteChapter = async (req, res) => {
    try {
      const { id, chapterId } = req.params;
  
      const document = await Template.findById(id);
      if (!document) {
        return res.status(404).json({ message: "Document not found" });
      }
  
      document.content = document.content.filter(ch => ch._id.toString() !== chapterId);
      await document.save();
  
      const updatedDocument = await Template.findById(id).populate('content');
      res.status(200).json(updatedDocument);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };