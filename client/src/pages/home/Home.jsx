import './Home.css';
import ListPdf from '../../components/listPdf/ListPdf';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import DocumentProvider from '../../context/DocumentContext';

const Home = () => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/config'); 
    };
  
    return (
        <DocumentProvider> 
      <div className="homeContainer">
        <div className="boxHome">
        <h3 className='textHome'>Mis plantillas</h3>
        </div>
        <div className="buttonHome">
          <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
        </div>
        <div className='cardsHome'>
        <ListPdf/>
        </div>
      </div>
        </DocumentProvider>
    );
  };
  
  export default Home;

