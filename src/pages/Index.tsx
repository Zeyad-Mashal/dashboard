import React, { useState, useEffect } from "react"
import Container from "@mui/material/Container"
import { Alert, Stack, Grid, Typography, Snackbar, Box } from "@mui/material"
import Link from "../components/RouterLink"
import Input from "@mui/material/TextField"
import styles from "../styles/index-page.module.css"
import illustration from "../images/illustration.png"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { login } from "../store/slices/auth";
import SaveAltIcon from "@mui/icons-material/SaveAlt"
import { useAppDispatch, useAppSelector } from "../store/store"
import LoadingButton from "@mui/lab/LoadingButton"

export default function Index() {

    const navigate = useNavigate();

    return (
        <Grid container sx={{ height: "100vh" }}>
            <Grid item xs={12} md={7} lg={8} className={styles.left}>
                <div className={styles.logo}>
                    <img src={illustration} alt="Ecommerce" height="500px" />
                </div>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <div className={styles.wrapper}>
                    <Container maxWidth="sm">
                        <Stack spacing={6}>
                            <div>
                                <Typography variant="h5" sx={{ display: "inline" }}>
                                    Welcome to{" "}
                                </Typography>
                                <Typography color="primary" variant="h5" sx={{ display: "inline" }}>
                                    Ecommerce
                                </Typography>
                            </div>



                            <form
                                method="post"
                                style={{ width: "100%" }}
                            >

                                <Box>
                                    <Stack spacing={3} sx={{ mt: 2 }}>
                                        <Input
                                            size="small"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            label="Username *"
                                            name="username"
                                        />
                                        <Input
                                            size="small"
                                            variant="outlined"
                                            type="password"
                                            fullWidth
                                            label="Password *"
                                            name="password"
                                        />
                                        <div className={styles.remember}>
                                            <FormControlLabel
                                                control={<Checkbox defaultChecked />}
                                                label="Remember me?"
                                            />
                                            <Link to="#">
                                                <Typography color="primary">
                                                    Forgot password?
                                                </Typography>
                                            </Link>
                                        </div>


                                        <LoadingButton onClick={() => navigate("/dashboard")} startIcon={<SaveAltIcon />} size="large" type='submit' variant="contained" disableElevation>
                                            Sign In
                                        </LoadingButton>

                                    </Stack>
                                </Box>
                            </form>
                        </Stack>
                    </Container>
                </div>
            </Grid>
        </Grid>
    )
}
