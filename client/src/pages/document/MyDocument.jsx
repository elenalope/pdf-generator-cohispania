import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';
import SectionDialog from '../../components/section/SectionDialog.jsx';
import TitleDialog from '../../components/title/TitleDialog.jsx';
import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import {
  Stack, Button, CssBaseline, Box, Container, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Divider, CardContent, Typography, CardMedia, 
  FormControlLabel, Switch, IconButton, styled
} from '@mui/material';
import {
  SaveIcon, GetAppIcon, VisibilityIcon, ImportContactsIcon, AddIcon, SendIcon, 
  BookIcon, TitleIcon, ArticleIcon, FormatAlignJustifyIcon, MoveDownIcon, InsertLinkIcon
} from '@mui/icons-material';
import { postPDF } from '../../services/pdfServices';
import { addChapter, addSection, addTitle } from '../../services/chapterServices.js'; 
import './MyDocument.css';

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
    sections: Array.isArray(config.sections) ? config.sections : [],
    titles:  Array.isArray(config.titles) ? config.titles : []
  };
  const [openChapter, setOpenChapter] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openTitle, setOpenTitle] = useState(false);
  const [data, setData] = useState(initialConfig);
  const [chapterId, setChapterId] = useState(null); 
  const [sectionId, setSectionId] = useState(null);
  const [titleId, setTitleId] = useState(null);
  

  useEffect(() => {
    console.log('config desde doc', config);
    console.log('documentId desde doc', documentId);
  }, [config, documentId]);

  const methods = useForm({
    defaultValues: initialConfig,
  });
  console.log('methods está aquí', methods)

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
    setShowPreview(!showPreview);
  };

  const handleChapterClick = () => {
    setOpenChapter(true);
  };

  const handleSectionClick = () => {
    setOpenSection(true);
  };

  const handleTitleClick = () => {
    setOpenTitle(true);
  }

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

  const handleSectionCreate = async  (sectionData) => {
    console.log('la section data esta aqui', sectionData)
    try {
    console.log('ID:', id);
    console.log('Datos de la sección:', sectionData);
    const document = await addSection(id, { section: sectionData });
    console.log('Documento recibido:', document);
    if (!document || !document.content) {
      throw new Error('El documento devuelto no es válido');
    }
    console.log('Contenido del documento:', document.content);
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

  const handleTitleCreate = async (titleData) => {
    try {
      const document = await addTitle(id, { title: titleData }); 
      const newTitle= document.content[document.content.length - 1]; 
      setData(prevData => ({
        ...prevData,
        titles: [...prevData.titles, newTitle] 
      }));
      setTitleId(newTitle._id); 
    } catch (error) {
      console.error('Error al crear el título:', error);
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

  // const handleEnterTitle = () => {
  //   if (titleId) {
  //     navigate(`title/${titleId}`);
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className='formMyDocument'>
        <div className='template-name'>{config ? config.name : ''}</div>
        <Stack direction="row" spacing={2} sx={{ marginLeft: '2%', marginRight: '2%', marginTop: '1%', justifyContent: 'flex-end' }}>
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
                      <ListItemText primary="Capítulo" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon onClick={handleChapterClick}/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <BookIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sección" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon onClick={handleSectionClick}/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled>
                      <ListItemIcon>
                      <ArticleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Subsección" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <TitleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Título" />
                      <IconButton 
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon onClick={handleTitleClick}/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <FormatAlignJustifyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Párrafo" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton>
                      <ListItemIcon>
                      <InsertLinkIcon />
                      </ListItemIcon>
                      <ListItemText primary="Link" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled>
                      <ListItemIcon>
                      <MoveDownIcon />
                      </ListItemIcon>
                      <ListItemText primary="Salto" />
                      <IconButton
                        sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}
                      >
                        <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  
                </List>
              </nav>
            </Box>
          </div>
          <CssBaseline />

          <div className='pdf-background'>
          <Container fixed>
            <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }}>
              {data.chapters.map((chapter, index) => (
                chapter && chapter.title && (
                  <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
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
                    onClick={handleEnterChapter}>
                    Entrar
                    </Button>
                    </div>
                    
                </CardContent>
                  
                )
              ))}
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
                     <Divider/>
                    {/* <FormControlLabel disabled control={<Switch />} label={data.cover} /> */}
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

              {data.titles.map((title, index) => (
                  title && title.title && (
                    <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                      </Box>
                      <Typography sx={{ mb: 2, mt: 1 }}>
                        {title.title}
                      </Typography>
                    
                    </CardContent>
                  )
               ))}
              
              </Box>
              
          </Container>

          </div>
          
          <div className={showPreview ? 'previewContainer' : 'previewContainer empty'}>
          {showPreview && <PreviewPdf config={config} data={data} />}
          </div>

        </div>
          <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
          <Button variant="contained" onClick={() => navigate('/')}>SALIR</Button>
        </Stack>
      </form>

      
      {openChapter && <ChapterDialog openChapter={openChapter} setOpenChapter={setOpenChapter} onChapterCreate={handleChapterCreate}/>}
      {openSection &&<SectionDialog openSection={openSection} setOpenSection={setOpenSection} onSectionCreate={handleSectionCreate} />}
      {openTitle &&<TitleDialog openTitle={openTitle} setOpenTitle={setOpenTitle} onTitleCreate={handleTitleCreate}/>}


    </>
  );
}

export default MyDocument;
