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
import IconButton from '@mui/material/IconButton';
import Content from '../../components/Content';
import TagSelector from '../../components/mui/TagSelector';
import CloseIcon from '@mui/icons-material/Close';
import MuiTextField from '../../components/mui/TextField';
import { Alert, Divider, Tooltip, InputBasePropsSizeOverrides, List, ListItem, ListItemButton, Paper, Select, Snackbar, AlertColor, ListItemText } from '@mui/material';
import config from "../../utils/config";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Add, DeleteForever, FileUpload } from "@mui/icons-material"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FileUpload from "../../components/FileUpload";
import FileList from "../../components/FileList";
import axios, { AxiosRequestConfig } from 'axios';
import useFetch from '../../hooks/useFetch';
import authHeader from '../../utils/auth-header';
import styles from "../../styles/fileupload.module.css"
import { DatePicker } from "@mui/x-date-pickers"
import { useAppSelector } from '../../store/store';
import MsgBox from '../../components/MsgBox';
import { useNavigate } from "react-router-dom";
import { Package } from '../../types';
import { truncate } from "../../helpers"
import Zoom from '@mui/material/Zoom';
import InfoIcon from '@mui/icons-material/Info';
import LoadingButton from '@mui/lab/LoadingButton';




const validationSchema = Yup.object().shape({
    name: Yup.string().required("product name is required"),
    type: Yup.string().required("select product type"),
    description: Yup.string().required("description is required"),
    price: Yup.string().required("price is required"),
    seasonalPrice: Yup.string().typeError('Must be numeric.').nullable()
        .optional(),
    discountAmount: Yup.string().required("discount amount is required"),
    discountPercent: Yup.string().required("discount percentage is required"),
    stock: Yup.string().required("stock is required"),
    size: Yup.string().required("size is required"),

});

