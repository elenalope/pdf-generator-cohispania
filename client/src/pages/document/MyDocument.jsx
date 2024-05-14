import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import { useDocument } from '../../context/DocumentContext';
import {useLocation, useNavigate} from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import './MyDocument.css';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

const MyDocument = () => {  
  const location = useLocation();
  const navigate = useNavigate();
  const config = location.state?.config;
  const {data, setData, setConfig} = useDocument();
  const methods = useForm({
    defaultValues: config,
  })
  const { register, handleSubmit, reset, formState: { errors } } = methods;
  const[showPreview, setShowPreview] = useState(false);
  /* const[data, setData]= useState({}); */
  
const onSubmit = async (data) =>{
  console.log(data)
  try {
    const newData = {...config, ...data};
    setData(newData);
    const response = await postPDF(newData);
    console.log('newData',newData)
    navigate('/document/chapter',{state: {data: newData}});
  } catch (error) {
    console.error('Error creating document', error.message)
  }
}
  const handlePreview = () =>{
    setShowPreview(!showPreview);
}
const PdfDoc = ({ config }) => (
  <Document>
     <Page size={config.size}>
       <View>
         <Text>{config.title.content}</Text>
         <Text>{config.subtitle}</Text>
         <View>
                {config.toc && <Text>Índice:</Text>}
            </View>
            <Text>{config.theme}</Text>
       </View>
     </Page>
  </Document>
);
const generatePdf = async () => {
  try {
    const blob = await pdf(<PdfDoc config={config} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'documento.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  }
  
};
/* console.log('pdf document',config)
 */
  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='formMyDocument'>
      <div className='template-name'>{config ? config.name : ''}</div>
            <Stack direction="row" spacing={2} sx={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px' }}>
                <Button variant="contained" type="submit">
                    <SaveIcon />
                </Button>
                <Button type='button' variant="contained" onClick={generatePdf}>
                    <GetAppIcon />
                </Button>
                <Button variant="contained" onClick={handlePreview}>
                    <VisibilityIcon />
                </Button>
            </Stack>
            <CssBaseline />
            <div className='document-body'>
                
                <React.Fragment>
                  <CssBaseline />
                  <Container fixed>
                    
                  {showPreview && <PreviewPdf config={config} data={data} />}

                    <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }} />
                  </Container>
                </React.Fragment>
    </div>
    <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
      <Button variant="contained" onClick={()=>navigate('/')}>SALIR SIN GUARDAR</Button>
    </Stack>
    </form>
     </>
  )
}

export default MyDocument;



