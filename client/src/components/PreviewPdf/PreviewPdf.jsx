import React from 'react'
import {Document,Page, Text, View, StyleSheet } from '@react-pdf/renderer'
<<<<<<< HEAD
=======
import { useDocument } from '../../context/DocumentContext.jsx'
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed


const styles = StyleSheet.create({
    page:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: '#E4E4E4'
    },
    section:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})

<<<<<<< HEAD
const PreviewPdf = ({config}) => {
    const {size, title, subtitle,coverLogo, toc, theme, padding, highlightedValue, docExplanation, coverImg, headerLogo, watermark, includeCover,includeBackCover } = config;
  return (
    
    <Document>
        <Page size={size} style={styles.page}>
            <View style={styles.section}>
                {toc && <Text>Índice:</Text>}
                <Text>Título: {title}</Text>
                <Text>Subtítulo: {subtitle}</Text>
                <Text>{coverLogo}</Text>
                <Text>{theme}</Text>
            </View>
        </Page>
    </Document>
=======
const PreviewPdf = ({config, data}) => {   
    console.log('data desde Preview',config,data)
    /* const {config, setConfig} = useDocument(); 
    console.log('config desde preview',config) */
    const {size = config?.size || 'A4', title = {}, subtitle = config?.subtitle, coverLogo = config?.coverLogo, theme = config?.theme, toc = config?.toc } = config;
    console.log('titulo preview', title)
    const titleContent = title?.content || 'Título no definido';
    console.log('titulo preview', titleContent)
    return (
        <>
        <Document>
            <Page size={size} style={styles.page}>
                <View style={styles.section}>
                    {toc && <Text>Índice:</Text>}
                    <Text>Título: {titleContent}</Text>
                    <Text>Subtítulo: {config?.subtitle}</Text>
                    <Text>{coverLogo}</Text>
                    <Text>{theme}</Text>
                </View>
        </Page>
    </Document>
        </>
    
>>>>>>> a8dc850b67d251891789adb3eb8b4addf8969fed

   
  )
}

export default PreviewPdf;