import React, { useEffect, useState } from 'react';
import { getPDF, deletePDF } from '../../services/pdfServices';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewPdf from '../PreviewPdf/PreviewPdf';
import { useNavigate } from 'react-router-dom';

const ListPdf = () => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

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

  const handleDeleteDocument = async (id) => {
    const confirmDelete = window.confirm("¿Estás seguro que deseas borrar el documento?");
    if (confirmDelete) {
      try {
        await deletePDF(id);
        setDocuments(documents.filter(document => document.id !== id));
        window.location.reload();
      } catch (error) {
        console.error('Error deleting document:', error.message);
      }
    }
  };

  const handleNavigateDocument = async(id) =>{
    navigate(`/document/${id}`)
  }

  return (
    <div className='listPdfContainer' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {documents.map((document, index) => (
        <Card key={index} sx={{ width: '290px', height: '310px', margin: '30px' }}>
          <CardActionArea>
            <CardContent onClick={()=> handleNavigateDocument(document._id)}> 
              <div style={{ width: '100%', height: '200px', overflow: 'hidden' }} >
                {/* <PreviewPdf config={document}  /> */}
              {document.coverImg }
              </div>
              <Typography gutterBottom variant="h5" component="div">
                {document.name}
              </Typography>
            </CardContent>
          </CardActionArea>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <DeleteIcon onClick={() => handleDeleteDocument(document._id)} />
            <DownloadIcon/>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListPdf;
