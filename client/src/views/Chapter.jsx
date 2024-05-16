import React, { useState } from 'react';
import { useNavigate, useParams} from 'react-router-dom';
import { useDocument } from '../context/DocumentContext';
import { addChapter } from '../services/chapterServices';
import './Chapter.css';
import { styled } from '@mui/material/styles';
import ChapterDialog from '../components/chapter/ChapterDialog';
import ParagraphDialog from '../components/paragraph/ParagraphDialog';

const Chapter = () => {
  const [formDataArray, setFormDataArray] = useState([]);
  const navigate = useNavigate();
  const { id: templateId } = useParams();

  const handleClick = async () => {
    const newChapter = { title: 'titulo', subtitle: 'subtitulo', content: [{}] }; 
    try {
      const response = await addChapter(templateId, newChapter);
      setFormDataArray([...formDataArray, response.data]);
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };

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
    <>
    <ChapterDialog/>
    <ParagraphDialog/>
    </>
  );
}

export default Chapter;
