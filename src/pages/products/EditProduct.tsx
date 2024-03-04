import React, { useEffect, useRef, useState } from 'react';
import Button from "@mui/material/Button";
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Content from '../../components/Content';
import TagSelector from '../../components/mui/TagSelector';
import CloseIcon from '@mui/icons-material/Close';
import MuiTextField from '../../components/mui/TextField';
import { Divider, FilledInput, InputBasePropsSizeOverrides, Select, SelectChangeEvent } from '@mui/material';
import config from "../../utils/config";
import axios, { AxiosRequestConfig } from "axios";
import { useAppSelector } from '../../store/store';
import { Category, Product } from "../../types"
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import { Theme, useTheme } from '@mui/material/styles';
import useFetch from '../../hooks/useFetch';
import authHeader from '../../utils/auth-header';
import MsgBox from '../../components/MsgBox';
import { useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Spinner from '../../components/spinner/Spinner';
import styles from "../../styles/fileupload.module.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

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

const initialState: Product = {
    name: "",
    type: "",
    description: "",
    size: "",
    price: 0,
    seasonalPrice: 0,
    discountAmount: 0,
    discountPercent: 0,
    barcode: "",
    vat: "",
    vatAmount: 0,
    colors: [],
    isTrending: false,
    isAvailable: false,
    isOrderable: false,
    stock: 0,
    isTopRated: false,
    isDisplay: false,
    pictures: [],
    categories: [],
}

const EditProduct = () => {

    const { id } = useParams();
    const theme = useTheme();
    const { data, refetch } = useFetch<Category[]>(config.ADMIN_API + "/categories", authHeader());
    const { accessToken } = useAppSelector((state) => state.auth);
    const [updatedProduct, setUpdatedProduct] = useState(initialState);
    const [product, setProduct] = useState<Product>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState(false);
    const [open, setOpen] = useState(false);
    const [status, setStatus] = useState(undefined);
    const [categories, setCategories] = React.useState<string[]>(["hello", "fgh"]);
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
    const [percent, setPercent] = useState(0);

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const fetchProduct = async () => {
        setIsLoading(true)
        const res = await axios.get(config.ADMIN_API + `/items/${id}`, axiosConfig);
        setFiles(res.data.pictures)
        setProduct(res.data)
        setIsLoading(false)
    }

    useEffect(() => {
        fetchProduct()
    }, [])

    const handleCategoryChange = (event: SelectChangeEvent<typeof categories>) => {
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

    const handleInputChange = (e: any) => {
        console.log(e.target.value)
        let { name, value } = e.target;
        setUpdatedProduct({ ...updatedProduct, [name]: value });
    };

    const uploadHandler = (event: any) => {

        const file = event.target.files[0];
        const formData = new FormData();
        formData.append("image", file),

            axios.post(config.ADMIN_API + `/upload`, formData, axiosConfig)
                .then((res) => {
                    setFiles([...files, res.data.url])
                })
                .catch((err) => {
                    console.error(err)
                })
    }


    function handleClose() {
        setOpen(false);
    }

    console.log(files)
    const deleteFile = (fileName: string) => {
        console.log(fileName)
        setFiles(files.filter(file => file !== fileName))
    }


    const updateProduct = async (e: any) => {
        e.preventDefault();
        console.log(updatedProduct)
        const data = {
            name: updatedProduct.name || product.name,
            type: type || product.type,
            description: updatedProduct.description || product.description,
            size: updatedProduct.size || product.size,
            price: updatedProduct.price,
            seasonalPrice: product.seasonalPrice == null ? "" : updatedProduct.seasonalPrice,
            discountAmount: updatedProduct.discountAmount,
            discountPercent: updatedProduct.discountPercent,
            colors: [
                "pink",
                "red"
            ],
            isTakeSeasonalPrice: false,
            isTrending: false,
            isAvailable: true,
            isOrderable: true,
            stock: 10,
            isTopRated: false,
            isDisplay: true,
            pictures: files,
            categories: []

        }
        console.log(data)
    }

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return (
        <>
            <MsgBox
                open={open}
                handleClose={handleClose}
                success_msg={status?.success_msg}
            />
            <Content padding>
                <Box
                    sx={{ height: "100%" }}
                >
                    <form onSubmit={updateProduct}>
                        <Typography sx={{ mt: 2 }} variant='h6' color='textSecondary'>Edit Product</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField type="text"
                                    fullWidth
                                    label="Name*"
                                    variant="filled"
                                    size="small"
                                    name="name"
                                    defaultValue={product?.name || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <FormControl fullWidth size='small' variant='filled'>
                                    <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-filled-label"
                                        id="dropdown"
                                        label="Type*"
                                        name="type"
                                        defaultValue={product?.type || ''}
                                        onChange={onSelectHandler}
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
                                        defaultValue={categories}
                                        // value={['latest', 'oldest',]}
                                        onChange={handleCategoryChange}
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
                                    defaultValue={product?.description || ''}
                                    onChange={handleInputChange}
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
                                    multiline
                                    defaultValue={product?.price || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Seasonal Price"
                                    variant="filled"
                                    size="small"
                                    name="seasonalPrice"
                                    defaultValue={product?.seasonalPrice || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Discount Amount*"
                                    variant="filled"
                                    size="small"
                                    name="discountAmount"
                                    multiline
                                    defaultValue={product?.discountAmount || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Discount Percent*"
                                    variant="filled"
                                    size="small"
                                    name="discountPercent"
                                    multiline
                                    defaultValue={product?.discountPercent || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Vat"
                                    variant="filled"
                                    size="small"
                                    name="vat"
                                    multiline
                                    defaultValue={product?.vat || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Vat Amount"
                                    variant="filled"
                                    size="small"
                                    name="vatAmount"
                                    multiline
                                    defaultValue={product?.vatAmount || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Barcode"
                                    variant="filled"
                                    size="small"
                                    name="barcode"
                                    multiline
                                    defaultValue={product?.barcode || ''}
                                    onChange={handleInputChange}
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
                                    multiline
                                    defaultValue={product?.stock || ''}
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6} md={4} lg={4}>
                                <TextField
                                    fullWidth
                                    label="Size*"
                                    variant="filled"
                                    size="small"
                                    name="size"
                                    multiline
                                    defaultValue={product?.size || ''}
                                    onChange={handleInputChange}
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
                                        value={product?.isTrending}
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
                                        value={product?.isAvailable}
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
                                        value={product?.isOrderable}
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
                                        value={product?.isTopRated}
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
                                        value={product?.isDisplay}
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
                            <Grid item xs={12} sm={6} md={6} lg={6}>
                                {files?.map(img => (
                                    <>
                                        {/*<img src={img} height="50px" width="50px" />
                                        <input type="file"
                                            onChange={uploadHandler}
                                />*/}
                                        <div className={styles.wrapImage} >
                                            <span className={styles.close} onClick={() => deleteFile(img)} >&times;</span>
                                            <img src={img} className={styles.img} />
                                        </div>
                                    </>
                                ))
                                }
                                {/*<input type="file"
                                    onChange={uploadHandler} />*/}
                                {files.length <= 5 &&
                                    <div className={styles.fileCard}>
                                        <div className={styles.fileInputs}>
                                            <input
                                                type="file"
                                                accept='image/*'
                                                multiple
                                                onChange={uploadHandler} />
                                            <button className={styles.uploadBtn}>
                                                <i>
                                                    <CloudUploadIcon />
                                                </i>
                                                Upload
                                            </button>
                                        </div>
                                        <p className="">JPG, JPEG, PNG(Supported files)</p>
                                    </div>
                                }
                            </Grid>
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
            </Content>
        </>
    )
}

export default EditProduct