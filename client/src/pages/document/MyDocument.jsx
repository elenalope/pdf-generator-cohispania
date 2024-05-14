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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import BookIcon from '@mui/icons-material/Book';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ImageIcon from '@mui/icons-material/Image';
import LinkIcon from '@mui/icons-material/Link';
import DrawIcon from '@mui/icons-material/Draw';
import AddIcon from '@mui/icons-material/Add';

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
            <div className='option-list'>
      <Box>
      <nav aria-label="main mailbox folders">
        <List>
        <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Capítulo"/> 
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <BookIcon />
              </ListItemIcon>
              <ListItemText primary="Sección"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <TitleIcon />
              </ListItemIcon>
              <ListItemText primary="Título"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FormatAlignJustifyIcon />
              </ListItemIcon>
              <ListItemText primary="Párrafo"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <FormatListBulletedIcon />
              </ListItemIcon>
              <ListItemText primary="Lista"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <DrawIcon />
              </ListItemIcon>
              <ListItemText primary="Firma"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Imagen"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LinkIcon />
              </ListItemIcon>
              <ListItemText primary="Link"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MoveDownIcon />
              </ListItemIcon>
              <ListItemText primary="Salto"/>
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
      </div>
                
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



