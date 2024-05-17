import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';
import SectionDialog from '../../components/section/SectionDialog.jsx';
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

  const initialConfig = { ...config, 
    chapters: Array.isArray(config.chapters) ? config.chapters : [],
    sections: Array.isArray(config.sections) ? config.sections : [] 
  };
  const [openChapter, setOpenChapter] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [data, setData] = useState(initialConfig);
  const [chapterId, setChapterId] = useState(null); 
  const [sectionId, setSectionId] = useState(null);
  

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
    setOpenChapter(true);
  };

  const handleSectionClick = () => {
    setOpenSection(true);
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

  const handleSectionCreate = async (sectionData) => {
    try {
      const document = await addSection(id, { section: sectionData });
      const newSection = document.content[document.content.length - 1];
      setData(prevData => ({
        ...prevData,
        sections: [...prevData.sections, newSection]
      }));
      setSectionId(newSection._id);
    } catch (error) {
      console.error('Error al crear la sección:', error);
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

  const handleEnterChapter = () => {
    if (chapterId) {
      navigate(`chapter/${chapterId}`);
    }
  };

  const handleEnterSection = () => {
    if (sectionId) {
      navigate(`section/${sectionId}`);
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
                  <ListItem disablePadding onClick={handleSectionClick}>
                    <ListItemButton>
                      <ListItemIcon>
                        <ImportContactsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sección" />
                      <AddIcon />
                    </ListItemButton>
                  </ListItem>
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
          
            <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }}>
            {data.sections.map((section, index) => (
                section && section.title && (
                  <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                    </Box>
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {section.title}
                    </Typography>
                    <Divider />
                    {section.img && (
                      <CardMedia
                        sx={{ mt: 2 }}
                        component="img"
                        height="140"
                        width="280"
                        image={section.img}
                        alt="section-image"
                      />
                    )}
                    <div className='buttons-section-mydocument'>
    
                    <Button variant="contained" endIcon={<SendIcon />} size="small"
                    sx={{ width: 100 , ml: 'auto'}} 
                    onClick={handleEnterSection}/* type="submit" */ /* onClick={()=> navigate('/document')} */ >
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
      {openChapter && <ChapterDialog openChapter={openChapter} setOpenChapter={setOpenChapter} onChapterCreate={handleChapterCreate}/>}
      

      {showPreview && <PreviewPdf config={config} data={data} />}
      {openSection && <SectionDialog openSection={openSection} setOpenSection={setOpenSection} onSectionCreate={handleSectionCreate}/>}
    </>
  );
}

export default MyDocument;
