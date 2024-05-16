import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addLink = async (templateId, newLink) => {
    try {
      console.log("Datos del link enviados:", newLink);
      const response = await axios.post(`${URL}/${templateId}/link`, newLink);
      alert("Link añadido exitosamente");
      return response;
    } catch (error) {
       console.error('Error creating link', error.message);
       throw error; }
   };

export const updateLink = async (templateId, linkId, updatedLink)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/link/${linkId}`, {link: updatedLink});
    alert("Link actualizado exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating paragraph', error.message);
    throw error;
  }
};

export const deleteLink = async (templateId, linkId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}/link/${linkId}`);
    alert('Link eliminado correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting link', error.message);
    throw error;
  }
}