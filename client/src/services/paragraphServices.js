import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addParagraph = async (templateId, newParagraph) => {
    try {
      console.log("Datos del párrafo enviados:", newParagraph);
      const response = await axios.post(`${URL}/${templateId}/paragraph`, newParagraph);
      alert("Párrafo añadido exitosamente");
      return response.data;
    } catch (error) {
       console.error('Error creating paragraph', error.message);
       throw error; }
   };

export const updateParagraph = async (templateId, paragraphId, updatedParagraph)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/paragraph/${paragraphId}`, {paragraph: updatedParagraph});
    alert("Párrafo actualizado exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating paragraph', error.message);
    throw error;
  }
};

export const deleteParagraph = async (templateId, paragraphId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}/paragraph/${linkId}`);
    alert('Párrafo eliminado correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting paragraph', error.message);
    throw error;
  }
}