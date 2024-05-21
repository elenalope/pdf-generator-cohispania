import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addSubSection = async (templateId, chapterId, sectionId, newSubSection) => {
  try {
    console.log('templateId', templateId);
    console.log('chapterId', chapterId);
    console.log('sectionId', sectionId);
    console.log('new subsection', newSubSection);

    const response = await axios.post(`${URL}/${templateId}/chapter/${chapterId}/section/${sectionId}`, newSubSection);
    console.log('Response from server:', response);
    return response;
  } catch (error) {
    console.error('Error creating subsection:', error.message);
    throw error;
  }
};


export const updateSubSection = async (templateId,chapterId, sectionId, subSectionId, updatedSubSection) => {
  try {
    const response = await axios.put(`${URL}/${templateId}/chapter/${chapterId}/section/${sectionId}/subsection/${subSectionId}`, { subsection: updatedSubSection });
    alert("Subsección actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating subsection', error.message);
    throw error;
  }
};

export const deleteSubSection = async (templateId,chapterId, sectionId, subSectionId) => {
  try {
    const response = await axios.delete(`${URL}/${templateId}/chapter/${chapterId}/section/${sectionId}/subsection/${subSectionId}`);
    alert('Subsección eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting subsection', error.message);
    throw error;
  }
};
