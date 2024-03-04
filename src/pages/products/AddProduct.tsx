import React, { useRef, useState } from 'react';
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
import TagSelector from '../../components/mui/TagSelector';
import CloseIcon from '@mui/icons-material/Close';
import MuiTextField from '../../components/mui/TextField';
import { AlertColor, Divider, FilledInput, InputBasePropsSizeOverrides, Select, SelectChangeEvent, Snackbar, Tooltip } from '@mui/material';
import config from "../../utils/config";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from '../../store/store';
import { User, Product, Category } from "../../types"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FileUpload from "../../components/FileUpload";
import FileList from "../../components/FileList";
import OutlinedInput from '@mui/material/OutlinedInput';
import { Theme, useTheme } from '@mui/material/styles';
import useFetch from '../../hooks/useFetch';
import authHeader from '../../utils/auth-header';
import MsgBox from '../../components/MsgBox';
import { CircularProgress } from "@mui/material"
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Zoom from '@mui/material/Zoom';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const colorNames = [
    'alice',
    'blue',
    'green',
    'pink',
    'red',
    'yellow',
];

function getStyles(name: string, personName: string[], theme: Theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

const validationSchema = Yup.object().shape({
    name: Yup.string().required("product name is required"),
    type: Yup.string().required("select product type"),
    description: Yup.string().required("description is required"),
    metaKeywords: Yup.string().required("meta description is required"),
    price: Yup.string().required("price is required"),
    seasonalPrice: Yup.string().typeError('Must be numeric.').nullable()
        .optional(),
    discountAmount: Yup.string().required("discount amount is required"),
    discountPercent: Yup.string().required("discount percentage is required"),
    stock: Yup.string().required("stock is required"),
    size: Yup.string().required("size is required"),
});

const AddProduct = () => {

    const { accessToken } = useAppSelector((state) => state.auth);
    const navigate = useNavigate();
    const theme = useTheme();
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

    const { data, isLoading, refetch, setData } = useFetch<Category[]>(config.ADMIN_API + "/categories", authHeader());
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(undefined);
    const [categories, setCategories] = React.useState<string[]>([]);
    const [type, setType] = React.useState('');
    const [colors, setColors] = React.useState<string[]>([]);
    const [backgroundColor, setBackgroundColor] = React.useState([])
    const [files, setFiles] = useState([])
    const [isTrending, setIsTrending] = React.useState(false);
    const [isAvailable, setIsAvailable] = React.useState(true);
    const [isOrderable, setIsOrderable] = React.useState(true);
    const [isToprated, setIsToprated] = React.useState(false);
    const [isDisplay, setIsDisplay] = React.useState(true);
    const [value, setValue] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [percent, setPercent] = useState(0);
    const [error, setError] = useState("");
    const [severity, setSeverity] = React.useState<AlertColor>('error')

    const removeFile = (filename: any) => {
        setFiles(files.filter(file => file.name !== filename))
    }


    const handleChange = (event: SelectChangeEvent<typeof categories>) => {
        const {
            target: { value },
        } = event;
        setCategories(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const handleColorChange = (event: SelectChangeEvent<typeof colors>) => {
        const {
            target: { value },
        } = event;
        setColors(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
        //@ts-ignore
        setBackgroundColor(value)
    };

    let col = ""
    backgroundColor.map((color) => {
        col = color
    })

    function backgroundColorSelect() {
        return (
            <div style={{ backgroundColor: col, height: "50px", width: "50px", marginLeft: "2px" }}></div>
        )
    }

    const onSelectHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setType(event.target.value);
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
                categories: categories,
                colors: colors,
                isTrending: isTrending || false,
                isAvailable: isAvailable || true,
                isOrderable: isOrderable || true,
                //isToprated: isToprated,
                isDisplay: isDisplay || true,
                pictures: files
            })

        try {

            const res = await axios.post(config.ADMIN_API + "/items", filteredObject, axiosConfig);
            if (res.status === 201) {
                setIsUploading(false);
                setSeverity('success')
                //@ts-ignore
                setStatus({ type: "success", success_msg: "Product added successfully" });
                setOpen(true);
            }
            reset();
            setCategories([])
            setColors([])
            setFiles([])
            //navigate("/products")
        } catch (error: any) {

            setIsUploading(false);
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

    return (
        <>
            {/* <MsgBox
                open={open}
                handleClose={handleClose}
                success_msg={status?.success_msg}
                error_msg={status?.error_msg}
    />*/}
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
                        <Typography variant='h6' color='textSecondary'>Add Product</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
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
                                    <Tooltip title="name of the product" TransitionComponent={Zoom} arrow>
                                        <IconButton size='small' sx={{ position: 'absolute', right: 5, top: '50%', transform: 'translateY(-50%)' }}><InfoIcon /></IconButton>
                                    </Tooltip>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl fullWidth size='small' variant='filled'>
                                    <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="demo-simple-select-filled"
                                        id="dropdown"
                                        label="Type*"
                                        name="type"
                                        onChange={onSelectHandler}
                                        {...register("type")}
                                        error={errors.type ? true : false}
                                        helperText={errors.type?.message}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value="Gift">Gift</MenuItem>
                                        <MenuItem value="Purchase">Purchase</MenuItem>
                                        <MenuItem value="Rental">Rental</MenuItem>
                                    </Select>
                                </FormControl>

                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl fullWidth size='small' variant='filled'>
                                    <InputLabel id="demo-multiple-name-label">Categories*</InputLabel>
                                    <Select
                                        labelId="demo-multiple-name-label"
                                        id="demo-multiple-name"
                                        multiple
                                        variant='filled'
                                        value={categories}
                                        onChange={handleChange}
                                        name="categories"
                                        input={<FilledInput label="Name" />}
                                        MenuProps={MenuProps}
                                    >
                                        {data?.map((category) => (
                                            <MenuItem
                                                key={category.id}
                                                value={category?.id}
                                                style={getStyles(category, categories, theme)}
                                            >
                                                {category?.name}
                                            </MenuItem>
                                        ))}
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
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Pricing</Typography>
                        <Divider sx={{ mb: 2 }} />
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
                                        name="seasonalPrice"
                                        showInfoBtn
                                        infoMessage='optional'
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
                                    {...register("vat")}
                                    error={errors.vat ? true : false}
                                    helperText={errors.vat?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Vat Amount"
                                    variant="filled"
                                    size="small"
                                    name="vatAmount"
                                    {...register("vatAmount")}
                                    error={errors.vatAmount ? true : false}
                                    helperText={errors.vatAmount?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Barcode"
                                    variant="filled"
                                    size="small"
                                    name="barcode"
                                    {...register("barcode")}
                                    error={errors.barcode ? true : false}
                                    helperText={errors.barcode?.message}
                                />
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Inventory</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
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
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Size*"
                                    variant="filled"
                                    size="small"
                                    name="size"
                                    {...register("size")}
                                    error={errors.size ? true : false}
                                    helperText={errors.size?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <div style={{ display: "flex", flexDirection: "row" }}>
                                    <FormControl fullWidth size='small' variant='filled'>
                                        <InputLabel id="demo-multiple-name-label">Color*</InputLabel>
                                        <Select
                                            labelId="demo-multiple-name-label"
                                            id="demo-multiple-name"
                                            multiple
                                            variant='filled'
                                            value={colors}
                                            onChange={handleColorChange}
                                            name="colors"
                                            input={<FilledInput label="Name" />}
                                            MenuProps={MenuProps}
                                        >
                                            {colorNames.map((color) => (
                                                <MenuItem
                                                    key={color}
                                                    value={color}
                                                    style={getStyles(color, colors, theme)}
                                                >
                                                    {color}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                    {backgroundColorSelect()}
                                </div>
                            </Grid>
                        </Grid>
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Miscelanous</Typography>
                        <Divider sx={{ mb: 2 }} />
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
                        <Typography sx={{ mt: 5 }} variant='h6' color='textSecondary'>Product images</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={6} md={4} lg={6}>
                                <FileUpload
                                    files={files}
                                    setFiles={setFiles}
                                    percent={percent}
                                    setPercent={setPercent}
                                    removeFile={removeFile}
                                    setError={setError}
                                />
                            </Grid>

                        </Grid>
                        <p style={{ color: "red" }}>{error}</p>
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
            </Content>
        </>
    )
}

export default AddProduct