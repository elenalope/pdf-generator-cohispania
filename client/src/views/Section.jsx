import React, { useState, useEffect } from 'react';
import { addSubSection } from '../services/subsectionService';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import AddIcon from '@mui/icons-material/Add';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import SubsectionDialog from '../components/subsection/SubsectionDialog'
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';


const Section = () => {
  const navigate = useNavigate();
    const { id: templateId, id: chapterId, id: sectionId } = useParams();
    const [openAddSubsection, setOpenAddSubsection] = useState(false);
    const [data, setData] = useState({ subsections: [] }); 

  const handleSubsectionClick = () =>{
    setOpenAddSubsection(true);
}
useEffect(() => {
  console.log('actualizado data', data);
}, [data]);

const handleSubsectionCreate = async (subsectionData) => {
  try {
    const response = await addSubSection(templateId, chapterId, sectionId, { subsection: subsectionData });
    console.log('response updated', response);

    if (response.data && response.data.content) {
      setData({ subsections: response.data.content });
      console.log('content subsections data', response.data.content);
    } else {
      console.error('No content found in response:', response.data);
    }
  } catch (error) {
    console.error('Error creating subsection:', error);
  }
};

const handleEnterSection = (sectionId) => {
  navigate(`section/${sectionId}`);
};
 
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });


  return (
    <>
    <Stack direction="row" spacing={2} sx={{ marginLeft: '2%', marginRight: '2%', marginTop: '20px' }}>
        <Button variant="contained" type="submit">
          <SaveIcon />
        </Button>
        <Button type='button' variant="contained" >
          <GetAppIcon />
        </Button>
        <Button variant="contained" >
          <VisibilityIcon />
        </Button>
      </Stack>
      <CssBaseline />
      <div className='document-body'> 
        <div className='option-list'>
          <Box>
            <nav aria-label="main mailbox folders">
              <List>
                <ListItem disablePadding >
                  <ListItemButton>
                    <ListItemIcon>
                      <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Subsección" />
                    <AddIcon onClick={handleSubsectionClick}/>
                  </ListItemButton>
                </ListItem>
                <Divider />
              </List>
            </nav>
          </Box>
        </div>
        <CssBaseline />
        <Container fixed>
          <Box sx={{ bgcolor: '#C9C9CE', height: '70vh' }}>
          {data.subsections.map((subsection, index) => (
                subsection && subsection.title && (
                  <CardContent key={index} sx={{ pl: 4, pr: 4, mb: 3, pt: 2, pb: 2, backgroundColor: '#E9EAEC' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    </Box>
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {subsection.title}
                    </Typography>
                    <Divider />
                    <Typography sx={{ mb: 2, mt: 1 }}>
                      {subsection.paragraph}
                      </Typography>
                    <Divider />
                    <div className='buttons-section-mydocument'>
            </div>                   
                </CardContent>
                )
                ))}
          
          </Box>
        </Container> 
      </div>
      
      <Stack spacing={2} direction="row" sx={{ marginLeft: '20px' }}>
        <Button variant="contained" onClick={() => navigate('/')}>SALIR SIN GUARDAR</Button>
      </Stack>

      {openAddSubsection &&<SubsectionDialog openAddSubsection={openAddSubsection} setOpenAddSubsection={setOpenAddSubsection} onSubsectionCreate={handleSubsectionCreate} />}
    </>
    
  )
}

export default Section