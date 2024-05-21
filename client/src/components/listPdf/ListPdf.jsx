import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPDF, deletePDF, getById } from '../../services/pdfServices';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import DeletePDF from '../alerts/DeleteAlert';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import { Document, Page, pdf, View, Text, StyleSheet, Image } from '@react-pdf/renderer';

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
      opacity: 0.3,
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
      height: '80%'  
    },
  });
  
  const PdfDoc = ({ config }) => {
    const chapters = config.content || [];  
    console.log('Chapters:', chapters);
  
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
            <Text style={styles.title}>{config.title}</Text>
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
              {chapter.content && chapter.content.map((section, secIndex) => (
                <View key={`section-${secIndex}`} style={styles.section}>
                  <Text style={styles.title}>{section.title}</Text>
                  {section.content && section.content.map((subsection, subIndex) => (
                    <View key={`subsection-${subIndex}`} style={styles.section}>
                      <Text style={styles.subtitle}>{subsection.title}</Text>
                      <Text style={styles.text}>{subsection.paragraph}</Text>
                      {subsection.content && subsection.content.map((item, itemIndex) => (
                        <Text key={`item-${itemIndex}`} style={styles.text}>{item.content}</Text>
                      ))}
                    </View>
                  ))}
                </View>
              ))}
            </View>
          </Page>
        ))}
      </Document>
    );
  };
const ListPdf = () => {
    const navigate = useNavigate();
    const [documents, setDocuments] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [showDeletingAlert, setShowDeletingAlert] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await getPDF();
                setDocuments(response);
            } catch (error) {
                console.error('Error fetching documents:', error.message);
            }
        };

        fetchDocuments();
    }, []);

    const handleDeleteDocument = (id) => {
        setDeleteId(id);
        setShowAlert(true);
    };

    const handleConfirmDelete = async () => {
        if (deleteId) {
            try {
                await deletePDF(deleteId);
                setDocuments(documents.filter(document => document.id !== deleteId));
                setShowDeletingAlert(true);
            } catch (error) {
                console.error('Error deleting document:', error.message);
            }
            setShowAlert(false);
        }
    };

    useEffect(() => {
        if (showDeletingAlert) {
            const timer = setTimeout(() => {
                setShowDeletingAlert(false);
                window.location.reload();
            }, 600);

            return () => clearTimeout(timer);
        }
    }, [showDeletingAlert]);

    const handleDownloadDocument = async (id) => {
        try {
          const response = await getById(id);
          const blob = await pdf(<PdfDoc config={response} />).toBlob();
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'documento.pdf');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } catch (error) {
          console.error('Error downloading document:', error.message);
        }
      };
    return (
        <div className='listPdfContainer' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {documents.map((document, index) => (
                <Card key={index} 
                sx={{ 
                width: '300px', 
                height: '300px', 
                margin: '30px', 
                background: 'linear-gradient(145deg, #ffffff, #f6f6f6)',
                boxShadow: '0 8px 16px 0 rgba(0,0,0,0.2)',
                transition: 'transform 0.3s ease-in-out',
                '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 10px 20px 0 rgba(0,0,0,0.3)'
                },
                borderRadius: '15px' }}>
                    <CardActionArea >
                        <CardContent onClick={() => navigate(`document/${document._id}`)}>
                            <div style={{ width: '100%', height: '160px', overflow: 'hidden', marginBottom: '9%' }}>
                            {document.coverImg && (
                            <img src={document.coverImg} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                            </div>
                            <Typography gutterBottom variant="h5" component="div">
                                {document.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: '5%' }}>
                        <IconButton
                            sx={{
                            color: 'black', 
                            '&:hover': {
                            color: 'red', 
                            backgroundColor: 'rgba(255, 0, 0, 0.1)' 
                            }
                            }} 
                            onClick={() => handleDeleteDocument(document._id)}>
                            <DeleteIcon />
                        </IconButton>
                        <IconButton
                            sx={{
                            color: 'black', 
                            '&:hover': {
                            color: 'green', 
                            backgroundColor: 'rgba(0, 255, 0, 0.1)' }}} onClick={() => handleDownloadDocument(document._id)}>
                            <DownloadIcon />
                        </IconButton>
                    </div>
                </Card>
            ))}
            {showAlert && <DeletePDF onClose={() => setShowAlert(false)} onConfirm={handleConfirmDelete} />}
            {showDeletingAlert && (
                <Stack
                    sx={{
                        position: 'fixed',
                        bottom: 16,
                        right: 16,
                        width: 'auto',
                        zIndex: 1500
                    }}
                    spacing={2}
                >
                    <Alert variant="filled" severity="error">
                        El documento fue eliminado
                    </Alert>
                </Stack>
            )}
        </div>
    );
};

export default ListPdf;
