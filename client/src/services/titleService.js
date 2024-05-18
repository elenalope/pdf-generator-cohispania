import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addTitle = async (templateId, newTitle) => {
  try {
    console.log("Datos del título enviados:", newTitle);
    const response = await axios.post(`${URL}/${templateId}`, newTitle);
    console.log("Hola, soy la response.data", response.data)
    alert("Título añadido exitosamente");
    return response.data;
    
  } catch (error) {
     console.error('Error creating title', error.message);
     throw error;
  }
};

export const updateTitle = async (templateId, titleId, updatedTitle) => {
  try {
    const response = await axios.put(`${URL}/${templateId}/title/${titleId}`, { title: updatedTitle });
    alert("Título actualizado exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating title', error.message);
    throw error;
  }
};

export const deleteTitle = async (templateId, titleId) => {
  try {
    const response = await axios.delete(`${URL}/${templateId}/title/${titleId}`);
    alert('Título eliminado correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting title', error.message);
    throw error;
  }
};
