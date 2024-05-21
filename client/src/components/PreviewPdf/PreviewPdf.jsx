import React from 'react'
import {Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page:{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        backgroundColor: 'white', 
        width: '148mm', 
        height: '210mm',
        padding: '5mm',
        marginTop: '5%',
    },
    cover: {
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
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
        textAlign: 'left',
        marginLeft: '10%',
        width: '100%',
        marginBottom: '50%'
      },
      subtitleCover: {
        position: 'absolute',
        color: 'white',
        fontSize: 22,
        textAlign: 'left',
        marginBottom: '35%', 
        width: '100%',
        marginLeft: '10%',
      },
      title: {
        fontSize: 18,
        marginBottom: 10,
        marginTop: 50,
      },
      paragraph: {
        fontSize: 14,
        marginBottom: 10,
      },
      link: {
        fontSize: 14,
        color: 'blue',
        marginBottom: 10,
      },
      title: {
        fontSize: 24,
        textAlign: 'justify',
        marginTop: 15,
        marginLeft: 30,
        marginRight: 30,
      },
      paragraph: {
        fontSize: 10,
        textAlign: 'justify',
        marginLeft: 30,
        marginRight: 30,
      },
      link: {
        fontSize: 15,
        textAlign: 'justify',
        marginLeft: 30,
        marginRight: 30,
        color: 'blue',
        textDecoration: 'underline',
      }

     
    });

const PreviewPdf = ({ config, data, titleData }) => {
    console.log('Estoy aquí', titleData)   
    const { size = config?.size || 'A4', title = config?.title, subtitle = config?.subtitle, coverLogo = config?.coverLogo, headerLogo = config?.headerLogo, theme = config?.theme, toc = config?.toc, coverImg = config?.coverImg } = config;

    return (
        <Document>
            <Page size={size} style={styles.page}>
                <View style={styles.cover}>
                {coverImg && ( 
                    <img src={coverImg} alt="Cover" style={{ 
                        width: '100%', 
                        height: '92%', 
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

            <Page size={size} style={styles.page}>
            

            {headerLogo && ( 
                    <img src={headerLogo} alt="HeaderLogo" style={{ 
                        marginTop: 10,
                        marginLeft: 10,
                        width: '70px', }} />
                        )}

                {data && data.titles && data.titles.map((title, index) => (
                    <Text key={index} style={styles.title}>{title.content}</Text>
                ))}
                {data && data.paragraphs && data.paragraphs.map((paragraph, index) => (
                    <Text key={index} style={styles.paragraph}>{paragraph.text}</Text>
                ))}
                {data && data.links && data.links.map((link, index) => (
                    <Text key={index} style={styles.link}>{link.src}</Text>
                ))}
            
                   
            </Page>
            
        </Document>
    );
};

export default PreviewPdf;
