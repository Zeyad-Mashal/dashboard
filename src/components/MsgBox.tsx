import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { CheckCircle, Cancel } from "@mui/icons-material"

type PropsMsgBox = {
    open: boolean,
    success_msg?: string,
    error_msg?: string
    handleClose: () => void
}

const MsgBox = ({ open, handleClose, success_msg, error_msg }: PropsMsgBox) => {


    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {
                        success_msg ? <CheckCircle color="success" sx={{ fontSize: "50px" }} /> :

                            <Cancel color="error" sx={{ fontSize: "50px" }} />
                    }
                </div>
            </DialogTitle>
            <DialogContent sx={{ minWidth: '350px' }}>
                <DialogContentText id="alert-dialog-description" justifyContent="center">
                    <Typography variant="h6" sx={{ textAlign: "center" }}>{success_msg ? success_msg : error_msg} </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default MsgBox;
