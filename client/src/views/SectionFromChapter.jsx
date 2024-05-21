import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { addSubSection } from '../services/subsectionService.js';
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AddIcon from '@mui/icons-material/Add';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import SendIcon from '@mui/icons-material/Send';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';



const SectionFromChapter = () => {
    const navigate = useNavigate();
    const { templateId, chapterId, sectionId } = useParams();
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

            setData({ subsections: response.data.content });
            console.log('content subsections data', response.data.content);
        } catch (error) {
            console.error('Error creating chapter:', error);
        }
    };

    const handleEnterSection = (subsectionId) => {
        navigate(`/document/${templateId}/chapter/${chapterId}/sectionChapter/${sectionId}`);
    };
    


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
                <ListItem disablePadding /* onClick={handleSubsectionClick} */>
                  <ListItemButton>
                    <ListItemIcon>
                      <ImportContactsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Section" />
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
                      {/* <LongMenu /> */}
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
                                        <Button variant="contained" endIcon={<SendIcon />} size="small"
                                            sx={{ width: 100, ml: 'auto' }}
                                            onClick={() => handleEnterSection(subsection._id)}>
                                            Entrar
                                        </Button>
                                    </div>
                    {/* <FormControlLabel disabled control={<Switch />} label={data.cover} /> */}
                                       
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

export default SectionFromChapter;