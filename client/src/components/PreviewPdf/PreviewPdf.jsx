import React from 'react'
import {Document,Page, Text, View, StyleSheet } from '@react-pdf/renderer'
import { useDocument } from '../../context/DocumentContext.jsx'


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
                    <Text>Subtítulo: {subtitle}</Text>
                    <Text>{coverLogo}</Text>
                    <Text>{theme}</Text>
                </View>
                {data && data.chapters && data.chapters.map((chapter, index) => (
                    <View key={index} style={styles.chapter}>
                        <Text style={styles.chapterTitle}>{chapter.title}</Text>
                        <Text style={styles.chapterSubtitle}>{chapter.subtitle}</Text>
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