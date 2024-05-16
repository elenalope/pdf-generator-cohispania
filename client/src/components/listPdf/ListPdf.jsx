import React, {useEffect,useContext} from 'react';
import { getPDF, deletePDF } from '../../services/pdfServices';
import { DocumentContext } from '../../context/DocumentContext';
import { useNavigate } from 'react-router-dom'; 
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import PreviewPdf from '../PreviewPdf/PreviewPdf';


const ListPdf = () => {

  const navigate = useNavigate();
  const { documents, setDocuments } = useContext(DocumentContext);


  useEffect(()=>{
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
            <DeleteIcon onClick={() => handleDeleteDocument(document._id)} />
            <DownloadIcon/>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default ListPdf;
