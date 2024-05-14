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
import DocumentProvider from '../../context/DocumentContext';

const Home = () => {
    const navigate = useNavigate();
  
    const handleButtonClick = () => {
      navigate('/config'); 
    };
  
    return (
        <DocumentProvider> 
      <div className="homeContainer">
        <h3 className="boxHome">Mis plantillas</h3>
        <div className="buttonHome">
          <Button variant="contained" className='addTemplate' onClick={handleButtonClick}>Crear Plantilla</Button>
        </div>
        <Card sx={{ maxWidth: 345 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="140"
              width="280"
              image=""
              alt="document"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Documento 1
              </Typography>
              <Typography variant="body2" color="text.secondary">
                subtítulo documento 1
              </Typography>
            </CardContent>
          </CardActionArea>
          <DeleteIcon />
          <DownloadIcon />
        </Card>
        <ListPdf/>
      </div>
        </DocumentProvider>
    );
  };
  
  export default Home;

