import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './MyDocument.css';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const MyDocument = () => {
  const[showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const { title = '', subtitle = '', coverLogo = '', toc = '', theme = '', padding = '', highlightedValue = '', docExplanation = '', coverImg = '', headerLogo = '', watermark = '', includeCover = '', includeBackCover = '' } = config || {};

  const handlePreview = () =>{
    setShowPreview(!showPreview);
}

const PdfDoc = ({ config }) => (
  <Document>
     <Page size={config.size}>
       <View >
         <Text>{config.title}</Text>
         <Text>{config.subtitle}</Text>
       </View>
     </Page>
  </Document>
 );

const handleDownloadPdf = async () => {
  
  const blob = await pdf(<PdfDoc config={config} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'documento.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// //  const { title, subtitle,coverLogo, toc,tocLevels, theme, padding, highlightedValue, docExplanation, coverImg, headerLogo, watermark, includeCover,includeBackCover, indexItems} = config;
  return (
    <>
      <div className='template-name'>{config ? config.title : ''}</div>
            <Stack direction="row" spacing={2} sx={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px' }}>
                <Button variant="contained">
                    <SaveIcon />
                </Button>
                <Button variant="contained" onClick={handleDownloadPdf}>
                    <GetAppIcon />
                </Button>
                <Button variant="contained" onClick={handlePreview}>
                    <VisibilityIcon />
                </Button>
            </Stack>
            <CssBaseline />
            <div className='document-body'>
                <div className='option-list'>
                    <p>Tamaño: {config ? config.size : ''}</p>
                    <p>Título: {config ? config.title : ''}</p>
                    <p>Subtítulo: {config ? config.subtitle : ''}</p>
                    <p>Logo: {config ? config.logo : ''}</p>
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
  )
}

export default MyDocument;



