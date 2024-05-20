import './Home.css';
import ListPdf from '../../components/listPdf/ListPdf';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import { DocumentContext } from '../../context/DocumentContext';
import { getPDF } from '../../services/pdfServices';
import {useContext} from 'react';

const Home = () => {
    const navigate = useNavigate();
    const { documents, setDocuments } = useContext(DocumentContext);

    const handleButtonClick = () => {
      navigate('/config'); 
    };
  
    return (
      <div className="homeContainer">
        <div className="boxHome">
          <h3 className='textHome'>Mis plantillas</h3>
          <div className="buttonHome">
            <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
          </div>
        </div>
        <div className='cardsHome'>
        <ListPdf/>
        </div>
      </div>

    );
  };
  
  export default Home;