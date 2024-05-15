import React, { useEffect, useState } from 'react';
import { getPDF } from '../../services/pdfServices';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';

const ListPdf = () => {
  const [documents, setDocuments] = useState([]);

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

  return (
    <div className='listPdfContainer' style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
      {/* <h3>Lista de plantillas</h3> */}
      {documents.map((document, index) => (
        <Card key={index} sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="280"
              image={document.image} 
              alt="document"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {document.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {document.subtitulo}
              </Typography>
            </CardContent>
          </CardActionArea>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <DeleteIcon />
            <DownloadIcon />
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListPdf;
