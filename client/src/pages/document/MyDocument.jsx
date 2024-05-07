import React, {useEffect, useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import './MyDocument.css';
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Index from '../../components/Index';

const PdfDoc = ({ config }) => (
  <Document>
     <Page size={config.size}>
       <View >
         <Text>{config.title}</Text>
         <Text>{config.subtitle}</Text>
       </View>
     </Page>
  </Document>
 );
const MyDocument = () => {
  const[showPreview, setShowPreview] = useState(false);
  const location = useLocation();
  const config = location.state?.config;
  const navigate = useNavigate();

  const handlePreview = () =>{
    setShowPreview(!showPreview);
}

const handleDownloadPdf = async () => {
  
  const blob = await pdf(<PdfDoc config={config} />).toBlob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'documento.pdf');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
 const { title, subtitle,coverLogo, toc,tocLevels, theme, padding, highlightedValue, docExplanation, coverImg, headerLogo, watermark, includeCover,includeBackCover, indexItems} = config;
  return (
    <>
    <div /* className='template-name' */><p>Nombre de la plantilla:{title}</p>
        <ul >
            <li><SaveIcon/></li>
            <li><GetAppIcon onClick={handleDownloadPdf}/></li>
            <li onClick={handlePreview} ><VisibilityIcon/></li>
        </ul></div>
    <div className='document-body'>
    {config.toc && <Index indexItems={config.indexItems} />}
      <div className='option-list'></div>
      <div className='pdf-background'></div>

    </div>
    <button className='exit-button' onClick={()=>navigate('/')}>SALIR SIN GUARDAR</button>
    </>
  )
}

export default MyDocument



