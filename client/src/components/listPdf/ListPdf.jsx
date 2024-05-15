import React, {useEffect,useContext} from 'react';
import { getPDF } from '../../services/pdfServices';
import { DocumentContext } from '../../context/DocumentContext';
import { useNavigate } from 'react-router-dom'; 


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


  return (
    <div className='listPdfContainer'>
      <h3>Lista de plantillas</h3>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>{document.name && document.name}</li>
        ))}
      </ul>
     
    </div>
  );
};

export default ListPdf