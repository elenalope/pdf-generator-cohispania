import React from 'react'
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'


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

const PreviewPdf = ({handleConfig}) => {
  return (
    <Document>
        <Page size={handleConfig.size} style={styles.page}>
            <View style={styles.section}>
                {handleConfig.toc && <Text>Índice:</Text>}
                <Text>Título: {handleConfig.title}</Text>
                <Text>Subtítulo: {handleConfig.subtitle}</Text>
                <Text>{handleConfig.logo}</Text>
            </View>
        </Page>
    </Document>
  )
}

export default PreviewPdf