import axios from "axios";

export const URL = 'http://localhost:5173/api';


//GET
export const getPDF = async () => {
  try {
    const response = await axios.get(URL);
    return response.data
  } catch (error) {
    console.error('error get pdfs', error.message);
    throw error;
  }
};

//POST
export const postPDF = async (data) => {
  try {
     const response = await axios.post(URL, data);
     alert("Documento creado existosamente");
     return response;
  } catch (error) {
     console.error('Error creating document', error.message);
     throw error; }
 };

//DELETE
export const deletePDF = async (id) =>{
  try {
    let urlId = `${URL}/${id}`;
    const response = await axios.delete(urlId);
    alert("Documento eliminado");
    return response;
  } catch (error) {
    console.error('error delete document', error.message);
    throw error;
  }

};

//UPDATE
export const updateData = async (data, id) => {
  try {
    let urlId = `${URL}/${id}`;
    const response = await axios.put(urlId, data);
    alert('Documento actualizado');
    return response;
  } catch (error) {
    console.error('error update ', error.message);
    throw error;
  }
}

//GET BY ID
export const getById = async (id) => {
  try {
    const response = await axios.get(`${URL}/${id}`);
    return response;
  } catch (error) {
    console.error('Error get document', error.message);
    throw error;
  }
};