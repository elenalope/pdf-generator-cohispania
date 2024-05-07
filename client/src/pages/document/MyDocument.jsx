import * as React from 'react';
import './MyDocument.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

function MyDocument() {
    const navigate = useNavigate();
    const location = useLocation();
    const config = location.state ? location.state.config : {
        size: 'A4',
        title: 'Sin título',
        subtitle: 'Sin subtítulo',
        toc: false,
        logo: null
    };

    return (
        <>
            <div className='template-name'>{config.title}</div>
            <div className='document-body'>
                <div className='option-list'>
                    <p>Tamaño: {config.size}</p>
                    <p>Título: {config.title}</p>
                    <p>Subtítulo: {config.subtitle}</p>
                    <p>Incluir Índice: {config.toc ? 'Sí' : 'No'}</p>
                    <p>Logo: {config.logo ? config.logo.name : 'Ninguno'}</p>
                </div>
                <React.Fragment>
                  <CssBaseline />
                  <Container fixed>
                    <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }} />
                  </Container>
                </React.Fragment>
            </div>
            <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
              <Button variant="contained" onClick={()=>navigate('/')}>SALIR SIN GUARDAR</Button>
            </Stack>
        </>
    );
}

export default MyDocument;



