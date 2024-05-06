import React, {useEffect, useState} from 'react'
import {useLocation, useNavigate} from 'react-router-dom'
import './MyDocument.css'
import { pdf, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { PDFViewer } from '@react-pdf/renderer';


/* const PdfDoc = ({ config }) => (
  <Document>
     <Page size={config.size} style={styles.page}>
       <View style={styles.section}>
         <Text>{config.title}</Text>
         <Text>{config.subtitle}</Text>
       </View>
     </Page>
  </Document>
 ); */
const MyDocument = () => {
  const location = useLocation();
  const config = location.state?.config;
  const navigate = useNavigate();
  useEffect(() => {
      navigate('/document');
 }, [config, navigate]);
 const { title} = config;
  return (
    <>
    <div className='template-name'>dd{title}</div>
    <div className='document-body'>
      <div className='option-list'></div>
      <div className='pdf-background'></div>
    </div>
    <button className='exit-button' onClick={()=>navigate('/')}>SALIR SIN GUARDAR</button>
    </>
  )
}

export default MyDocument



