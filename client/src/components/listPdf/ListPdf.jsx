import React, { useEffect, useState } from 'react';
import { getPDF, deletePDF } from '../../services/pdfServices';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewPdf from '../PreviewPdf/PreviewPdf';
import DeletePDF from '../alerts/DeleteAlert';
import Deleting from '../alerts/DeleteConfirm';

const ListPdf = () => {
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

    return (
        <div className='listPdfContainer' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {documents.map((document, index) => (
                <Card key={index} sx={{ width: '290px', height: '310px', margin: '30px' }}>
                    <CardActionArea>
                        <CardContent>
                            <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
                                <PreviewPdf config={document} style={{ width: '100%', height: '100%' }} />
                            </div>
                            <Typography gutterBottom variant="h5" component="div">
                                {document.name}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                        <DeleteIcon type="submit" variant="contained" onClick={() => handleDeleteDocument(document._id)} />
                        {showAlert && <DeletePDF onClose={() => setShowAlert(false)} onConfirm={handleConfirmDelete} />}
                        {showDeletingAlert && <Deleting onClose={() => setShowDeletingAlert(false)} />}
                        <DownloadIcon />
                    </div>
                </Card>
            ))}
        </div>
    );
};

export default ListPdf;