import React, { useEffect, useState } from 'react';
import { getPDF } from '../../services/pdfServices';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewPdf from '../PreviewPdf/PreviewPdf';

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
    <div className='listPdfContainer' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {documents.map((document, index) => (
        <Card key={index} sx={{ width: '280px', height: '280px', margin: '30px' }}>
          <CardActionArea>
            <CardContent> 
              <PreviewPdf config={document} />
              <Typography gutterBottom variant="h5" component="div">
                {document.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {document.title.content}
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
