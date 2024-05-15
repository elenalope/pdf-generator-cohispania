import './Home.css';
import ListPdf from '../../components/listPdf/ListPdf';
import * as React from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom'; 
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import { useContext, useEffect } from 'react';
import { DocumentContext } from '../../context/DocumentContext';
import { getPDF } from '../../services/pdfServices';

const Home = () => {
    const navigate = useNavigate();
    const { documents, setDocuments } = useContext(DocumentContext);

    useEffect(() => {
      const fetchDocuments = async () => {
        try {
          const data = await getPDF();
          setDocuments(data);
        } catch (error) {
          console.error('Error fetching documents', error.message);
        }
      };
  
      fetchDocuments();
    }, [setDocuments]);
    const handleButtonClick = () => {
      navigate('/config'); 
    };
  
    return (
      <div className="homeContainer">
        <h3 className="boxHome">Mis plantillas</h3>
        <div className="buttonHome">
          <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
        </div>
        {documents.map((doc) => (
          <Card key={doc._id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                width="280"
                image={doc.imageUrl || ""}
                alt="document"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {doc.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {doc.subtitle}
                </Typography>
              </CardContent>
            </CardActionArea>
            <DeleteIcon />
            <DownloadIcon />
          </Card>
        ))}
        <ListPdf />
      </div>
    );
  };
  
  export default Home;