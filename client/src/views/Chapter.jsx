import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; 
import MyDocument from "../pages/document/MyDocument.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import './Chapter.css'; 

const Chapter = (data) => {
  const [formDataArray, setFormDataArray] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const { title = '', subtitle = '', coverImg = '' } = config || {};

  const handleDownloadPdf = async () => {
  
  }

  const handleClick = () => {
    setFormDataArray([...formDataArray, { title: '', subtitle: '', image: null }]); 
  }

  const handleSubmit = async (e, index) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/form', formDataArray[index]);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedFormDataArray = [...formDataArray];
    updatedFormDataArray[index] = {
      ...updatedFormDataArray[index],
      [name]: value
    };
    setFormDataArray(updatedFormDataArray);
  }

  return (
    <div>
      <MyDocument/> 
      <div>
        <button className="Chapter">Capitulo</button>
        <div className='add'>
          <Button onClick={handleClick}>
            <AddIcon/>
          </Button>
          <ImportContactsIcon className='book'/>
        </div>
      </div>
      {formDataArray.map((formData, index) => (
        <form key={index} className="form" onSubmit={(e) => handleSubmit(e, index)}>
          <input 
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={(e) => handleInputChange(e, index)}
          />
          <input 
            type="text"
            name="subtitle"
            placeholder="Subtítulo"
            value={formData.subtitle}
            onChange={(e) => handleInputChange(e, index)}
          />
          <input 
            type="file"
            name="image"
            onChange={(e) => handleInputChange(e, index)}
          />
          <button type="submit">Guardar</button>
        </form>
      ))}
    </div>
  );
}

export default Chapter;
