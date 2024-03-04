import React from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { useTheme, useMediaQuery, Grid, Alert, AlertColor } from '@mui/material';
import { TextField } from "@mui/material";
import { handleSubmit } from '../../utils/form-handler';
import { User } from '../../types';
import usePut from '../../hooks/usePut';
import config from '../../utils/config';
import authHeader from '../../utils/auth-header';
import Snackbar from '@mui/material/Snackbar';
import { capitalizeFirstLetter } from '../../utils/helpers';

import validator from "validator";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props: any) => {
    const { children, onClose, ...other } = props;

    return (
        <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    color='error'
                >
                    <CloseIcon color='error' />
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

type PropsDialog = {
    open: boolean,
    onClose: () => void,
    user: User
}
export default function ChangePasswordDialog(props: PropsDialog) {
    const { open, onClose, user } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [inputErr, setInputErr] = React.useState<{ [k: string]: string }>({})
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')

    const [result, updatePassword] = usePut<User>({
        url: config.ADMIN_API + "/users/account/password/",
        headers: authHeader()
    });

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onClose()
    }
    const validateInput = (input: User) => {
        const errors: { [f: string]: string } = {};



        if (validator.isEmpty(input.old_password)) {
            errors.old_password = "Old password is required";
        }

        if (validator.isEmpty(input.new_password)) {
            errors.new_password = "New password is required";
        }


        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

    const changePassword = handleSubmit<User>(input => {
        const { error, value } = validateInput(input);
        console.log(error)

        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        updatePassword(value as User).then(res => {
            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);
                return;
            }

            setSeverity('success')
            setMsg("User password changed successfuly");
            setMsgOpen(true);
        })
    })


    return (
        <div>
            <BootstrapDialog
                fullScreen={isMobile}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                    Change Password
                </BootstrapDialogTitle>
                <form onSubmit={changePassword} style={{ width: "100%" }}>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <TextField
                                type="hidden"
                                fullWidth
                                label=''
                                variant='filled'
                                name='id'
                                size='small'
                                defaultValue={user?.id || ''}
                            />
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    type="password"
                                    fullWidth
                                    label='Old Password'
                                    variant='filled'
                                    name='old_password'
                                    size='small'
                                    error={inputErr?.old_password?.length > 0}
                                    helperText={inputErr?.old_password}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    type="password"
                                    fullWidth
                                    label='New Password'
                                    variant='filled'
                                    name='new_password'
                                    size='small'
                                    error={inputErr?.new_password?.length > 0}
                                    helperText={inputErr?.new_password}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton color='error' onClick={onClose} variant="contained" disableElevation>
                            Cancel
                        </LoadingButton>
                        <LoadingButton loading={result.isLoading} type='submit' variant="contained" disableElevation>
                            Save
                        </LoadingButton>
                    </DialogActions>
                </form>
            </BootstrapDialog>
            <Snackbar
                open={msgOpen}
                autoHideDuration={6000}
                onClose={() => { setMsgOpen(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            ><Alert severity={severity}>{msg}</Alert></Snackbar>
        </div>
    );
}


