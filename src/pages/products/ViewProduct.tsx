import React, { useEffect, useState } from 'react'
import Content from "../../components/Content"
import { Paper, Button, Switch, Typography, Box, Grid, Stack, FormLabel, TextField, IconButton, CardContent, Card } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../store/store'
import axios, { AxiosRequestConfig } from 'axios'
import config from '../../utils/config'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import FieldValue from "../../components/FieldValue"
import _, { add } from "lodash";
import fp from "lodash/fp";
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TvIcon from '@mui/icons-material/Tv';
import InventoryIcon from '@mui/icons-material/Inventory';
import StarIcon from '@mui/icons-material/Star'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';
import EditIcon from '@mui/icons-material/Edit';
import { formatMoney } from '../../helpers'
import { isToggleCheck } from "../../services"
import { Product } from '../../types'
import ImageDisplay from '../../components/ImageDisplay'
import { useNavigate } from "react-router-dom"
import ConfirmDialog from '../../components/ConfirmDialog'

const ViewProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [product, setProduct] = useState<Product>({});
    const [loading, setLoading] = useState(false);
    const [changing, setChanging] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    {/*const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const fetchProduct = async () => {
        const res = await axios.get(config.ADMIN_API + `/items/${id}`, axiosConfig);
        return res.data;
    }

    useEffect(() => {
        fetchProduct().then(data => { setProduct(data); setLoading(false) })
    }, [])


    const handleOrderable = async () => {
        const orderable = !product.isOrderable;
        const url = `/items/status/orderable`;
        const data = {
            id: id,
            isOrderable: orderable
        }

        isToggleCheck(data, url, axiosConfig).then((res) => {
            setProduct({ ...product, ...{ isOrderable: orderable } })
        })
    }

    const handleTopRated = async () => {
        const topRated = !product.isTopRated;
        const url = `/items/status/top-rated`;
        const data = {
            id: id,
            isTopRated: topRated
        }
        isToggleCheck(data, url, axiosConfig).then((res) => {
            setProduct({ ...product, ...{ isTopRated: topRated } })
        })
    }

    const handleAvailable = async () => {
        const available = !product.isAvailable;
        const url = `/items/status/availability`;
        const data = {
            id: id,
            isAvailable: available
        }

        isToggleCheck(data, url, axiosConfig).then((res) => {
            setProduct({ ...product, ...{ isAvailable: available } })
        })
    }

    const handleDisplay = async () => {
        const display = !product.isDisplay;
        const url = `/items/status/display`;
        const data = {
            id: id,
            isDisplay: display
        }
        isToggleCheck(data, url, axiosConfig).then((res) => {
            setProduct({ ...product, ...{ isDisplay: display } })
        })
    }

    const handleDelete = async (productId: string) => {
        try {

            const res = await axios.delete(config.ADMIN_API + `/items/${productId}`, axiosConfig);
            console.log(res)
            if (res.status === 204) {
                navigate("/products")
            }
        } catch (error: any) {
            console.log(error.response);
        }
    }*/}

    const pictures = [
        "https://flowershopstorage.s3.us-west-2.amazonaws.com/1234bd51-daf5-4f2a-b460-98f74f42da60-flower2.jpeg",
        "https://flowershopstorage.s3.us-west-2.amazonaws.com/f83fd589-d406-4bec-8f8e-696afe84df93-flower1.jpg",
        "https://flowershopstorage.s3.us-west-2.amazonaws.com/809b212a-278c-43f3-9919-7fc7f390d2d8-flower3.jpeg",

    ]

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", py: 2, px: 3 }}>
                <Typography variant='h6' color='textSecondary'> Product Details</Typography>
                <Stack direction="row" spacing={1}>
                    <Tooltip title="Make ordereble">
                        <IconButton >
                            <ShoppingCartIcon color='secondary' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Make available">
                        <IconButton >
                            <InventoryIcon color='success' />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem sx={{ py: 1 }} />
                    <Tooltip title="Unset Top rated">
                        <IconButton >
                            <StarIcon color='warning' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Set Display Off">
                        <IconButton >
                            <TvIcon color='info' />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Trending Off">
                        <IconButton>
                            <TrendingUpIcon color='success' />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem sx={{ py: 1 }} />
                    <Tooltip title="Edit">
                        <IconButton onClick={() => navigate(`/product-edit/${product.id}`)} >
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                        <IconButton onClick={() => setConfirmOpen(true)}>
                            <DeleteIcon color='error' />
                        </IconButton>
                    </Tooltip>
                </Stack>
                <ConfirmDialog
                    title="Are you sure to delete"
                    open={confirmOpen}
                    setOpen={setConfirmOpen}
                // onConfirm={() => handleDelete(product.id)}
                />
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Content padding>
                <Grid container sx={{ height: "100%" }}>
                    {!loading ? (
                        <>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <ImageDisplay images={pictures} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={8} sx={{ px: 3 }}>

                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant='h4'>{product.name}</Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <FieldValue name="Type" value="Gift" />
                                                <FieldValue name="Price" value="100" />
                                                <FieldValue name="Seasonal Price" value="200" />
                                                <FieldValue name="Size" value={product.size} />
                                                <FieldValue name="Discount Percent" value="5%" />
                                                <FieldValue name="Discount Amount" value="20" />

                                                <FieldValue name="Colors" value={
                                                    <div style={{ display: "inline-block" }}>
                                                        <Stack direction="row" spacing={2}>
                                                            <div style={{ height: '20px', width: '20px', borderRadius: "50%", backgroundColor: "red" }}></div>
                                                        </Stack>
                                                    </div>
                                                } />
                                                <FieldValue name="Stock" value="10" />
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant='h6'>Description:</Typography>
                                        <Typography >Lorem ipsum</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </>
                    ) : <Box sx={{ display: 'flex', width: "100%", height: "100%", alignItems: "center", justifyContent: "center" }}>
                        <CircularProgress />
                    </Box>}
                </Grid>
            </Content>
        </>
    )
}

export default ViewProduct