const AddPackage = () => {

    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const { register, unregister, reset, control, handleSubmit, formState: { errors }, } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const { data, isLoading } = useFetch<Package[]>(config.ADMIN_API + "/items", authHeader());

    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(null);
    const [type, setType] = React.useState('');
    const [files, setFiles] = useState([])
    const [value, setValue] = React.useState('female');
    const [isTrending, setIsTrending] = React.useState(false);
    const [isAvailable, setIsAvailable] = React.useState(true);
    const [isOrderable, setIsOrderable] = React.useState(true);
    const [isToprated, setIsToprated] = React.useState(false);
    const [isDisplay, setIsDisplay] = React.useState(true);
    const [showDropArea, setShowDropArea] = useState<boolean>(true)
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [startDate, setStartDate] = useState<Date | null>(null)
    const [endDate, setEndDate] = useState<Date | null>(null)
    const [percent, setPercent] = useState(0);
    const [msgOpen, setMsgOpen] = React.useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [severity, setSeverity] = React.useState<AlertColor>('error')

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value);
    };

    const onSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
    };

    //remove file
    const removeFile = (filename: any) => {
        setFiles(files.filter(file => file.name !== filename))
    }

    const handleChanges = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
    };

    const handleIsTrending = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsTrending((event.target as HTMLInputElement).value);
    };
    const handleIsAvailable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAvailable((event.target as HTMLInputElement).value);
    };
    const handleIsOrderable = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsOrderable((event.target as HTMLInputElement).value);
    };
    const handleIsToprated = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsToprated((event.target as HTMLInputElement).value);
    };
    const handleIsDisplay = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsDisplay((event.target as HTMLInputElement).value);
    };


    const dragStarted = (e: any, product: any) => {
        console.log("Drag has started")
        e.dataTransfer.setData("product", JSON.stringify(product))
    }

    const draggingOver = (e: any) => {
        e.preventDefault();
        console.log("dragging over now")
    }

    const [error, setError] = useState("");
    const dragDropped = (e: any) => {
        console.log("You have dropped")
        let item = JSON.parse(e.dataTransfer.getData("product"));

        if (!selectedProducts.some(el => el.id === item.id)) {
            //@ts-ignore
            setSelectedProducts([...selectedProducts, item])
            setShowDropArea(false)
        } else {
            setError("Product already added")
            setMsgOpen(true);
        }
        if (selectedProducts.length === 0) {
            setShowDropArea(true)
        }
    }

    const finalItems = selectedProducts.map((item) => {
        return item.id;
    })


    function removeEmptyFields(data: any) {

        Object.keys(data).forEach(key => {
            if (data[key] === '' || data[key] == null) {
                delete data[key]
            }
        })
        return data;
    }


    const onSubmitHandler = async (data: any) => {
        setIsUploading(true);

        const filteredObject = removeEmptyFields(data);
        Object.assign(filteredObject,
            {
                countDownTimes: {
                    start: startDate,
                    end: endDate
                },
                isTrending: isTrending,
                isAvailable: isAvailable,
                isOrderable: isOrderable,
                //isToprated: isToprated,
                isDisplay: isDisplay,
                pictures: files,
                items: finalItems
            })


        try {

            const res = await axios.post(config.ADMIN_API + "/packages", filteredObject, axiosConfig);
            if (res.status === 201) {
                setIsUploading(false);
                setSeverity('success')
                //@ts-ignore
                setStatus({ type: "success", success_msg: "package created successfully" });
                setOpen(true);
            }
            reset();
            setFiles([])
            setSelectedProducts([])
        } catch (error: any) {

            if (error.response.status >= 400 && error.response.status <= 499) {
                //@ts-ignore
                setStatus({ type: "error", error_msg: error.response.data?.details[0]?.message });
                setOpen(true);
            }
        }
    };

    function handleClose() {
        setOpen(false);
    }

    function deleteItem(id: string) {
        const newData = selectedProducts?.filter(p => p.id !== id)
        setSelectedProducts(newData)

    }


    return (
        <>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => { setOpen(false) }}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            ><Alert severity={severity}>{severity === 'success' ? status?.success_msg : status?.error_msg}</Alert></Snackbar>
            <Content padding>
                <Box
                    sx={{ height: "100%" }}
                >
                    <form
                        onSubmit={handleSubmit(onSubmitHandler)}
                    >
                        <Typography sx={{ mt: 2 }} variant='h6' color='textSecondary'>Add Package</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <Box sx={{ position: 'relative' }}>
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
                                    <Tooltip title="name of the package" TransitionComponent={Zoom} arrow>
                                        <IconButton size='small' sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)' }}><InfoIcon /></IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <FormControl fullWidth size='small' variant='filled'>
                                    <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        name="type"
                                        onChange={onSelectHandler}
                                        {...register("type")}
                                        error={errors.type ? true : false}
                                        helperText={errors.type?.message}
                                    >
                                        <MenuItem value="Gift">Gift</MenuItem>
                                        <MenuItem value="Purchase">Purchase</MenuItem>
                                        <MenuItem value="Rental">Rental</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    fullWidth
                                    label="Description*"
                                    variant="filled"
                                    size="small"
                                    name='description'
                                    multiline
                                    rows={4}
                                    {...register("description")}
                                    error={errors.description ? true : false}
                                    helperText={errors.description?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField
                                        fullWidth
                                        label="Meta Keywords*"
                                        variant="filled"
                                        size="small"
                                        name='metaKeywords'

                                        {...register("metaKeywords")}
                                        error={errors.metaKeywords ? true : false}
                                        helperText={errors.metaKeywords?.message}
                                    />
                                    <Tooltip title="Meta keywords for SEO" TransitionComponent={Zoom} arrow>
                                        <IconButton size='small' sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)' }}><InfoIcon /></IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Pricing</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Price*"
                                    variant="filled"
                                    size="small"
                                    name="price"
                                    {...register("price")}
                                    error={errors.price ? true : false}
                                    helperText={errors.price?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Discount Amount*"
                                    variant="filled"
                                    size="small"
                                    name="discountAmount"
                                    {...register("discountAmount")}
                                    error={errors.discountAmount ? true : false}
                                    helperText={errors.discountAmount?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Discount Percent*"
                                    variant="filled"
                                    size="small"
                                    name="discountPercent"
                                    {...register("discountPercent")}
                                    error={errors.discountPercent ? true : false}
                                    helperText={errors.discountPercent?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <Box sx={{ position: 'relative' }}>
                                    <TextField
                                        fullWidth
                                        label="Seasonal Price"
                                        variant="filled"
                                        size="small"
                                        name="size"
                                        {...register("seasonalPrice")}
                                    />
                                    <Tooltip title="seasonal price of the product(optional  )" TransitionComponent={Zoom} arrow>
                                        <IconButton size='small' sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)' }}><InfoIcon /></IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Vat"
                                    variant="filled"
                                    size="small"
                                    name="vat"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Vat Amount"
                                    variant="filled"
                                    size="small"
                                    name="vatAmount"
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Barcode"
                                    variant="filled"
                                    size="small"
                                    name="barcode"
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Inventory</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Stock*"
                                    variant="filled"
                                    size="small"
                                    name="stock"
                                    {...register("stock")}
                                    error={errors.stock ? true : false}
                                    helperText={errors.stock?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                <TextField
                                    fullWidth
                                    label="Size"
                                    variant="filled"
                                    size="small"
                                    name="size"
                                    {...register("size")}
                                    error={errors.size ? true : false}
                                    helperText={errors.size?.message}
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Countdown Time</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2} >
                            <DatePicker

                                label="Start Date"
                                renderInput={(params) =>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <TextField fullWidth variant="filled" size="small" {...params} />
                                    </Grid>
                                }
                                value={startDate}
                                onChange={(newValue) => {
                                    setStartDate(newValue)
                                }}
                            />
                            <DatePicker
                                label="End Date"
                                renderInput={(params) =>
                                    <Grid item xs={12} sm={6} md={6} lg={6}>
                                        <TextField fullWidth variant="filled" size="small" {...params} />
                                    </Grid>
                                }

                                value={endDate}
                                onChange={(newValue) => {
                                    setEndDate(newValue)
                                }}
                            />

                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Miscelanous</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Trending</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={isTrending}
                                        onChange={handleIsTrending}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Available</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={isAvailable}
                                        onChange={handleIsAvailable}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Orderable</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={isOrderable}
                                        onChange={handleIsOrderable}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Toprated</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={isToprated}
                                        onChange={handleIsToprated}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Display</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={isDisplay}
                                        onChange={handleIsDisplay}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Images</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4} lg={6}>
                                <FileUpload
                                    files={files}
                                    setFiles={setFiles}
                                    percent={percent}
                                    setPercent={setPercent}
                                    removeFile={removeFile}
                                />

                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5, mb: 2 }} variant='h6' color='textSecondary'>Select Products For Pacakge</Typography>
                        <Divider sx={{ mb: 5 }} />
                        <Grid container sx={{ mt: 2 }} spacing={2}>
                            <Grid item sm={12} md={6} lg={6} >
                                <Paper variant="outlined" style={{ maxHeight: 230, overflow: 'auto' }}>
                                    {data?.map((product: any, idx: number) => (
                                        <List >

                                            <ListItem disablePadding draggable onDragStart={(e) => dragStarted(e, product)}>
                                                <ListItemButton>

                                                    <ListItemText primary={product.name} secondary={truncate(product.description, 30)} />

                                                </ListItemButton>
                                                <Divider />
                                            </ListItem>

                                        </List>
                                    ))}
                                </Paper>
                            </Grid>
                            <Grid item sm={12} md={6} lg={6}>
                                <div
                                    onDragOver={(e) => draggingOver(e)}
                                    onDrop={(e) => dragDropped(e)}>
                                    {
                                        showDropArea && selectedProducts.length === 0 ?
                                            <div className={styles.fileCard}>
                                                <i>
                                                    <Add />
                                                </i>
                                                Drag Products here
                                            </div>
                                            :
                                            <Paper variant="outlined" style={{ maxHeight: 230, overflow: 'auto' }}>
                                                <List style={{ maxHeight: '100%', overflow: 'auto' }} >
                                                    {selectedProducts.map((product: any, idx: number) => (
                                                        <ListItem disablePadding>
                                                            <ListItemButton>
                                                                <Typography>  #{idx + 1} {product.name}</Typography>
                                                            </ListItemButton>
                                                            <DeleteForever
                                                                color="error"
                                                                sx={{ cursor: "pointer", fontSize: "30px", mr: 2 }}
                                                                onClick={() => deleteItem(product.id)} />
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Paper>
                                    }

                                </div>
                            </Grid>
                        </Grid>
                        <Grid container sx={{ mt: 5, mb: 5 }}>
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
            </Content >
        </>

    )
}

export default AddPackage