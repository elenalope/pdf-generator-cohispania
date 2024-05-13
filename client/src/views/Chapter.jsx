import './Chapter.css';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button'; // Importa Button correctamente
import  MyDocument  from "../pages/document/MyDocument.jsx";
import { useLocation, useNavigate } from 'react-router-dom';


const Chapter = (data) => {
  console.log(data)
  const [showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const { title = '', subtitle = '', coverImg = '' } = config || {};

  const handleDownloadPdf = async () => {
  
  }

  const handlePreview = () => {
    setShowPreview(!showPreview);
  }

  return (
    <div>
      {/* Renderizar el componente Mydocument y pasar los datos del documento guardado como prop */}
       <MyDocument/> 
      <div>
        <button className='Chapter'>Capitulo</button>
        <AddIcon className='Add' onClick={handleClick}></AddIcon>
        <Button className="button-Add" onClick={handleClick}>
          <AddIcon className='Add'/>
        </Button>
      </div>
    </div>
  );
}

export default Chapter;



