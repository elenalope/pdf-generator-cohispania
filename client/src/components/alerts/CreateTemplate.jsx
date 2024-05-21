import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { CheckCircleOutline } from '@mui/icons-material';
import { DialogTitle } from '@mui/material';

const CreateTemplate = ({ onClose }) => {
    const [open, setOpen] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setOpen(false);
            onClose && onClose();
        }, 1500);

        return () => clearTimeout(timer);
    }, [onClose]);

    const handleClose = () => {
        setOpen(false);
        onClose && onClose();
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="xs" fullWidth >
            <DialogContent sx={{ padding: '0', backgroundColor: 'transparent' }}>
                <div style={{ backgroundColor: '#12C069', textAlign: 'center', padding: '50px 0' }}>
                    <CheckCircleOutline sx={{ fontSize: '70px', color: 'white' }} />
                </div>
            </DialogContent>
            <DialogContent sx={{ backgroundColor: 'white', textAlign: 'center', padding: '10px' }}>
                <DialogTitle id="alert-dialog-title" style={{ fontWeight: 'bold' }}>¡Estás comenzando a crear tu PDF! Los datos fueron guardados</DialogTitle>
            </DialogContent>
        </Dialog>
    );
};

export default CreateTemplate;