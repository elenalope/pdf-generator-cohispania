import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addChapter = async (templateId, newChapter) => {
  try {
    console.log("Datos del Chapter enviados:", newChapter);
    const response = await axios.post(`${URL}/${templateId}`, newChapter);
    console.log('doy data desde servicios', response.data)
    alert("Capítulo añadido exitosamente");
    return response.data;
    
  } catch (error) {
     console.error('Error creating chapter', error.message);
     throw error; }
 };

   export const getChapters = async (templateId) => {
    try {
        const response = await axios.get(`${URL}/${templateId}/chapters`);
        return response.data;
    } catch (error) {
        console.error('Error getting chapters', error.message);
        throw error;
    }
};

export const getChapterById = async (templateId, chapterId) => {
    try {
        const response = await axios.get(`${URL}/${templateId}/chapters/${chapterId}`);
        return response.data;
    } catch (error) {
        console.error('Error getting chapter by ID', error.message);
        throw error;
    }
};



export const updateChapter = async (templateId, chapterId, updatedChapter)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/chapter/${chapterId}`, {chapter: updatedChapter});
    alert("Capítulo actualizado exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating chapter', error.message);
    throw error;
  }
};

export const deleteChapter = async (templateId, chapterId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}`);
    alert('Capítulo eliminado correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting chapter', error.message);
    throw error;
  }
}