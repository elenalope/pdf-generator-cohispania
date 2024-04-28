import { Chapter } from "../models/Chapter";

export const createChapter = async(request, response) =>{
    try {
        const {templateId} = request.params;
        const chapterData = {...request.body, templateFather: templateId };
        const chapter = await Chapter.create(chapterData);
        response.status(201).json(chapter);
    } catch (error) {
        response.status(500).json({message: error.message})
    }
}