import './Chapter.css';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; // Importa Button correctamente
import  MyDocument  from "../pages/document/MyDocument.jsx";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';




const Chapter = (data) => {
  console.log(data)
  const [showPreview, setShowPreview] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    image: null
  });
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const { title = '', subtitle = '', coverImg = '' } = config || {};

  const handleDownloadPdf = async () => {
  
  }

  const handlePreview = () => {
    setShowPreview(!showPreview);
  }

  const handleClick = () => {
    setShowForm(true); 
  }
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Aquí enviarías los datos a través de una solicitud HTTP POST
      const response = await axios.post('/api/form', formData);
      console.log('Respuesta del servidor:', response.data);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
    console.log(formData);
    setShowForm(false); // Ocultar el formulario después de enviar
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }


  return (
    <div>
      {/* Renderizar el componente Mydocument y pasar los datos del documento guardado como prop */}
       <MyDocument/> 
      <div>
        <button className='Chapter'>Capitulo</button>
        {/* <AddIcon className='Add' onClick={handleClick}></AddIcon> */}
        <div className='add'>
        <Button onClick={handleClick}>
          <AddIcon/>
        </Button>
        <ImportContactsIcon className='book'/>
        </div>
      </div>
       {/* Renderizar el formulario si showForm es true */}
       {showForm && (
        <form onSubmit={handleFormSubmit}>
          <input 
            type="text"
            name="title"
            placeholder="Título"
            value={formData.title}
            onChange={handleInputChange}
          />
          <input 
            type="text"
            name="subtitle"
            placeholder="Subtítulo"
            value={formData.subtitle}
            onChange={handleInputChange}
          />
          <input 
            type="file"
            name="image"
            onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })}
          />
          <button type="submit">Guardar</button>
        </form>
      )}
    </div>
  );
}

export default Chapter;



