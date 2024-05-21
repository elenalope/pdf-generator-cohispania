import axios from "axios";

export const URL = 'http://localhost:3000/api/document';

export const addSignature = async (templateId, newSignature) => {
  try {
    const response = await axios.post(`${URL}/${templateId}/signature`, newSignature);
    alert("Firma añadida exitosamente");
    return response;
  } catch (error) {
     console.error('Error creating signature', error.message);
     throw error;
  }
};

export const updateSignature = async (templateId, signatureId, updatedSignature) => {
  try {
    const response = await axios.put(`${URL}/${templateId}/signature/${signatureId}`, { signature: updatedSignature });
    alert("Firma actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating signature', error.message);
    throw error;
  }
};

export const deleteSignature = async (templateId, signatureId) => {
  try {
    const response = await axios.delete(`${URL}/${templateId}/signature/${signatureId}`);
    alert('Firma eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting signature', error.message);
    throw error;
  }
};
