import React, {useState} from 'react'
import {useForm, FormProvider} from 'react-hook-form'
import { useNavigate } from 'react-router-dom';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf';
import './Config.css'
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import GetAppIcon from '@mui/icons-material/GetApp';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FormControlLabel from '@mui/material/FormControlLabel';


const Config = () => {
    const navigate = useNavigate();
    const [config, setConfig] = useState({
        size: 'A4',
        title: {
            content: 'titulo', 
            bold: false,
            font: 'sans',
            underline: false,
            color: 'black',
            size: '1em',
            margin: {
                top: 0,
                bottom: 0,
                left: 0,
                right: 0
            } },
        subtitle: 'subtitulo',
        coverLogo: 'www.google.es',
        toc: false,
        tocLevels: 1,
        padding: '20px',
        includeCover: false,
        includeBackCover: false,
        /* indexItems: [], */
      });

      const methods = useForm({
        defaultValues: config,
      })

      const {register, handleSubmit, reset} = methods;
      const onSubmit = async (data) => {
        console.log('data de config.jsx',data);
        try {
            const response = await postPDF(data);
           /*  console.log(response); */
        } catch (error) {
            console.error('Error creating document')
        }
      };
const[showPreview, setShowPreview] = useState(false);
 
    

const handleConfig = () => {
    navigate('/document', {
      state: { config: {
        size: config.size,
        title: {
          content: config.title.content,
          color: config.title.color,
          bold: config.title.bold,
          font: config.title.font,
          underline: config.title.underline,
          size: config.title.size,
          margin: config.title.margin
        },
        subtitle: config.subtitle,
        coverLogo: config.coverLogo,
        toc: config.toc,
        tocLevels: config.tocLevels,
        padding: config.padding
      }
        
      }
    });
  };
  
    const handlePreview = () =>{
        setShowPreview(!showPreview);
    }
    /* const addIndexItem = () => {
        const newItem = {
           level: tocLevels, 
           title: 'Nuevo título', 
        };
        setIndexItems([...indexItems, newItem]);
       }; */
       
       
  
       
  return (
    <>
    <FormProvider {...methods}>
    <form onSubmit={handleSubmit(onSubmit)}>
    <div className='configBar'>
        <h2 className='configTitle'>Configura tu plantilla</h2>
        <ul className='listButtonsConfig'>
            <li><SaveIcon/></li>
            <li><GetAppIcon/></li>
            <li onClick={handlePreview}><VisibilityIcon/></li>
        </ul>
    </div>
    <div className='containerConfig'>
        <label id="demo-simple-select-standard-label" className='configLabelSize'>
            <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            value={config.size}
            onChange={(e)=> setConfig({...config, size: e.target.value })}
            label="Tamaño"
            >
            <MenuItem value={'A4'}>A4</MenuItem>
            <MenuItem value={'A5'}>A5</MenuItem>
            <MenuItem value={'A3'}>A3</MenuItem>
            </Select>
        </label> 
        <label className='configLabel'>     
        <TextField
                {...register('title.content')}
                id='title'
                label='Título'
                variant='standard'
                value={config.title.content}
                onChange={(e) =>
                  setConfig({
                    ...config,
                    title: { ...config.title, content: e.target.value },
                  })
                }
              />
 </label>
        <label className='configLabel'>
            <TextField {...register('subtitle')} id='subtitle' label="Subtítulo" variant='standard' value={config.subtitle} onChange={(e)=> setConfig({...config, subtitle: e.target.value })}/>
        </label>
        <label className='configLabel' htmlFor='toc-switch'>
        <FormControlLabel
            control={
        <Switch {...register('toc')} id="toc-switch" checked={config.toc}
            onChange={(e) => setConfig({...config, toc: e.target.value })}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Índice"/>
        </label>
        <label className='configLabel'>
            <Select
            {...register('tocLevels')}
                labelId="toc-levels-select-label"
                id="toc-levels-select"
                value={config.tocLevels}
                onChange={(e) => setConfig({...config, tocLevels: e.target.value })}
                label="Nivel del Índice"
            >
                <MenuItem value={1}>Chapters</MenuItem>
                <MenuItem value={2}>Sections</MenuItem>
                <MenuItem value={3}>Subsections</MenuItem>
            </Select>
        </label>
        <label htmlFor="" className='configLabel'>
            <TextField {...register('coverLogo')} id='coverLogo' label="cover Logo" variant='standard' value={config.coverLogo} onChange={(e)=> setConfig({...config, coverLogo: e.target.value })}/>
        </label>
        <label htmlFor="demo-simple-select-filled-label" className='configLabel'>
            Padding:
        <Select
        {...register('padding')}
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={config.padding}
          onChange={(e)=> setConfig({...config, padding: e.target.value })}
          label="Padding"
        >
          <MenuItem value={'5px'}>5px</MenuItem>
          <MenuItem value={'10px'}>10px</MenuItem>
          <MenuItem value={'20px'}>20px</MenuItem>
        </Select>
        </label>
        <label className='configLabel' htmlFor="includeCover-switch" >
        <FormControlLabel
            control={
        <Switch {...register('includeCover')} id="includeCover-switch" checked={config.includeCover}
            onChange={(e) => setConfig({...config, includeCover: e.target.value })}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Portada"/>
        </label>
        <label className='configLabel' htmlFor="includeBackCover-switch">
        <FormControlLabel
            control={
        <Switch {...register('includeBackCover')} id="includeBackCover-switch" checked={config.includeBackCover}
            onChange={(e) => setConfig({...config, includeBackCover: e.target.value })}
            inputProps={{ 'aria-label': 'controlled' }}
        />
            } label="Contraportada"/>
        </label>
        
        <div className='containerButtonsConfig'>
            <Button variant="contained" onClick={handleConfig}>Crear </Button>
            <Button variant="outlined" onClick={()=>navigate('/')}>Cancelar</Button>
        </div>    
        {showPreview && <PreviewPdf
    size={config.size}
    title={config.title.text}
    subtitle={config.subtitle}
    coverLogo={config.coverLogo}
    toc={config.toc}
  />}

    </div>
    </form>
    </FormProvider>
    </>
    
  )
}

export default Config;