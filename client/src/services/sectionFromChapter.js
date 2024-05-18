import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addSectionFromChapter = async (templateId, newSection,sectioData, chapterId) => {
    try {
      console.log("Datos del Section enviados:", newSection);
      console.log("Datos del Section enviados:", sectioData);
      const response = await axios.post(`${URL}/${templateId}/chapter/${chapterId}`, newSection);
      alert("Sección añadida exitosamente");
      return response.data;
    } catch (error) {
       console.error('Error creating section', error.message);
       throw error; }
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