import React from "react"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import { Stack, Grid, Typography } from "@mui/material"
import Input from "@mui/material/TextField"
import Link from "../components/RouterLink"
import styles from "../styles/index-page.module.css"
import FormControlLabel from "@mui/material/FormControlLabel"
import Checkbox from "@mui/material/Checkbox"
import LoadingButton from "@mui/lab/LoadingButton"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

type propsType = {
    onSubmit?: () => void,
    loading: boolean,
    submitting:boolean
}


const Login = (props: propsType) => {
    const { submitting } = props;

    const onSubmitHandler = async (e: HTMLFormElement) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const value = {
            username: data.get("username"),
            password: data.get("password"),
        };

        //@ts-ignore
        props.onSubmit(value);
    };

    return (

        <form
            onSubmit={(e) => onSubmitHandler(e)}
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

                    {/* <Button
                        type="submit"
                        size="large"
                        disableElevation
                        variant="contained"
                        fullWidth
                    >
                        Sign In
    </Button>*/}
                    <LoadingButton startIcon={<SaveAltIcon />} loading={submitting} size="large" type='submit' variant="contained" disableElevation>
                        Sign In
                    </LoadingButton>

                </Stack>
            </Box>
        </form>

    )
}

export default Login