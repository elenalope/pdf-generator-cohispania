import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addList = async (templateId, newList) => {
  try {
    console.log("Datos de la lista enviados:", newList);
    const response = await axios.post(`${URL}/${templateId}/list`, newList);
    alert("Lista añadida exitosamente");
    return response;
  } catch (error) {
     console.error('Error creating list', error.message);
     throw error;
  }
};

export const updateList = async (templateId, listId, updatedList) => {
  try {
    const response = await axios.put(`${URL}/${templateId}/list/${listId}`, { list: updatedList });
    alert("Lista actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating list', error.message);
    throw error;
  }
};

export const deleteList = async (templateId, listId) => {
  try {
    const response = await axios.delete(`${URL}/${templateId}/list/${listId}`);
    alert('Lista eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting list', error.message);
    throw error;
  }
};
