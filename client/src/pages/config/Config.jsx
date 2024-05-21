import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PreviewPdf from '../../components/PreviewPdf/PreviewPdf';
import './Config.css';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import { postPDF } from '../../services/pdfServices';
import CreateTemplate from '../../components/alerts/CreateTemplate';
import { Typography } from '@mui/material';
import { Troubleshoot } from '@mui/icons-material';

const Config = () => {
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [documentId, setDocumentId] = useState(null);
    const [config, setConfig] = useState({
        name: 'Plantilla tasación',
        size: 'A4',
        title: 'Tasación Duplex en Pinto',
        subtitle: 'Cohispania',
        coverLogo: 'https://i.imgur.com/9KJnqUw.png',
        toc: false,
        tocLevels: 1,
        padding: '20px',
        includeCover: true,
        includeBackCover: Troubleshoot,
        theme:'',
        coverImg: 'https://i.imgur.com/5YDVlyJ.jpeg',
        coverLogo: 'https://i.imgur.com/9KJnqUw.png',
        sectionBreak: false,
        headerLogo: 'https://i.imgur.com/9KJnqUw.png',
        watermark: 'WATERMARK PDF GENERATOR',
        orientation: 'Vertical',
      });

    const methods = useForm({
        defaultValues: config,
    });

    const { register, handleSubmit } = methods;
    const onSubmit = async (data) => {
        try {
            const response = await postPDF(data);
            const documentId = response.data._id;
            setDocumentId(documentId);
            setShowAlert(true);
            setTimeout(() => {
                navigate(`/document/${documentId}`, {
                    state: { config: data, documentId: documentId }
                });
            }, 3000); 
        } catch (error) {
            console.error('Error creating document');
        }
    };

    const [showPreview, setShowPreview] = useState(false);

    const handlePreview = () => {
        setShowPreview(!showPreview);
    };

    return (
        <>
          <FormProvider {...methods} >
            <form onSubmit={handleSubmit(onSubmit)} className='formConfig'>
              <div className='configBar'>
                <label className='configLabelName' htmlFor='name'>
                  <TextField {...register('name')} id='name' label="Nombre de la plantilla" variant='standard' value={config.name} onChange={(e) => setConfig({ ...config, name: e.target.value })} />
                </label>
              </div>
              <div className='containerConfig'>
              <div className='column-left'>
                <label className='configLabel' htmlFor='title'>
                  <TextField
                    {...register('title')}
                    id='title'
                    label='Título'
                    variant='standard'
                    value={config.title}
                    onChange={(e) =>
                      setConfig({ ...config, title: e.target.value })
                    }
                    />
                  </label>
                  <label className='configLabel' htmlFor='subtitle'>
                    <TextField {...register('subtitle')} id='subtitle' label="Subtítulo" variant='standard' value={config.subtitle} onChange={(e) => setConfig({ ...config, subtitle: e.target.value })} />
                  </label>
                  <label htmlFor="standard-multiline-static">
                    <Box component="form">
                    <div className='configLabel'>
                      <TextField id="standard-multiline-static" label="Descripción documento"
                        multiline rows={3} variant="standard"/>
                    </div>
                    </Box>
                  </label>
                  <label className='configLabel' htmlFor="includeCover-switch">
                  <FormControlLabel
                    control={
                      <Switch {...register('includeCover')} id="includeCover-switch" checked={config.includeCover}
                        onChange={(e) => setConfig({ ...config, includeCover: e.target.checked })}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    } label="Portada" />
                  </label>
                  {config.includeCover && (
                  <>
                    <label className='configLabel' htmlFor="coverImg">
                      <TextField {...register('coverImg')} id='coverImg' label="Imagen Portada" variant='standard' value={config.coverImg} onChange={(e) => setConfig({ ...config, coverImg: e.target.value })} />
                    </label>
                    <label className='configLabel' htmlFor="coverLogo">
                      <TextField {...register('coverLogo')} id='coverLogo' label="Imagen Logo" variant='standard' value={config.coverLogo} onChange={(e) => setConfig({ ...config, coverLogo: e.target.value })} />
                    </label>
                  </>)}
                  <label className='configLabel' htmlFor="headerLogo">
                      <TextField {...register('headerLogo')} id='headerLogo' label="Logo Cabecera" variant='standard' value={config.headerLogo} onChange={(e) => setConfig({ ...config, headerLogo: e.target.value })} />
                  </label>
                  <label className='configLabel' htmlFor="includeBackCover-switch">
                  <FormControlLabel
                    control={
                      <Switch {...register('includeBackCover')} id="includeBackCover-switch" checked={config.includeBackCover}
                        onChange={(e) => setConfig({ ...config, includeBackCover: e.target.checked })}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    } label="Contraportada" />
                  </label>
                  </div>
                
                <div className='column-right'>
                <label className='configLabel' htmlFor="toc-switch">
                    <FormControlLabel
                    control={
                      <Switch {...register('toc')} id="toc-switch" checked={config.toc}
                        onChange={(e) => setConfig({ ...config, toc: e.target.checked })}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    } label="Indice" />
                </label>
                {config.toc && (
                  <>
                    <label className='configLabel' htmlFor='toc-levels-select'>
                      <Select
                        {...register('tocLevels')}
                        labelId="toc-levels-select-label"
                        id="toc-levels-select"
                        value={config.tocLevels}
                        onChange={(e) => setConfig({ ...config, tocLevels: e.target.value })}
                        label="Nivel del Índice"
                      >
                        <MenuItem value={1}>Chapters</MenuItem>
                        <MenuItem value={2}>Sections</MenuItem>
                        <MenuItem value={3}>Subsections</MenuItem>
                      </Select>
                    </label>
                  </>)}
                <label htmlFor="demo-simple-select-filled-label" className='configLabel'>
                  <Typography>Padding:</Typography>
                    <Select
                    {...register('padding')}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={config.padding}
                    onChange={(e) => setConfig({ ...config, padding: e.target.value })}
                    label="Padding"
                    >
                      <MenuItem value={'5px'}>5px</MenuItem>
                      <MenuItem value={'10px'}>10px</MenuItem>
                      <MenuItem value={'20px'}>20px</MenuItem>
                    </Select>
                </label>
                <label className='configLabel' htmlFor="sectionBreak-switch">
                  <FormControlLabel
                    control={
                      <Switch {...register('sectionBreak')} id="sectionBreak-switch" checked={config.sectionBreak}
                        onChange={(e) => setConfig({ ...config, sectionBreak: e.target.checked })}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    } label="Salto de Sección" />
                </label>
                <label className='configLabel' htmlFor="watermark">
                  <TextField {...register('watermark')} id='watermark' label="Marca de agua" variant='standard' value={config.watermark} onChange={(e) => setConfig({ ...config, watermark: e.target.value })} />
                </label>
                <label className='configLabel' htmlFor="theme">
                  <TextField {...register('theme')} id='theme' label="Tema" variant='standard' value={config.theme} onChange={(e) => setConfig({ ...config, theme: e.target.value })} />
                </label>
                <label htmlFor="demo-simple-select-filled-label" className='configLabel'>
                  <Typography>Orientación:</Typography>
                  <Select
                    {...register('orientation')}
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={config.orientation}
                    onChange={(e) => setConfig({ ...config, orientation: e.target.value })}
                    label="Orientación"
                  >
                    <MenuItem value={'Horizontal'}>Horizontal</MenuItem>
                    <MenuItem value={'Vertical'}>Vertical</MenuItem>
                  </Select>
                </label>
                <label className='configLabelSize' htmlFor='demo-simple-select-standard'>
                  <Select
                    id="demo-simple-select-standard"
                    value={config.size}
                    onChange={(e) => setConfig({ ...config, size: e.target.value })}
                    label="Tamaño"
                  >
                    <MenuItem value={'A4'}>A4</MenuItem>
                    <MenuItem value={'A5'}>A5</MenuItem>
                    <MenuItem value={'A3'}>A3</MenuItem>
                  </Select>
                </label>
                </div>
              <div className='containerButtonsConfig'>
                <Button type="submit" variant="contained">Crear</Button>
                        {showAlert && <CreateTemplate onClose={() => setShowAlert(false)} />}

                <Button variant="outlined" onClick={() => navigate('/')}>Cancelar</Button>
              </div>
              </div>
              {showPreview && <PreviewPdf config={config} />}
            </form>
          </FormProvider>
        </>
    );
};

export default Config;