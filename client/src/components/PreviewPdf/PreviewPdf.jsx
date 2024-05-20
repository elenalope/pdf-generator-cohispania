import React from 'react'
import {Document,Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { useDocument } from '../../context/DocumentContext.jsx'


const styles = StyleSheet.create({
    page:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: 'white', 
        width: '148mm', 
        height: '210mm',
    },
    body:{
        paddingTop: 35,
        paddingBottom: 35,
        paddingHorizontal: 35,
    },
    title:{
        display: 'flex',
        fontSize: 24,
        textAlign: 'left',
        fontFamily: '',
        marginLeft: '40px'
    },
    subtitle:{
        display: 'flex',
        fontSize: 18,
        textAlign: 'left',
        fontFamily: '',
        marginLeft: '40px'
    },
    paragraph:{
        display: 'flex',
        fontSize: 12,
        textAlign: 'left',
        marginLeft: '40px'
    },
    section:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        margin: 10,
        padding: 10,
        flexGrow: 1
    },
    subsection:{
        display: 'flex',
        flexDirection: 'column',
    },
})


const PreviewPdf = ({config, data}) => {   
    console.log('data desde Preview',config,data)
    /* const {config, setConfig} = useDocument(); 
    console.log('config desde preview',config) */
    const {size = config?.size || 'A4', title = config?.title, subtitle = config?.subtitle, coverLogo = config?.coverLogo, theme = config?.theme, toc = config?.toc } = config;
    console.log('titulo preview', title)
    /* const titleContent = title?.content || 'Título no definido'; */
    return (
        <>
       <Document>
            <Page size={size} style={styles.page}>
                <View style={styles.page}>
                    {toc && <Text>Índice:</Text>}
                    <Text>Título: {title}</Text>
                    <Text>Subtítulo: {config?.subtitle}</Text>
                    <Text>{coverLogo}</Text>
                    <Text>{theme}</Text>
                </View>
                {data && data.chapters && data.chapters.map((chapter, index) => (
                    <View key={index} style={styles.page}>
                        <Text style={styles.title}>{chapter.title}</Text>
                        <Text style={styles.subtitle}>{chapter.subtitle}</Text>
                        {chapter.paragraphs && chapter.paragraphs.map((paragraph, idx) => (
                            <Text key={idx} style={styles.paragraph}>{paragraph.content}</Text>
                        ))}
                    </View>
                ))}
            </Page>
        </Document>
        </>
    

   
  )
}

export default PreviewPdf;