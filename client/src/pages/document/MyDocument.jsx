import React, {useState, useEffect} from 'react';
import { useForm } from "react-hook-form";
import {useLocation, useNavigate, useParams} from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import './MyDocument.css';
import { pdf, Document, Page, Text, View} from '@react-pdf/renderer';
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
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';


const MyDocument = () => {  
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const { config } = location.state; 

  const [open, setOpen] = useState(false);
  const {data, setData} = useState(config);
  useEffect(() => {
    console.log('config desde doc', config);
  }, [config]);

  const methods = useForm({
    defaultValues: config,
  })
  const { register, handleSubmit, reset, formState: { errors } } = methods;
  const[showPreview, setShowPreview] = useState(false);
 
const onSubmit = async (formData) =>{
  try {
    const newData = {...config, formData};
    setData(newData);
    console.log('confiiii',config)
    const response = await postPDF(newData);
    console.log('newData',newData)
 } catch (error) {
    console.error('Error creating document', error.message)
  }
}
  const handlePreview = () =>{
    setShowPreview(!showPreview);
}
const handleChapterClick = () => {
  setOpen(true);
};
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

  return (
    <>
    <form /* onSubmit={handleSubmit(onSubmit)} */ className='formMyDocument'>
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
        <ListItem disablePadding onClick={handleChapterClick}>
            <ListItemButton>
              <ListItemIcon>
                <ImportContactsIcon />
              </ListItemIcon>
              <ListItemText primary="Capítulo" />
              <AddIcon />
            </ListItemButton>
          </ListItem>
          <Divider />
        </List>
      </nav>
    </Box>
      </div>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }}>
        </Box>
        </Container>
    </div>
    <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
      <Button variant="contained" onClick={()=>navigate('/')}>SALIR SIN GUARDAR</Button>
    </Stack>
    </form>{showPreview && <PreviewPdf config={config} data={data} />}
            {open && <ChapterDialog setOpen={setOpen} />}

     </>
  )
}


export default MyDocument;
