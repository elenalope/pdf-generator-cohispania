import axios from "axios";

export const URL = 'http://localhost:5000/api/document';


export const addChapter = async (templateId, newChapter) => {
    try {
      console.log("Datos del Chapter enviados:", chapterData);
      const response = await axios.post(`${URL}/${templateId}/chapter`, newChapter);
      alert("Capítulo añadido exitosamente");
      return response;
    } catch (error) {
       console.error('Error creating chapter', error.message);
       throw error; }
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
    const response = await axios.delete(`${URL}/${templateId}/chapter/${chapterId}`);
    alert('Capítulo eliminado correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting chapter', error.message);
    throw error;
  }
}