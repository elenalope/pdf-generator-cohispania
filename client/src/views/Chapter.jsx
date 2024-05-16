import React, { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './Chapter.css';
import { styled } from '@mui/material/styles';
import ChapterDialog from '../components/chapter/ChapterDialog';


const Chapter = () => {
  
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
      const response = await axios.post('/api', formDataArray[index]);
      navigate('/document')
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
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

  return (
    <ChapterDialog/>
  );
}




export default Chapter;


