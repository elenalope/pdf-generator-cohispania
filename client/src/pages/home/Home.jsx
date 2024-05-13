import React, { useState } from 'react';
import Button from '@mui/material/Button';
import AlertaDescargaExitosa from '../../components/alerts/SaveSuccessAlert';
import ListPdf from '../../components/listPdf/ListPdf';
import './Home.css';

const Home = () => {
    const [mostrarAlerta, setMostrarAlerta] = useState(false);

    const handleMostrarAlerta = () => {
        setMostrarAlerta(true);
    };

    return (
        <>
            <h3 className="boxHome">Mis plantillas</h3>
            <ListPdf />
            <Button variant="contained" onClick={handleMostrarAlerta}>
                Mostrar Alerta
            </Button>
            {mostrarAlerta && <AlertaDescargaExitosa onClose={() => setMostrarAlerta(false)} />}
        </>
    );
};

export default Home;