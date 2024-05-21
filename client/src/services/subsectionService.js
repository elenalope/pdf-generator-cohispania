import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addSubSection = async (templateId, newSubSection) => {
  try {
    console.log("Datos de la subsección enviados:", newSubSection);
    const response = await axios.post(`${URL}/document/${templateId}/chapter/${newSubSection.chapterId}/section/${newSubSection.sectionId}/subsection`, newSubSection);
    alert("Subsección añadida exitosamente");
    return response;
  } catch (error) {
     console.error('Error creating subsection', error.message);
     throw error;
  }
};

export const updateSubSection = async (templateId, subSectionId, updatedSubSection) => {
  try {
    const response = await axios.put(`${URL}/document/${templateId}/subsection/${subSectionId}`, { subsection: updatedSubSection });
    alert("Subsección actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating subsection', error.message);
    throw error;
  }
};

export const deleteSubSection = async (templateId, subSectionId) => {
  try {
    const response = await axios.delete(`${URL}/document/${templateId}/subsection/${subSectionId}`);
    alert('Subsección eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting subsection', error.message);
    throw error;
  }
};
