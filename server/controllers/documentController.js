import {Template, Section, Chapter}from "../models/Template.js";

export const getAllDocuments = async (request, response) => {
   
    try {
    const documents = await Template.find({});
    response.status(200).json(documents);
}
catch(error){
    response.status(500).json({message: error.message})
}

}

//

export const getDocumentById = async (req, res) => {
  try {
    const { id } = req.params;

    const document = await Template.findById(id)
      .populate({
        path: 'content',
        model: 'Chapter',
        populate: {
          path: 'content',
          model: 'Section',
          populate: {
            path: 'content',
            model: 'Subsection',
            populate: [
              { path: 'content', model: 'Title' },
              { path: 'content', model: 'Paragraph' },
              { path: 'content', model: 'List' },
              { path: 'content', model: 'Signature' },
              { path: 'content', model: 'Image' },
              { path: 'content', model: 'Link' }
            ]
          }
        }
      });

    if (!document) {
      return res.status(404).json({ message: "Document not found" });
    }

    res.status(200).json(document);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



//

export const deleteDocument = async (request, response) => {
    try {
        const document = await Template.findByIdAndDelete(request.params.id);
        if(!document){
            return response.status(404).json({message: "document not found"});
        }
        response.status(200).json({message: "document deleted"});
    
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}

//

export const createDocument = async(request,response)=>{
     
    try {
        const document = await Template.create(request.body)
        console.log(document)
        response.status(201).json(document); 
    } catch (error) {

        response.status(500).json({message: error.message})
    }
} 

//UPDATE

export  const updateDocument = async (request,response)=> {
    try {
        await Template.findOneAndUpdate({ _id: request.params.id },request.body)
             response.status(200).json({
            message:"Document was updated"
        });
    
       
    } catch (error) {
        response.status(500).json({message: error.message})
    }
};

export const createAllDocument = async (req, res) => {
    try {
      const { name, title, subtitle, highlightedValue, docExplanation, coverImg, coverLogo, headerLogo, toc, tocLevels, padding, sectionBreak, watermark, includeCover, includeBackCover, theme, sectionVariant, orientation, size, signature, content } = req.body;
      
      const chapters = await Promise.all(content.map(async (chapter) => {
        if (chapter.content && chapter.content.length > 0) {
          const sections = await Promise.all(chapter.content.map(async (section) => {
            const newSection = new Section(section);
            await newSection.save();
            return newSection._id;
          }));
          chapter.content = sections;
        }
        const newChapter = new Chapter(chapter);
        await newChapter.save();
        return newChapter._id;
      }));
  
      const document = new Template({
        name,
        title,
        subtitle,
        highlightedValue,
        docExplanation,
        coverImg,
        coverLogo,
        headerLogo,
        toc,
        tocLevels,
        padding,
        sectionBreak,
        watermark,
        includeCover,
        includeBackCover,
        theme,
        sectionVariant,
        orientation,
        size,
        signature,
        content: chapters
      });
  
      await document.save();
  
      const populatedDocument = await Template.findById(document._id)
        .populate({
          path: 'content',
          populate: {
            path: 'content',
            model: 'Section'
          }
        });
  
      res.status(201).json(populatedDocument);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };