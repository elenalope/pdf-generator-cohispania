import axios from "axios";

export const URL = 'http://localhost:5000/api/document';


export const addChapter = async (templateId, chapterData) => {
    try {
      console.log("Datos del Chapter enviados:", chapterData);
      const response = await axios.post(`${URL}/${templateId}/chapter`, chapterData);
      alert("Chapter añadido exitosamente");
      return response;
    } catch (error) {
       console.error('Error creating chapter', error.message);
       throw error; }
   };
