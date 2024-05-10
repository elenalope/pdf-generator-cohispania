import React, {useEffect, useState} from 'react';
import { getPDF } from '../../services/pdfServices';


const ListPdf = () => {

  const [documents, setDocuments] = useState([]);

  useEffect(()=>{

    const getDocuments = async () => {
      const response = await getPDF();
      console.log(response)
       setDocuments(response)
      }

    getDocuments();
  }, [])


  return (
    <div className='listPdfContainer'>
      <h3>Lista de plantillas</h3>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>{document.title && document.title.text}</li>
        ))}
      </ul>
     
    </div>
  );
};

export default ListPdf