import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CheckCircleOutline } from '@mui/icons-material';

const CreateTemplate = ({ onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            onClose && onClose();
        }, 2500);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth >
            <DialogContent sx={{ padding: '0', backgroundColor: 'transparent' }}>
                <div style={{ backgroundColor: '#12C069', textAlign: 'center', padding: '50px 0' }}>
                    <CheckCircleOutline sx={{ fontSize: '70px', color: 'white' }} />
                </div>
            </DialogContent>
            <DialogContent sx={{ backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
                <h2 style={{ fontFamily: 'Open Sans', fontWeight: 'bold' }}>¡Enhorabuena, estás comenzando a crear tu PDF!</h2>
                <h3 style={{ fontFamily: 'Open Sans', fontWeight: '300' }}>Se ha guardado con éxito</h3>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTemplate;