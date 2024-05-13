import './Home.css';
import ListPdf from '../../components/listPdf/ListPdf';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate('/config'); 
    };

    return (
        <div className="homeContainer">
            <h3 className="boxHome">Mis plantillas</h3>
            <div className="buttonHome">
                <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
            </div>
            <ListPdf/>
        </div>
    );
};

export default Home;