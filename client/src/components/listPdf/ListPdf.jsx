import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPDF, deletePDF } from '../../services/pdfServices';
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
                            backgroundColor: 'rgba(0, 255, 0, 0.1)' }}}>
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
