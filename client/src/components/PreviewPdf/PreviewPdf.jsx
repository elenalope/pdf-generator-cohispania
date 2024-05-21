import React from 'react'
import {Document, Image, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: 'white', 
        width: '148mm', 
        height: '210mm',
        padding: '5mm',
    },
    cover: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      },
      coverImage: {
        width: '90%',
        height: '90%',
        marginTop: '10%',
        marginLeft: '5%',
        marginBottom: '10%',
        marginRight: '5%',
        objectFit: 'cover',
        position: 'absolute',
        top: 0,
        left: 0
      },
      titleCover: {
        position: 'absolute',
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'left',
        marginLeft: '20%',
        width: '100%',
      },
      subtitleCover: {
        position: 'absolute',
        color: 'white',
        fontSize: 24,
        textAlign: 'left',
        marginTop: '20%', 
        width: '100%',
        marginLeft: '20%',
      }
    });
    // titleCover:{
    //     display: 'flex',
    //     fontSize: 25,
    //     textAlign: 'left',
    //     fontFamily: '',
    //     marginLeft: '40px',
    // },
    // subtitle:{
    //     display: 'flex',
    //     fontSize: 18,
    //     textAlign: 'left',
    //     fontFamily: '',
    //     marginLeft: '40px'
    // },
    // paragraph:{
    //     display: 'flex',
    //     fontSize: 12,
    //     textAlign: 'left',
    //     marginLeft: '40px'
    // },
    // section:{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     gap: '20px',
    //     margin: 10,
    //     padding: 10,
    //     flexGrow: 1
    // },
    // subsection:{
    //     display: 'flex',
    //     flexDirection: 'column',
    // },
    // backgroundImage: {
    //     top: '10%',
    //     left: '5%',
    //     bottom: '10%',
    //     right: '5%',
    //     width: '90%',
    //     height: '80%'  
    //   },
    //   header: {
    //     position: 'absolute',
    //     top: 10,
    //     left: 10,
    //     width: 50,
    //     height: 50,
    //   }


const PreviewPdf = ({ config, data, titleData }) => {
    console.log('Estoy aquí', titleData)   
    const { size = config?.size || 'A4', title = config?.title, subtitle = config?.subtitle, coverLogo = config?.coverLogo, theme = config?.theme, toc = config?.toc, coverImg = config?.coverImg } = config;

    return (
        <Document>
            <Page size={size} style={styles.page}>
                <View style={styles.cover}>
                {coverImg && ( 
                    <img src={coverImg} alt="Cover" style={{ 
                        width: '90%', 
                        height: '90%', 
                        marginTop: '10%',
                        marginLeft: '5%',
                        marginBottom: '5%',
                        marginRight: '5%', 
                        objectFit: 'cover' }} />
                        )}
                    <Text style={styles.titleCover}>{title}</Text>
                    <Text style={styles.subtitleCover}>{subtitle}</Text>
                    {coverLogo && (
                        <img src={coverLogo} alt="Cover" style={{ 
                            width: '30%', 
                            height: '30%', 
                            marginLeft: '5%',
                            marginBottom: '10%',
                            marginRight: '5%' }} />
                    )}
                </View>
            </Page>
            <Page>
                <View style={styles.cover}></View>
            </Page>
                
                {/* <Page style={styles.page}>
                    <View>
                    {toc && <Text>Índice:</Text>}
                    </View>
                </Page>
                <Text>HOLA</Text>
                <Page>
                {data && data.chapters && data.chapters.map((chapter, index) => (
                    <View key={index} style={styles.page}>
                        <Text style={styles.title}>{chapter.title}</Text>
                        <Text style={styles.subtitle}>{chapter.subtitle}</Text>
                        {chapter.paragraphs && chapter.paragraphs.map((paragraph, idx) => (
                            <Text key={idx} style={styles.paragraph}>{paragraph.content}</Text>
                        ))}
                    </View>
                ))}
                </Page> */}
        </Document>
    );
};

export default PreviewPdf;
