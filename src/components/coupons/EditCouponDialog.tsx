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
import { Coupon } from '../../types';
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
    coupon:Coupon
}
export default function UpdateCouponDialog(props: PropsDialog) {
    const { open, loadData, onClose, coupon } = props;
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const [inputErr, setInputErr] = React.useState<{ [k: string]: string }>({})
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')
    const [startDateTime, setStartDateTime] = React.useState<Date | null>(new Date());
    const [expDateTime, setExpDateTime] = React.useState<Date | null>(new Date());

    const [result, updateCoupon] = usePut<Coupon>({
        url: config.ADMIN_API + "/coupons/"+ coupon?.id,
        headers: authHeader()
    });

    const handleClose = (_evt: object, reason: string) => {
        if (reason == 'escapeKeyDown' || reason == 'backdropClick') {
            return
        }

        onClose()
    }
    const validateInput = (input: Omit<Coupon, 'id'>) => {
        const errors: { [f: string]: string } = {};

        if (validator.isEmpty(input.name)) {
            errors.name = "Coupon Name required";
        }

        if (validator.isEmpty(input.code)) {
            errors.code = "Coupon code required";
        }

        if (validator.isEmpty(input.maxUsage.toString()) || !validator.isNumeric(input.maxUsage.toString())) {
            errors.maxUsage = "Max usage is required and must be number";
        }

        if (validator.isEmpty(input.discountAmount.toString()) || !validator.isNumeric(input.discountAmount.toString())) {
            errors.discountAmount = "Discount Percent is required and must be number";
        }

        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

    const createCoupon = handleSubmit<Omit<Coupon, 'id'>>(input => {
        const { error, value } = validateInput(input);

        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        updateCoupon(value as Coupon).then(res => {
            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);
                return;
            }

            setSeverity('success')
            setMsg("Coupon updated successfuly");
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
                    Update Coupon
                </BootstrapDialogTitle>
                <form onSubmit={createCoupon} style={{ width: "100%" }}>
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
                                    defaultValue={coupon?.name || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Code'
                                    variant='filled'
                                    name='code'
                                    size='small'
                                    error={inputErr?.code?.length > 0}
                                    helperText={inputErr?.code}
                                    defaultValue={coupon?.code || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Discount Percent'
                                    variant='filled'
                                    name='discountAmount'
                                    size='small'
                                    error={inputErr?.discountAmount?.length > 0}
                                    helperText={inputErr?.discountAmount}
                                    defaultValue={coupon?.discountAmount || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label='Max Usage'
                                    variant='filled'
                                    name='maxUsage'
                                    size='small'
                                    error={inputErr?.maxUsage?.length > 0}
                                    helperText={inputErr?.maxUsage}
                                    defaultValue={coupon?.maxUsage || ''}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label='Start Date Time'
                                        value={startDateTime}
                                        onChange={(newValue) => {
                                            setStartDateTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField
                                            fullWidth
                                            name='startDateTime'
                                            size='small'
                                            variant='filled'
                                            error={inputErr?.startDateTime?.length > 0}
                                            helperText={inputErr?.startDateTime}
                                            defaultValue={coupon?.startDateTime || ''}
                                            {...params}
                                        />}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DateTimePicker
                                        label='Expiry Date Time'
                                        value={expDateTime}
                                        onChange={(newValue) => {
                                            setExpDateTime(newValue);
                                        }}
                                        renderInput={(params) => <TextField
                                            fullWidth
                                            variant='filled'
                                            name='expDateTime'
                                            size='small'
                                            error={inputErr?.expDateTime?.length > 0}
                                            helperText={inputErr?.expDateTime}
                                            defaultValue={coupon?.expDateTime || ''}
                                            {...params}
                                        />}
                                    />
                                </LocalizationProvider>
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


