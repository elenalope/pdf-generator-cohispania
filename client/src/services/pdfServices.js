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
<<<<<<< HEAD
export const postPDF = async (data) => {
  try {
     const response = await axios.post(`${URL}`, data);
=======
export const postPDF = async (newData) => {
  try {
    console.log("Datos enviados:", newData);
     const response = await axios.post(`${URL}/document`, newData);
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed
     alert("Document create succesfully");
     return response;
  } catch (error) {
     console.error('Error creating document', error.message);
     throw error; }
 };

//DELETE
export const deletePDF = async (id) =>{
  try {
<<<<<<< HEAD
    let urlId = `${URL}/${id}`;
=======
    let urlId = `${URL}/document/${id}`;
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed
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
<<<<<<< HEAD
    let urlId = `${URL}/${id}`;
=======
    let urlId = `${URL}/document/${id}`;
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed
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
<<<<<<< HEAD
    const response = await axios.get(`${URL}/${id}`);
=======
    const response = await axios.get(`${URL}/document/${id}`);
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed
    return response;
  } catch (error) {
    console.error('Error get document', error.message);
    throw error;
  }
};