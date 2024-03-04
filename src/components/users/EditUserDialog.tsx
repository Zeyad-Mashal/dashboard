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
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
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
export default function UpdateUserDialog(props: PropsDialog) {
    const { open, loadData, onClose, user } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [inputErr, setInputErr] = React.useState<{ [k: string]: string }>({})
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')
    const [startDateTime, setStartDateTime] = React.useState<Date | null>(new Date());
    const [expDateTime, setExpDateTime] = React.useState<Date | null>(new Date());

    const [result, updateUser] = usePut<User>({
        url: config.ADMIN_API + "/users/" + user?.id,
        headers: authHeader()
    });

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onClose()
    }
    const validateInput = (input: Omit<User, 'id'>) => {
        const errors: { [f: string]: string } = {};

        if (validator.isEmpty(input.name)) {
            errors.name = " Name is required";
        }

        if (validator.isEmpty(input.username)) {
            errors.username = "Username is required";
        }

        if (input.username.length < 6) {
            errors.username = " Username should be atleast 6 character";
        }


        if (validator.isEmpty(input.email)) {
            errors.email = "Email is required";
        }
        if (!validator.isEmail(input.email)) {
            errors.email = "Please provide a valid email";
        }

        if (validator.isEmpty(input.phone)) {
            errors.phone = "Phone is required";
        }
        if (input.phone.length < 10) {
            errors.phone = "Phone number must be  10 digits";
        }

        if (validator.isEmpty(input.password)) {
            errors.password = "Password is required";
        }

        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

    const createUser = handleSubmit<Omit<User, 'id'>>(input => {
        const { error, value } = validateInput(input);

        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        updateUser(value as User).then(res => {
            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);
                return;
            }

            setSeverity('success')
            setMsg("User updated successfuly");
            setMsgOpen(true);
            loadData();
            onClose();

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
                    Update User
                </BootstrapDialogTitle>
                <form onSubmit={createUser} style={{ width: "100%" }}>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Name'
                                    variant='filled'
                                    name='name'
                                    size='small'
                                    error={inputErr?.name?.length > 0}
                                    helperText={inputErr?.name}
                                    defaultValue={user?.name || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Username'
                                    variant='filled'
                                    name='username'
                                    size='small'
                                    error={inputErr?.username?.length > 0}
                                    helperText={inputErr?.username}
                                    defaultValue={user?.username || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Email'
                                    variant='filled'
                                    name='email'
                                    size='small'
                                    error={inputErr?.email?.length > 0}
                                    helperText={inputErr?.email}
                                    defaultValue={user?.email || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Phone'
                                    variant='filled'
                                    name='phone'
                                    size='small'
                                    error={inputErr?.phone?.length > 0}
                                    helperText={inputErr?.phone}
                                    defaultValue={user?.phone || ''}
                                />
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    type="password"
                                    fullWidth
                                    label='Password'
                                    variant='filled'
                                    name='password'
                                    size='small'
                                    error={inputErr?.password?.length > 0}
                                    helperText={inputErr?.password}
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


