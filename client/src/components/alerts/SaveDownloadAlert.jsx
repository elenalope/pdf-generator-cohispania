import React, { useState } from 'react';
import './Alerts.css';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import { CheckCircleOutline } from '@mui/icons-material';

const SaveDownloadAlert = ({ onClose }) => {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
        onClose && onClose(); 
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
            <DialogContent sx={{ padding: '0', backgroundColor: 'transparent' }}>
                <div style={{ backgroundColor: '#12C069', textAlign: 'center', padding: '50px 0'}}>
                    <CheckCircleOutline sx={{ fontSize: '70px', color: 'white' }} />
                </div>
            </DialogContent>
            <DialogContent sx={{ backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
                <h2 style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>¡Bien hecho!</h2>
                <h3 style={{ fontFamily: 'Open Sans', fontWeight: '300' }}>Tu PDF se ha descargado con éxito</h3>
            </DialogContent>
            <DialogContent sx={{ textAlign: 'center', padding: '10px' }}>
                <Button variant="contained" onClick={handleClose} size="large">
                    OK
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default SaveDownloadAlert;