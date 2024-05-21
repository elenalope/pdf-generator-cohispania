import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addSection = async (templateId, newSection) => {
    try {
      const response = await axios.post(`${URL}/${templateId}/content`, newSection);
      alert("Sección añadida exitosamente");
      return response.data;
    } catch (error) {
       console.error('Error creating section', error.message);
       throw error; }
   };

export const updateSection = async (templateId, sectionId, updatedSection)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/section/${sectionId}`, {section: updatedSection});
    alert("Sección actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating section', error.message);
    throw error;
  }
};

export const deleteSection = async (templateId, sectionId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}/section/${sectionId}`);
    alert('Sección eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting section', error.message);
    throw error;
  }
}