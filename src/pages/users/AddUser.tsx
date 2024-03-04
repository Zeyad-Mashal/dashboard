import React, { useState } from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Content from '../../components/Content';
import CloseIcon from '@mui/icons-material/Close';
//import MuiTextField from '../components/mui/TextField';
import { Divider, InputBasePropsSizeOverrides } from '@mui/material';
import config from "../../utils/config";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from '../../store/store';
import { IUser } from "../../types"


const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    username: Yup.string().required("username is required"),
    email: Yup.string().required("Email is required").email("Email is invalid"),
    phone: Yup.string()
        .required("Mobile number is required")
        .min(10, "Mobile number must be 10 digits")
        .matches(
            /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
            "Mobile number is invalid"
        ),
    password: Yup.string()
        .required("password is required")
        .min(8, "Password must be at least 8 characters")
        .matches(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
            "Password must have atleast one uppercase,lowercase,number and special character"
        ),
});

const AddUser = () => {

    const { accessToken } = useAppSelector((state) => state.auth);
    const [open, setOpen] = useState(true);
    const [status, setStatus] = useState(undefined);

    const { register, reset, control, handleSubmit, formState: { errors }, } = useForm<IUser>({
        resolver: yupResolver(validationSchema),
    });

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const onSubmitHandler: SubmitHandler<IUser> = async (data: IUser) => {

        try {

            const res = await axios.post(config.ADMIN_API + "/users", data, axiosConfig);
            if (res.status === 201) {
                //@ts-ignore
                setStatus({ type: "success", msg: "user created successfully" });
                setOpen(true);
            }
            reset();

        } catch (error: any) {
            console.log(error.response.data.details[0].message);
            if (error.response.status >= 400 && error.response.status <= 499) {

                //@ts-ignore
                setStatus({ type: "error", msg: error.response.data?.details[0]?.message });
                setOpen(true);
            }
        }
    };


    return (
        <>
            <Collapse in={open}>
                {status?.type === "success" && (
                    <Alert
                        style={{ margin: "25px 25px 0 25px" }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                        sx={{ mb: 2 }}
                    >
                        {status.msg}
                    </Alert>
                )}
            </Collapse>
            <Collapse in={open}>
                {status?.type === "error" && (
                    <Alert
                        style={{ margin: "25px 25px 0 25px" }}
                        severity="error" sx={{ mb: 2 }}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        <strong>{status.msg}</strong>
                    </Alert>
                )}
            </Collapse>

            <Content padding>
                <Box
                    sx={{ height: "100%" }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <Typography sx={{ mt: 2 }} variant='h6' color='textSecondary'>User Details</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Name*"
                                    variant="filled"
                                    size="small"
                                    name="name"
                                    {...register("name")}
                                    error={errors.name ? true : false}
                                    helperText={errors.name?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Username*"
                                    variant="filled"
                                    size="small"
                                    name='username'
                                    {...register("username")}
                                    error={errors.username ? true : false}
                                    helperText={errors.username?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Phone*"
                                    variant="filled"
                                    size="small"
                                    name='phone'
                                    type="number"
                                    {...register("phone")}
                                    error={errors.phone ? true : false}
                                    helperText={errors.phone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Email*"
                                    variant="filled"
                                    size="small"
                                    name='email'
                                    {...register("email")}
                                    error={errors.email ? true : false}
                                    helperText={errors.email?.message}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Password*"
                                    variant="filled"
                                    size="small"
                                    name='password'
                                    type="password"
                                    {...register("password")}
                                    error={errors.password ? true : false}
                                    helperText={errors.password?.message}
                                />
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 2 }}>
                            <Grid item xs={12} >
                                <Stack direction='row' spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button size='large' type='reset' startIcon={<RestartAltIcon />} variant='contained' color='error' disableElevation>Reset</Button>
                                    <Button size='large' type='submit' startIcon={<SaveAltIcon />} variant='contained' disableElevation>Create</Button>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Content>
        </>
    )
}

export default AddUser