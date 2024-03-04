import React, { useRef, useState } from 'react'
import JoditEditor from 'jodit-react'
import Content from '../../components/Content';
import { Alert, AlertColor, Box, Button, Divider, Grid, Snackbar, Stack, TextField, Typography } from '@mui/material';
import validator from "validator";
import { handleSubmit } from '../../utils/form-handler';
import { Blog } from "../../types/index"
import LoadingButton from '@mui/lab/LoadingButton';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import axios, { AxiosRequestConfig } from 'axios';
import config from '../../utils/config';
import { useAppSelector } from '../../store/store';
import CircularProgress from '@mui/material/CircularProgress';
import authHeader from '../../utils/auth-header';
import usePost from '../../hooks/usePost';
import { capitalizeFirstLetter } from '../../utils/helpers';


const AddBlog = () => {

    const { accessToken } = useAppSelector((state) => state.auth);
    const [content, setContent] = useState("");
    const editor = useRef(null)
    const [isUploading, setIsUploading] = useState(false);
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [msg, setMsg] = React.useState('');
    const [severity, setSeverity] = React.useState<AlertColor>('error')
    const [inputErr, setInputErr] = React.useState<{ [k: string]: string }>({})
    const [file, setFile] = useState<string>("")
    const [isUpLoading, setIsUpLoading] = useState<boolean>(false);

    const [result, callAPI] = usePost<Blog>({
        url: config.ADMIN_API + "/blogs",
        headers: authHeader()
    });

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const uploadHandler = (event: any) => {

        setIsUpLoading(true)
        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file),

            axios.post(config.ADMIN_API + `/upload`, formData, axiosConfig)
                .then((res) => {
                    console.log(res.data)
                    setFile(res.data.url)
                    setIsUpLoading(false)
                })
                .catch((err) => {
                    console.error(err)
                    setIsUpLoading(false)
                })
    }


    const validateInput = (input: Omit<Blog, 'id'>) => {
        const errors: { [f: string]: string } = {};

        if (validator.isEmpty(input.title)) {
            errors.title = "title is required";
        }

        if (input.title.length < 3) {
            errors.title = "title must be atleast 3 character";
        }

        if (validator.isEmpty(input.description)) {
            errors.description = "meta desc is required";
        }

        if (validator.isEmpty(input.bannerImg.name)) {
            errors.bannerImg = "image required";
        }

        if (Object.entries(errors).length > 0) {
            return { error: errors, value: undefined };
        }

        return { error: undefined, value: input };
    }

    const createBlog = handleSubmit<Omit<Blog, 'id'>>(input => {
        const { error, value } = validateInput(input);


        if (error) {
            setInputErr(error);
            return;
        }

        setInputErr({});

        const data = {
            title: value.title,
            content: content,
            description: value.description,
            bannerImg: file
        }

        callAPI(data as Blog).then(res => {

            if (res.error) {
                setMsg(capitalizeFirstLetter(res.error.error));
                setMsgOpen(true);

                return;
            }

            setSeverity('success')
            setMsg("Blog created successfuly");
            setMsgOpen(true);
        })

    })


    return (
        <>
            <Content padding>
                <Box
                    sx={{ height: "100%" }}
                >
                    <form
                        onSubmit={createBlog}
                    >
                        <Typography sx={{ mt: 2 }} variant='h6' color='textSecondary'>Post Blog</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={5}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label="Title*"
                                    variant="filled"
                                    size="small"
                                    name="title"
                                    error={inputErr?.title?.length > 0}
                                    helperText={inputErr?.title}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <JoditEditor ref={editor} onChange={(content) => setContent(content)} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label="Meta Description*"
                                    variant="filled"
                                    size="small"
                                    name="description"
                                    multiline
                                    rows={4}
                                    error={inputErr?.description?.length > 0}
                                    helperText={inputErr?.description}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <label ><Typography sx={{}} variant='h6' color='textSecondary'>Choose cover image</Typography></label>
                                <TextField
                                    fullWidth
                                    type="file"
                                    onChange={uploadHandler}
                                    variant="filled"
                                    size="small"
                                    name="bannerImg"
                                    error={inputErr?.bannerImg?.length > 0}
                                    helperText={inputErr?.bannerImg}
                                />
                            </Grid>
                        </Grid>
                        <Grid item lg={12} sx={{ mt: 2 }}>
                            {isUpLoading
                                ? <CircularProgress /> :
                                <img src={file} style={{ width: '100%' }} />
                            }

                        </Grid>
                        <Divider sx={{ mb: 2, mt: 5 }} />
                        <Grid container sx={{ mt: 2, mb: 3 }}>
                            <Grid item xs={12} >
                                <Stack direction='row' spacing={2} sx={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                    <Button size='large' type='reset' startIcon={<RestartAltIcon />} variant='contained' color='error' disableElevation>Reset</Button>

                                    <LoadingButton startIcon={<SaveAltIcon />} loading={isUploading} size="large" type='submit' variant="contained" disableElevation>
                                        Save
                                    </LoadingButton>
                                </Stack>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
                <Snackbar
                    open={msgOpen}
                    autoHideDuration={6000}
                    onClose={() => { setMsgOpen(false) }}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                ><Alert severity={severity}>{msg}</Alert></Snackbar>

            </Content>

        </>



    )
}

export default AddBlog

