import './Home.css';
import ListPdf from '../../components/listPdf/ListPdf';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import DocumentProvider from '../../context/DocumentContext.jsx';

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/config'); 
    };

    return (
        <DocumentProvider> 
        <div className="homeContainer">
            <h3 className="boxHome">Mis plantillas</h3>
            <div className="buttonHome">
                <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
            </div>
            <ListPdf/>
        </div>
        </DocumentProvider>
    );
};

export default Home;
