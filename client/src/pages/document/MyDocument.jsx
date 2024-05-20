import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import { pdf, Document, Page, Text, View } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';
import SectionDialog from '../../components/section/SectionDialog.jsx';
import ParagraphDialog from '../../components/paragraph/ParagraphDialog.jsx'
import TitleDialog from '../../components/title/TitleDialog.jsx';
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
import { addSection} from '../../services/sectionServices.js';
import { addTitle} from '../../services/titleService.js';
import { addParagraph} from '../../services/paragraphServices.js';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import BookIcon from '@mui/icons-material/Book';
import TitleIcon from '@mui/icons-material/Title';
import ArticleIcon from '@mui/icons-material/Article';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoveDownIcon from '@mui/icons-material/MoveDown'
import ExitWithoutSaving from '../../components/alerts/ExitWithoutSaving.jsx';
import MoveDownIcon from '@mui/icons-material/MoveDown';
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
    titles:  Array.isArray(config.titles) ? config.titles : [],
    paragraphs:  Array.isArray(config.paragraphs) ? config.paragraphs : []
  };
  const [openChapter, setOpenChapter] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openTitle, setOpenTitle] = useState(false);
  const [openParagraph, setOpenParagraph] = useState(false);
  const [data, setData] = useState(initialConfig);
  const [chapterId, setChapterId] = useState(null); 
  const [sectionId, setSectionId] = useState(null);
  const [titleId, setTitleId] = useState(null);
  const [paragraphId, setParagraphId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  

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
    setSelectedType('chapter');
  };

  const handleSectionClick = () => {
    setOpenSection(true);
    setSelectedType('section');
  };

  const handleTitleClick = () => {
    setOpenTitle(true);
    setSelectedType('title');
  }

  const handleParagraphClick = () => {
    setOpenParagraph(true);
    setSelectedType('paragraph');
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

  const handleSectionCreate = async (sectionData) => {
    try {
      console.log('Section Data:', JSON.stringify(sectionData, null, 2));
      const document = await addSection(id, { section: sectionData });
      console.log('Document:', JSON.stringify(document, null, 2));
  
      const newSection = document.content[document.content.length - 1];
      /* if (!newSection || !newSection._id) {
        throw new Error('La sección no se añadió correctamente');
      } */
  
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

  const handleParagraphCreate = async (paragraphData) => {
    try {
      const document = await addParagraph(id, { paragraph: paragraphData }); 
      const newParagraph= document.content[document.content.length - 1]; 
      setData(prevData => ({
        ...prevData,
        paragraphs: [...prevData.paragraphs, newParagraph] 
      }));
      setParagraphId(newParagraph._id); 
    } catch (error) {
      console.error('Error al crear el párrafo:', error);
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

  const handleEnterTitle = () => {
    if (titleId) {
      navigate(`title/${titleId}`);
    }
  };
  const handleEnterParagraph = () => {
    if (paragraphId) {
      navigate(`paragraph/${paragraphId}`);
    }
  };
  const handleCancelDialog = () => {
    setSelectedType(null);
  };
  const isDisabled = selectedType !== null;

  const handleShowAlert = () => {
    setShowAlert(true);
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
                  <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled && selectedType !== 'chapter'}>
                      <ListItemIcon>
                      <ImportContactsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Capítulo" />
                      <AddIcon onClick={handleChapterClick}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled && selectedType !== 'section'}>
                      <ListItemIcon>
                      <BookIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sección" />
                      <AddIcon onClick={handleSectionClick}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled>
                      <ListItemIcon>
                      <ArticleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Subsección" />
                      <AddIcon />
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled && selectedType !== 'title'}>
                      <ListItemIcon>
                      <TitleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Título" />
                      <AddIcon onClick={handleTitleClick}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled && selectedType !== 'paragraph'}>
                      <ListItemIcon>
                      <FormatAlignJustifyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Párrafo" />
                      <AddIcon onClick={handleParagraphClick}/>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled && selectedType !== 'link'}>
                      <ListItemIcon>
                      <FormatListBulletedIcon />
                      </ListItemIcon>
                      <ListItemText primary="Link" />
                      <AddIcon />
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled>
                      <ListItemIcon>
                      <MoveDownIcon />
                      </ListItemIcon>
                      <ListItemText primary="Salto" />
                      <AddIcon />
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
                      <Button variant="contained" endIcon={<SendIcon />} size="small"
                    sx={{ width: 100 , ml: 'auto'}} 
                    onClick={handleEnterTitle}>
                    Entrar
                    </Button>
                    </CardContent>
                  )
               ))}
              
              {data.paragraphs.map((paragraph, index) => (
                  paragraph && paragraph.paragraph && (
                    <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {/* <LongMenu /> */}
                      </Box>
                      <Typography sx={{ mb: 2, mt: 1 }}>
                        {paragraph.title}
                      </Typography>
                      <Button variant="contained" endIcon={<SendIcon />} size="small"
                        sx={{ width: 100 , ml: 'auto'}} 
                        onClick={handleEnterParagraph}>
                        Entrar
                        </Button>
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
          <Button variant="contained" onClick={(handleShowAlert)}>SALIR SIN GUARDAR</Button>
          {showAlert && <ExitWithoutSaving onClose={() => setShowAlert(false)} />}
        </Stack>
      </form>

      {/* {showPreview && <PreviewPdf config={config} data={data} />} */}
      {openChapter && <ChapterDialog openChapter={openChapter} setOpenChapter={setOpenChapter} onChapterCreate={handleChapterCreate} onCancel={handleCancelDialog}/>}
      {openSection &&<SectionDialog openSection={openSection} setOpenSection={setOpenSection} onSectionCreate={handleSectionCreate} onCancel={handleCancelDialog}/>}
      {openTitle &&<TitleDialog openTitle={openTitle} setOpenTitle={setOpenTitle} onTitleCreate={handleTitleCreate} onCancel={handleCancelDialog}/>}
      {openParagraph &&<ParagraphDialog openParagraph={openParagraph} setOpenParagraph={setOpenParagraph} onParagraphCreate={handleParagraphCreate} onCancel={handleCancelDialog}/>}


    </>
  );
}

export default MyDocument;
