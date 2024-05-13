import React from 'react'
import {Document,Page, Text, View, StyleSheet } from '@react-pdf/renderer'


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

const PreviewPdf = ({config}) => {    
    console.log('config desde preview',config)
    const {size = config?.size || 'A4', title = config?.title, subtitle = config?.subtitle, coverLogo = config?.coverLogo, theme = config?.theme, toc = config?.toc } = config;
    const titleContent = title?.content || 'Título no definido';
    return (
    
    <Document>
        <Page size={size} style={styles.page}>
            <View style={styles.section}>
                {toc && <Text>Índice:</Text>}
                <Text>Título: {titleContent}</Text>
                <Text>Subtítulo: {subtitle}</Text>
                <Text>{coverLogo}</Text>
                <Text>{theme}</Text>
            </View>
        </Page>
    </Document>

   
  )
}

export default PreviewPdf;