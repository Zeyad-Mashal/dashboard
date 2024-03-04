import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
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
import usePatch from '../../hooks/usePatch';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios, { AxiosRequestConfig } from 'axios';
import { useAppSelector } from '../../store/store';
import { useNavigate } from 'react-router-dom';

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



const validationSchema = Yup.object().shape({
    discountPercent: Yup.string().required("discountPercent is required"),

})

export default function AddDiscountDialog(props: PropsDialog) {
    const navigate = useNavigate();
    const { open, onClose, category, loadData } = props;
    const theme = useTheme();
    const { accessToken } = useAppSelector((state) => state.auth);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [isUploading, setIsUploading] = useState<boolean>(false)
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onClose()
    }

    /*const [result, addDiscount] = usePatch<Category>({
        url: config.ADMIN_API + "/categories/discount/add",
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

        if (validator.isEmpty(input.discountPercent)) {
            errors.discountPercent = "Discount Percent required";
        }

        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

   /* const createDiscount = handleSubmit<Omit<Category, 'id'>>(input => {
        const { error, value } = validateInput(input);

        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        addDiscount(value as Category).then(res => {
            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);
                return;
            }

            setSeverity('success')
            setMsg("Discount added successfuly");
            setMsgOpen(true);

        })


    })*/

    const { register, reset, control, handleSubmit, formState: { errors }, } = useForm<Category>({
        resolver: yupResolver(validationSchema),
    });

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const onSubmitHandler: SubmitHandler<Category> = async (data: Category) => {

        const finalData = {
            id: category?.id,
            discountPercent: data.discountPercent
        }

        try {
            setIsUploading(true)
            const res = await axios.patch(config.ADMIN_API + `/categories/discount/add`, finalData, axiosConfig);
            if (res.status === 204) {
                setIsUploading(false);
                navigate("/categories")
                onClose()
                loadData()
            }
        } catch (error: any) {
            setIsUploading(false)
            console.log(error.response);
        }

    }


    return (
        <div>
            <BootstrapDialog
                fullScreen={isMobile}
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={onClose}>
                    Add Discount
                </BootstrapDialogTitle>
                <form onSubmit={handleSubmit(onSubmitHandler)} style={{ width: "100%" }}>
                    <DialogContent dividers>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label='Discount Percent'
                                    variant='filled'
                                    name='discountPercent'
                                    size='small'
                                    {...register("discountPercent")}
                                    error={errors.discountPercent ? true : false}
                                    helperText={errors.discountPercent?.message}
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton color='error' onClick={onClose} variant="contained" disableElevation>
                            Cancel
                        </LoadingButton>
                        <LoadingButton startIcon={<SaveAltIcon />} loading={isUploading} size="large" type='submit' variant="contained" disableElevation>
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


