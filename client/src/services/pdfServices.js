import axios from "axios";

export const URL = 'http://localhost:5000/api';


//GET
export const getPDF = async () => {
  try {
    const response = await axios.get(URL);
    return response.data
  } catch (error) {
    console.error('Error to get the documents', error.message);
    throw error;
  }
};

//POST
export const postPDF = async (newData) => {
  try {
    console.log("Datos enviados:", newData);
     const response = await axios.post(`${URL}/document`, newData);
     alert("Document create succesfully");
     return response;
  } catch (error) {
     console.error('Error creating document', error.message);
     throw error; }
 };

//DELETE
export const deletePDF = async (id) =>{
  try {
    let urlId = `${URL}/document/${id}`;
    const response = await axios.delete(urlId);
    alert("Document deleted");
    return response;
  } catch (error) {
    console.error('Error delete document', error.message);
    throw error;
  }

};

//UPDATE
export const updateData = async (data, id) => {
  try {
    let urlId = `${URL}/document/${id}`;
    const response = await axios.put(urlId, data);
    alert('Document updated succesfully');
    return response;
  } catch (error) {
    console.error('error update ', error.message);
    throw error;
  }
}

//GET BY ID
export const getById = async (id) => {
  try {
    const response = await axios.get(`${URL}/document/${id}`);
    return response;
  } catch (error) {
    console.error('Error get document', error.message);
    throw error;
  }
};