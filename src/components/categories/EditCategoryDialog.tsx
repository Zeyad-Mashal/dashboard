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
import { Category } from '../../types';
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
    category: Category
}
export default function UpdateCategoryDialog(props: PropsDialog) {
    const { open, loadData, onClose, category } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [inputErr, setInputErr] = React.useState<{ [k: string]: string }>({})
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')

    const [result, updateCategory] = usePut<Category>({
        url: config.ADMIN_API + "/categories/" + category?.id,
        headers: authHeader()
    });

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onClose()
    }
    const validateInput = (input: Omit<Category, 'id'>) => {
        const errors: { [f: string]: string } = {};

        if (validator.isEmpty(input.name)) {
            errors.name = "category name is required";
        }


        if (input.name.length < 3) {
            errors.name = "category name must be atleast 3 character";
        }

        if (validator.isEmpty(input.metaTitle)) {
            errors.metaTitle = "meta title is required";
        }
        if (validator.isEmpty(input.metaDescription)) {
            errors.metaDescription = "meta description is required";
        }

        if (validator.isEmpty(input.metaKeywords)) {
            errors.metaKeywords = "meta keywords is required";
        }

        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

    const createCategory = handleSubmit<Omit<Category, 'id'>>(input => {
        const { error, value } = validateInput(input);

        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        updateCategory(value as Category).then(res => {
            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);
                return;
            }
            setSeverity('success')
            setMsg("Category updated successfully");
            setMsgOpen(true);
            onClose();
            loadData();
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
                    Update Category
                </BootstrapDialogTitle>
                <form onSubmit={createCategory} style={{ width: "100%" }}>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label='Name'
                                    variant='filled'
                                    name='name'
                                    size='small'
                                    error={inputErr?.name?.length > 0}
                                    helperText={inputErr?.name}
                                    defaultValue={category?.name || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label='Meta Title'
                                    variant='filled'
                                    name='metaTitle'
                                    size='small'
                                    error={inputErr?.metaTitle?.length > 0}
                                    helperText={inputErr?.metaTitle}
                                    defaultValue={category?.metaTitle || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label='Meta Description'
                                    variant='filled'
                                    name='metaDescription'
                                    size='small'
                                    multiline
                                    rows={4}
                                    error={inputErr?.metaDescription?.length > 0}
                                    helperText={inputErr?.metaDescription}
                                    defaultValue={category?.metaDescription || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label='Meta Keywords'
                                    variant='filled'
                                    name='metaKeywords'
                                    size='small'
                                    error={inputErr?.metaKeywords?.length > 0}
                                    helperText={inputErr?.metaKeywords}
                                    defaultValue={category?.metaKeywords || ''}
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


