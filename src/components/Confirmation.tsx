import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type PropsConfDialog = {
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void,
    cancelButtonText?: string,
    confirmButtonText?: string,
    title: string,
    description: string
}

export default function Confirmation(props: PropsConfDialog) {
    const {
        open,
        onConfirm,
        onCancel,
        cancelButtonText,
        confirmButtonText,
        title,
        description } = props;

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onCancel()
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {title}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        {description}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color='error' onClick={onCancel}>{cancelButtonText || "Cancel"}</Button>
                    <Button onClick={onConfirm} autoFocus>
                        {confirmButtonText || "Ok"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

