import React from 'react'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4
}

type PropsSuccess = {
    open: boolean,
    message: string,
    handleClose: () => void
}

const SuccessModal = ({ open, handleClose, message }: PropsSuccess) => {
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style} >
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {message}
                    </Typography>
                    <Button onClick={handleClose}>Close</Button>
                </Box>
            </Modal></div>
    )
}

export default SuccessModal