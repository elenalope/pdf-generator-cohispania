import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { pdf, Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf.jsx';
import './Chapter.css';
import { styled } from '@mui/material/styles';
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
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { addSectionFromChapter } from '../../services/sectionFromChapter';
import SectionFromChapterDialog from '../../components/sectionFromChapter/SectionFromChapterDialog.jsx';
import IconButton from '@mui/material/IconButton';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';
import TitleIcon from '@mui/icons-material/Title';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import LongMenu from '../../components/cards/DropDownMenu.jsx';
import MoveDownIcon from '@mui/icons-material/MoveDown';

const Chapter = () => {
  const navigate = useNavigate();
  const { id: templateId, id: chapterId, id: sectionId } = useParams();
  const [openAddSection, setOpenAddSection] = useState(false);
  const [data, setData] = useState({ sections: [] });
  const { config = {}, documentId } = location.state || {};
  const [showPreview, setShowPreview] = useState(false);

  const initialConfig = { ...config, 
    chapters: Array.isArray(config.chapters) ? config.chapters : [],
    sections: Array.isArray(config.sections) ? config.sections : [],
    titles:  Array.isArray(config.titles) ? config.titles : [],
    paragraphs:  Array.isArray(config.paragraphs) ? config.paragraphs : [],
    links:  Array.isArray(config.links) ? config.links : [],
  };

  const handlePreview = () => {
    setShowPreview(!showPreview);
  };

  // Descarga documento
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
    width: 50,
    height: 50,
  },
  watermark: {
    position: 'absolute',
    top: '20%',
    left: '20%',
/*     transform: 'translate(-50%, -50%)',
 */ opacity: 0.3,
    fontSize: 50,
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
    textAlign: 'center',
    marginBottom: 20,
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
  toc: {
    fontSize: 16,
    margin: 10,
  },
  backgroundImage: {
    top: '10%',
    left: '5%',
    bottom: '10%',
    right: '5%',
    width: '90%',
    height: '80%',
/*     transform: 'translate(-50%, -50%)',
 */    
  },
});



const PdfDoc = ({ config }) => {
  const chapters = config.chapters || [];
  const sections = config.sections || [];

  return (
    <Document>
      <Page size="A4" style={config.coverImg ? styles.pageWithBg : styles.page}>
        {config.coverImg && (
          <Image style={styles.backgroundImage} src={config.coverImg} />
        )}
        {config.watermark && (
          <Text style={styles.watermark}>{config.watermark}</Text>
        )}
        <View style={styles.section}>
          <Text style={styles.title}>{config.title.content}</Text>
          <Text style={styles.subtitle}>{config.subtitle}</Text>
          {config.toc && <Text style={styles.toc}>Índice:</Text>}
          <Text style={styles.text}>{config.theme}</Text>
        </View>
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
    </Document>
  );
};



const generatePdf = async () => {
  try {
    const blob = await pdf(<PdfDoc config={data} />).toBlob();
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

  const handleSectionClick = () => {
    setOpenAddSection(true);
  };
  useEffect(() => {
  }, [data]);

  const handleSectionCreate = async (sectionFromChapterData) => {
    try {
      const updatedChapter = await addSectionFromChapter(templateId, chapterId, { section: sectionFromChapterData });
      setData({ sections: updatedChapter.content });
    } catch (error) {
      console.error('Error creating chapter:', error);
    }
  };


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
  const handleEnterSection = (sectionId) => {
    if (sectionId) {
      navigate(`section/${sectionId}`);
    }
  };
  return (
    <>
    <form className='formMyDocument'>
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
                    <ListItemButton  disabled>
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
                  <ListItem disablePadding onClick={handleSectionClick}>
                    <ListItemButton >
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
                    <ListItemButton disabled>
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
                    <ListItemButton disabled>
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
                    <ListItemButton disabled>
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
                    <ListItemButton>
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
          {data.sections.map((section, index) => (
                section && section.title && (
                  <CardContent key={index} sx={{ 
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
                    onClick={handleEnterSection} >
                    Entrar
                    </Button>
                    </div>
                    
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

      {openAddSection &&<SectionFromChapterDialog openAddSection={openAddSection} setOpenAddSection={setOpenAddSection} onSectionCreate={handleSectionCreate}  /* onCancel={handleCancelDialog} *//>}    </>
  );
}

export default Chapter;