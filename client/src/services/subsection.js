import axios from "axios";

export const URL = 'http://localhost:3000/api/document';


export const addsubSection = async (templateId, newsubSection) => {
    try {
      console.log("Datos del subSection enviados:", subsectionData);
      const response = await axios.post(`${URL}/${templateId}/subsection`, newsubSection);
      alert("subSección añadidaa exitosamente");
      return response;
    } catch (error) {
       console.error('Error creating subsection', error.message);
       throw error; }
   };

export const updateSection = async (templateId, subsectionId, updatedsubSection)=>{
  try {
    const response = await axios.put(`${URL}/${templateId}/subsection/${subsectionId}`, {subsection: updatedsubSection});
    alert("subSección actualizada exitosamente");
    return response;
  } catch (error) {
    console.error('Error updating subsection', error.message);
    throw error;
  }
};

export const deletesubSection = async (templateId, subSectionId)=>{
  try {
    const response = await axios.delete(`${URL}/${templateId}/subSection/${subSectionId}`);
    alert('subSección eliminada correctamente');
    return response;
  } catch (error) {
    console.error('Error deleting subsection', error.message);
    throw error;
  }
}