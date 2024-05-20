import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addSectionFromChapter = async (templateId, chapterId, newSection) => {
  try {
    console.log('templateId', templateId);
    console.log('chapterId', chapterId);
    console.log('new section', newSection);

    const response = await axios.post(`${URL}/${templateId}/chapter/${chapterId}`, newSection);

console.log('response', response);
 console.log('soy data desde servicios section from chapter', response.data);

    alert("Sección añadida exitosamente");
    return response.data;
  
  } catch (error) {
    console.error('Error adding section', error.message);
    throw error;
  }
};

export const updateSectionFromChapter = async (templateId, sectionId, updatedSection)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/chapter${chapterId}/section/${sectionId}`, {section: updatedSection});
    alert("Sección actualizada exitosamente");
    return response.data;
  } catch (error) {
    console.error('Error updating section', error.message);
    throw error;
  }
};

export const deleteSectionFromChapter = async (templateId, sectionId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}/chapter${chapterId}/section/${sectionId}`);
    alert('Sección eliminada correctamente');
    return response.data;
  } catch (error) {
    console.error('Error deleting section', error.message);
    throw error;
  }
}