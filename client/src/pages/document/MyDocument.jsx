import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import './MyDocument.css';
import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';
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
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddIcon from '@mui/icons-material/Add';
import { addChapter } from '../../services/chapterServices.js';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { styled } from '@mui/material/styles';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
const MyDocument = () => {
  const navigate = useNavigate();
  const { id } = useParams(); 
  const location = useLocation();
  const { config = {}, documentId } = location.state || {};

  const initialConfig = { ...config, chapters: Array.isArray(config.chapters) ? config.chapters : [] };
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(initialConfig);
  const [chapterId, setChapterId] = useState(null); 

  useEffect(() => {
    console.log('config desde doc', config);
    console.log('documentId desde doc', documentId);
  }, [config, documentId]);

  const methods = useForm({
    defaultValues: initialConfig,
  });
  const { register, handleSubmit, reset, formState: { errors } } = methods;
  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const newData = { ...config, ...formData };
      setData(newData);
      console.log('newData', newData);
      await postPDF(newData);
    } catch (error) {
      console.error('Error creating document', error.message);
    }
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const handleChapterClick = () => {
    setOpen(true);
  };

  const handleChapterCreate = async (chapterData) => {
    try {
      const document = await addChapter(id, { chapter: chapterData }); 
      const newChapter = document.content[document.content.length - 1]; 
      setData(prevData => ({
        ...prevData,
        chapters: [...prevData.chapters, newChapter] 
      }));
      setChapterId(newChapter._id); 
    } catch (error) {
      console.error('Error al crear el capítulo:', error);
    }
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
  console.log('id chapter', chapterId)
  const handleEnterChapter = () => {
    if (chapterId) {
      navigate(`chapter/${chapterId}`);
    }
  };

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
              {data.chapters.map((chapter, index) => (
                chapter && chapter.title && (
                  <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                    </Box>
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {chapter.title}
                    </Typography>
                    <Divider />
                    <Typography sx={{ mb: 2, mt: 2 }}>
                      {chapter.subtitle}
                    </Typography>
                    <Divider />
                    {chapter.img && (
                      <CardMedia
                        sx={{ mt: 2 }}
                        component="img"
                        height="140"
                        width="280"
                        image={chapter.img}
                        alt="chapter-image"
                      />
                    )}
                    <div className='buttons-chapter-mydocument'>
                      <Button
                          sx={{ mb: 1 }}
                          component="label"
                          role={undefined}
                          variant="contained"
                          tabIndex={-1}
                          startIcon={<CloudUploadIcon />}
                            >
                          Seleccionar Imagen
                          <VisuallyHiddenInput type="file" /* onChange={(e) => handleInputChange(e, index)} */ />
                    </Button>
    
                    <Button variant="contained" endIcon={<SendIcon />} size="small"
                    sx={{ width: 100 , ml: 'auto'}} 
                    onClick={handleEnterChapter}/* type="submit" */ /* onClick={()=> navigate('/document')} */ >
                    Entrar
                    </Button>
                    </div>
                    
                </CardContent>
                  
                )
              ))}
            </Box>
          </Container>
        </div>
        <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
          <Button variant="contained" onClick={() => navigate('/')}>SALIR SIN GUARDAR</Button>
        </Stack>
      </form>
      {showPreview && <PreviewPdf config={config} data={data} />}
      {open && <ChapterDialog open={open} setOpen={setOpen} onChapterCreate={handleChapterCreate} />}
    </>
  );
}

export default MyDocument;
