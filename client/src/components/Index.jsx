import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
 page: {
    flexDirection: 'column',
    backgroundColor: '#E4E4E4',
 },
 section: {
    margin: 10,
    padding: 10,
 },
});

const Index = ({ indexItems }) => {

 return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Índice</Text>
          {indexItems.map((item, index) => (
            <Text key={index}>
              {item.level === 1 && `Capítulo ${index + 1}: ${item.title}`}
              {item.level === 2 && `Sección ${index + 1}: ${item.title}`}
              {item.level === 3 && `Subsección ${index + 1}: ${item.title}`}
            </Text>
          ))}
        </View>
      </Page>
    </Document>
 );
};
export default Index;