import React, { useState, useEffect, useRef } from 'react';
import { useForm } from "react-hook-form";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { postPDF } from '../../services/pdfServices';
import { pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import ChapterDialog from '../../components/chapter/ChapterDialog.jsx';
import SectionDialog from '../../components/section/SectionDialog.jsx';
import TitleDialog from '../../components/title/TitleDialog.jsx';
import LinkDialog from '../../components/link/LinkDialog.jsx'
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
import { addLink } from '../../services/linkServices.js'
import CardContent from '@mui/material/CardContent';
import { IconButton, Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import BookIcon from '@mui/icons-material/Book';
import TitleIcon from '@mui/icons-material/Title';
import ArticleIcon from '@mui/icons-material/Article';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import MoveDownIcon from '@mui/icons-material/MoveDown';
import './MyDocument.css';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LongMenu from '../../components/cards/DropDownMenu.jsx';
import ParagraphDialog from '../../components/paragraph/ParagraphDialog.jsx'

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
    paragraphs:  Array.isArray(config.paragraphs) ? config.paragraphs : [],
    links:  Array.isArray(config.links) ? config.links : [],
  };
  const [openChapter, setOpenChapter] = useState(false);
  const [openSection, setOpenSection] = useState(false);
  const [openTitle, setOpenTitle] = useState(false);
  const [openParagraph, setOpenParagraph] = useState(false);
  const [openLink, setOpenLink] = useState(false);
  const [data, setData] = useState(initialConfig);
  const [chapterId, setChapterId] = useState(null); 
  const [sectionId, setSectionId] = useState(null);
  const [titleId, setTitleId] = useState(null);
  const [paragraphId, setParagraphId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [linkId, setLinkId]= useState(null);
  
  useEffect(() => {
  }, [config, documentId]);
  const methods = useForm({
    defaultValues: initialConfig,
  });

  const { handleSubmit, formState: { errors } } = methods;
  const [showPreview, setShowPreview] = useState(false);

  const onSubmit = async (formData) => {
    try {
      const newData = { ...config, ...formData };
      setData(newData);
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

  const handleLinkClick = () => {
    setOpenLink(true);
    setSelectedType('link');
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
    try {
      const document = await addSection(id, { section: sectionData });
      const newSection = document.content.find(item => item.title === sectionData.title);
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
      const newTitle = document.content.find(item => item.content === titleData.content);
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
      const newParagraph = document.content.find(item => item.text === paragraphData.text);
      setData(prevData => ({
        ...prevData,
        paragraphs: [...prevData.paragraphs, newParagraph]
      }));
      setParagraphId(newParagraph._id);
    } catch (error) {
      console.error('Error al crear el párrafo:', error);
    }
  };

  const handleLinkCreate = async (linkData) => {
    try {
        const document = await addLink(id, linkData);
        const newLink = document.content.find(item => item.src === linkData.src);
        setData(prevData => ({
            ...prevData,
            links: [...prevData.links, newLink]
        }));
        setLinkId(newLink._id);
    } catch (error) {
        console.error('Error al crear el link:', error);
    }
};

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 20,
  },
  pageWithBg: {
    flexDirection: 'column',
    padding: 20,
    position: 'relative',
    backgroundColor: 'white',
  },
  header: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 70,
    height: 15,
  },
  watermark: {
    position: 'absolute',
    top: '30%',
    opacity: 0.1,
    fontSize: 20,
    left: '20%',
    justifyContent: 'center',
    color: 'gray',
    zIndex: -1,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    textAlign: 'justify',
    marginBottom: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  text: {
    margin: 10,
    fontSize: 14,
    textAlign: 'justify',
  },
  paragraph: {
    fontSize: 10,
    textAlign: 'justify',
    marginBottom: 10,
  },
  toc: {
    fontSize: 16,
    margin: 10,
  },
  backgroundImage: {
    width: '100%',
    height: '90%',
    zIndex: -1,
  },
 link: {
    fontSize: 10,
    textAlign: 'justify',
    marginBottom: 10,
    color:'blue',
    textDecoration:'underline'
  },
  titleCover: {
      position: 'absolute',
      color: 'white',
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'left',
      marginLeft: '10%',
      width: '100%',
      marginTop:'50%'
  },
  subtitleCover: {
    position: 'absolute',
    color: 'white',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'left',
    marginLeft: '10%',
    width: '100%',
    marginTop:'60%'
},
coverLogo: {
  width: 150,
  height: 50,
  justifyContent:'center',
  marginLeft:'35%',
  marginTop: 20
},
});

const PdfDoc = ({ config }) => {
  const chapters = config.chapters || [];
  const sections = config.sections || [];
  const titles = config.titles || [];
  const paragraphs = config.paragraphs || [];
  const links = config.links|| [];

  return (
    <Document>
      <Page size="A4" style={config.coverImg ? styles.pageWithBg : styles.page}>
      {config.title && (
          <Text style={styles.titleCover}>{config.title}</Text>
        )}
        {config.subtitle && (
          <Text style={styles.subtitleCover}>{config.subtitle}</Text>
        )}
        {config.coverImg && (
          <Image style={styles.backgroundImage} src={config.coverImg} />
        )}
         {config.coverLogo && (
          <Image style={styles.coverLogo} src={config.coverLogo} />
        )}
      </Page>
      {chapters.map((chapter, index) => (
        <Page key={`chapter-${index}`} size="A4" style={styles.page}>
          {config.headerLogo && (
            <Image style={styles.header} src={config.headerLogo} />
          )}
          {config.watermark && (
            <Text style={styles.watermark}>{config.watermark}</Text>
          )}
          <View style={styles.section}>
            <Text style={styles.title}>{chapter.title}</Text>
            <Text style={styles.text}>{chapter.subtitle}</Text>
          </View>
        </Page>
      ))}
      {sections.map((section, index) => (
        <Page key={`section-${index}`} size="A4" style={styles.page}>
          {config.headerLogo && (
            <Image style={styles.header} src={config.headerLogo} />
          )}
          {config.watermark && (
            <Text style={styles.watermark}>{config.watermark}</Text>
          )}
          <View style={styles.section}>
            <Text style={styles.title}>{section.title}</Text>
            <Text style={styles.text}>{section.subtitle}</Text>
          </View>
        </Page>
      ))}
      <Page size="A4" style={styles.page}>
        {config.headerLogo && (
          <Image style={styles.header} src={config.headerLogo} />
        )}
        {config.watermark && (
          <Text style={styles.watermark}>{config.watermark}</Text>
        )}
        <View style={styles.section}>
          {titles.map((title, index) => (
            <Text key={`title-${index}`} style={styles.title}>{title.content}</Text>
          ))}
          {paragraphs.map((paragraph, index) => (
            <Text key={`paragraph-${index}`} style={styles.paragraph}>{paragraph.text}</Text>
          ))}
           {links.map((link, index) => (
            <Text key={`link-${index}`} style={styles.link}>{link.src}</Text>
          ))}
        </View>
      </Page>
    </Document>
  );
};

const generatePdf = async () => {
  try {
    const blob = await pdf(<PdfDoc config={data} />).toBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const title = data.title.content || 'documento';
    link.setAttribute('download', `${title}.pdf`);
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
  const handleEnterLink = (linkId) => {
    navigate(`link/${linkId}`);
};

  const isDisabled = (buttonType) => {
    if (selectedType === 'chapter' && buttonType !== 'chapter') {
      return true; 
    }
    if (selectedType === 'section' && buttonType !== 'section') {
      return true; 
    }
    if (['title', 'paragraph', 'link'].includes(selectedType)) {
      return ['chapter', 'section'].includes(buttonType); 
    }
    return false; 
  };

  //
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderList = (list, startIndex, endIndex) => {
      const result = Array.from(list);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);

      return result;
    };

    if (result.type === 'chapter') {
      const reorderedChapters = reorderList(data.chapters, result.source.index, result.destination.index);
      setData(prevData => ({
        ...prevData,
        chapters: reorderedChapters
      }));
    } else if (result.type === 'section') {
      const reorderedSections = reorderList(data.sections, result.source.index, result.destination.index);
      setData(prevData => ({
        ...prevData,
        sections: reorderedSections
      }));
    } else if (result.type === 'title') {
      const reorderedTitles = reorderList(data.titles, result.source.index, result.destination.index);
      setData(prevData => ({
        ...prevData,
        titles: reorderedTitles
      }));
    } else if (result.type === 'paragraph') {
      const reorderedParagraphs = reorderList(data.paragraphs, result.source.index, result.destination.index);
      setData(prevData => ({
        ...prevData,
        paragraphs: reorderedParagraphs
      }));
    } else if (result.type === 'link') {
      const reorderedLinks = reorderList(data.links, result.source.index, result.destination.index);
      setData(prevData => ({
        ...prevData,
        links: reorderedLinks
      }));
    }
  };
  
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
                    <ListItemButton  disabled={isDisabled('chapter')} onClick={handleChapterClick}>
                      <ListItemIcon>
                      <ImportContactsIcon />
                      </ListItemIcon>
                      <ListItemText primary="Capítulo" />
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                  <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled('section')} onClick={handleSectionClick}>
                      <ListItemIcon>
                      <BookIcon />
                      </ListItemIcon>
                      <ListItemText primary="Sección" />
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon/>
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
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled('title')} onClick={handleTitleClick}>
                      <ListItemIcon>
                      <TitleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Título" />
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon/>
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled('paragraph')} onClick={handleParagraphClick}>
                      <ListItemIcon>
                      <FormatAlignJustifyIcon />
                      </ListItemIcon>
                      <ListItemText primary="Párrafo" />
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon />
                      </IconButton>
                    </ListItemButton>
                  </ListItem>
                  <Divider/>
                <ListItem disablePadding>
                    <ListItemButton disabled={isDisabled('link')} onClick={handleLinkClick}>
                      <ListItemIcon>
                      <InsertLinkIcon />
                      </ListItemIcon>
                      <ListItemText primary="Link" />
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon/>
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
                      <IconButton  sx={{
                          color: 'inherit', 
                          '&:hover': {
                            color: '#ffffff', 
                            backgroundColor: 'primary.main', 
                          }}}>
                      <AddIcon/>
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
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="chapters" type="chapter">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {data.chapters.map((chapter, index) => (
                        chapter && chapter.title && (
                          <Draggable key={chapter._id} draggableId={chapter._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent sx={{ 
                                  pl: 4, 
                                  pr: 4, 
                                  mb: 3, 
                                  pt: 2, 
                                  pb: 2, 
                                  backgroundColor: '#E9EAEC', 
                                  borderRadius: '10px',
                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                                >
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'primary.main', width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <ImportContactsIcon />
                                      <Typography sx={{ ml: 1, mt: 1 }}>Capítulo</Typography>
                                    </Box>
                                    <LongMenu />
                                  </Box>
                                  <Typography variant="h5" sx={{ mb: 1, mt: 1 }}>
                                    {chapter.title}
                                  </Typography>
                                  <Divider/>
                                  <Typography variant="subtitle1" sx={{ mb: 1, mt: 1 }}>
                                    {chapter.subtitle}
                                  </Typography>
                                  <Divider />
                                  {chapter.img && (
                                    <CardMedia
                                      sx={{ mt: 1 }}
                                      component="img"
                                      height="140"
                                      width="140"
                                      image={chapter.img}
                                      alt="chapter-image"
                                    />
                                  )}
                                  <div className='buttons-chapter-mydocument'>
                                    <Button variant="contained" endIcon={<SendIcon />} size="small"
                                      sx={{ width: 100 , ml: 'auto', marginTop: '20px'}} 
                                      onClick={handleEnterChapter}>
                                      Entrar
                                    </Button>
                                  </div>
                                </CardContent>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              <Droppable droppableId="sections">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {data.sections.map((section, index) => (
                      section && section.title && (
                        <Draggable key={section._id} draggableId={section._id} index={index}>
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <CardContent sx={{ 
                                pl: 4, 
                                pr: 4, 
                                mb: 3, 
                                pt: 2, 
                                pb: 2, 
                                backgroundColor: '#E9EAEC', 
                                borderRadius: '10px',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}
                              >
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'primary.main', width: '100%' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <BookIcon />
                                      <Typography sx={{ ml: 1, mt: 1 }}>Sección</Typography>
                                  </Box>
                                      <LongMenu />
                                </Box>
                                <Typography variant="h5" sx={{ mb: 2, mt: 1 }}>
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
                                <div className='buttons-chapter-mydocument'>
                                <Button variant="contained" endIcon={<SendIcon />} size="small"
                                sx={{ width: 100 , ml: 'auto', marginTop: '20px'}} 
                                onClick={handleEnterSection}>
                                Entrar
                                </Button>
                                </div>
                              </CardContent>
                            </div>
                          )}
                        </Draggable>
                      )
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <Droppable droppableId="titles" type="title">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {data.titles.map((title, index) => (
                        title && title.content && (
                          <Draggable key={title._id} draggableId={title._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent sx={{ 
                                  pl: 4, 
                                  pr: 4, 
                                  mb: 3, 
                                  pt: 2, 
                                  pb: 2, 
                                  backgroundColor: '#E9EAEC', 
                                  borderRadius: '10px',
                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'primary.main', width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <TitleIcon />
                                      <Typography sx={{ ml: 1, mt: 0.2 }}>Título</Typography>
                                    </Box>
                                    <LongMenu />
                                  </Box>
                                  <Typography variant="h5" sx={{ mb: 1, mt: 1 }}>
                                    {title.content}
                                  </Typography>
                                </CardContent>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              
                <Droppable droppableId="paragraphs" type="paragraph">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {data.paragraphs.map((paragraph, index) => (
                        paragraph && paragraph.text && (
                          <Draggable key={paragraph._id} draggableId={paragraph._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent sx={{ 
                                  pl: 4, 
                                  pr: 4, 
                                  mb: 3, 
                                  pt: 2, 
                                  pb: 2, 
                                  backgroundColor: '#E9EAEC', 
                                  borderRadius: '10px',
                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'primary.main', width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <FormatAlignJustifyIcon />
                                      <Typography sx={{ ml: 1, mt: 0.2 }}>Párrafo</Typography>
                                    </Box>
                                    <LongMenu />
                                  </Box>
                                  <Typography sx={{ mb: 2, mt: 1 }}>
                                    {paragraph.text}
                                  </Typography>
                                </CardContent>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
                <Droppable droppableId="links" type="link">
                  {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {data.links.map((link, index) => (
                        link && link.src && (
                          <Draggable key={link._id} draggableId={link._id} index={index}>
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                <CardContent sx={{ 
                                  pl: 4, 
                                  pr: 4, 
                                  mb: 3, 
                                  pt: 2, 
                                  pb: 2, 
                                  backgroundColor: '#E9EAEC', 
                                  borderRadius: '10px',
                                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)' }}>
                                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: 'primary.main', width: '100%' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                      <InsertLinkIcon />
                                      <Typography sx={{ ml: 1, mt: 0.2 }}>Link</Typography>
                                    </Box>
                                    <LongMenu />
                                  </Box>
                                  <Typography sx={{ mb: 2, mt: 1 }}>
                                    {link.src}
                                  </Typography>
                                </CardContent>
                              </div>
                            )}
                          </Draggable>
                        )
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
            </DragDropContext>
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

      {openChapter && <ChapterDialog openChapter={openChapter} setOpenChapter={setOpenChapter} onChapterCreate={handleChapterCreate} onCancel={handleCancelDialog}/>}
      {openSection &&<SectionDialog openSection={openSection} setOpenSection={setOpenSection} onSectionCreate={handleSectionCreate} onCancel={handleCancelDialog}/>}
      {openTitle &&<TitleDialog openTitle={openTitle} setOpenTitle={setOpenTitle} onTitleCreate={handleTitleCreate} onCancel={handleCancelDialog}/>}
      {openParagraph &&<ParagraphDialog openParagraph={openParagraph} setOpenParagraph={setOpenParagraph} onParagraphCreate={handleParagraphCreate} onCancel={handleCancelDialog}/>}
      {openLink &&<LinkDialog openLink={openLink} setOpenLink={setOpenLink} onLinkCreate={handleLinkCreate} onCancel={handleCancelDialog}/>}


    </>
  );
}

export default MyDocument;
