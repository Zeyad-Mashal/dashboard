import React, { useEffect, useState } from 'react'
import Content from "../../components/Content"
import { Paper, Button, Switch, Typography, Box, Grid, Stack, FormLabel, TextField, IconButton, CardContent, Card } from "@mui/material"
import Carousel from 'react-material-ui-carousel'
import { useNavigate, useParams } from 'react-router-dom'
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
import { Package } from '../../types'
import ImageDisplay from '../../components/ImageDisplay'
import { isToggleCheck } from '../../services'
import { ProductList } from "../../components/products/ProductList"
import { format } from "date-fns"
import { formatDateTime } from '../../utils/helpers'
import ConfirmDialog from '../../components/ConfirmDialog'

const ViewPackage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [packag, setPackag] = useState<Package>({});
    const [loading, setLoading] = useState(true);
    const [changing, setChanging] = useState(false);
    const [confirmOpen, setConfirmOpen] = useState(false);

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };

    const fetchPackage = async () => {
        const res = await axios.get(config.ADMIN_API + `/packages/${id}`, axiosConfig);
        return res.data;
    }

    useEffect(() => {
        fetchPackage().then(data => { setPackag(data); setLoading(false) })
    }, [])

    const handleOrderable = async () => {

        const orderable = !packag.isOrderable;
        const url = `/packages/status/orderable`;
        const data = {
            id: id,
            isOrderable: orderable
        }

        isToggleCheck(data, url, axiosConfig).then((res) => {
            setPackag({ ...packag, ...{ isOrderable: orderable } })
        })
    }

    const handleTopRated = async () => {

        const topRated = !packag.isTopRated;
        const url = `/packages/status/top-rated`;
        const data = {
            id: id,
            isTopRated: topRated
        }
        isToggleCheck(data, url, axiosConfig).then((res) => {
            setPackag({ ...packag, ...{ isTopRated: topRated } })
        })
    }

    const handleAvailable = async () => {

        const available = !packag.isAvailable;
        const url = `/packages/status/availability`;
        const data = {
            id: id,
            isAvailable: available
        }

        isToggleCheck(data, url, axiosConfig).then((res) => {
            setPackag({ ...packag, ...{ isAvailable: available } })
        })
    }

    const handleDisplay = async () => {

        const display = !packag.isDisplay;
        const url = `/packages/status/display`;
        const data = {
            id: id,
            isDisplay: display
        }
        isToggleCheck(data, url, axiosConfig).then((res) => {
            setPackag({ ...packag, ...{ isDisplay: display } })
        })
    }

    const handleDelete = async (packageId: string) => {
        try {

            const res = await axios.delete(config.ADMIN_API + `/packages/${packageId}`, axiosConfig);

            if (res.status === 204) {
                navigate("/packages")
            }
        } catch (error: any) {
            console.log(error.response);
        }
    }

    return (
        <>
            <Box sx={{ display: 'flex', alignItems: "center", justifyContent: "space-between", py: 2, px: 3 }}>
                <Typography variant='h6' color='textSecondary'> Package Details</Typography>
                <Stack direction="row" spacing={1}>
                    <Tooltip title={packag.isOrderable ? "Make unordereable" : "Make ordereble"}>
                        <IconButton onClick={handleOrderable}>
                            <ShoppingCartIcon color={packag.isOrderable ? 'secondary' : 'inherit'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={packag.isAvailable ? "Make unavailable" : "Make available"}>
                        <IconButton onClick={handleAvailable}>
                            <InventoryIcon color={packag.isAvailable ? 'success' : 'inherit'} />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem sx={{ py: 1 }} />
                    <Tooltip title={packag.isTopRated ? "Set Top rated" : "Unset Top rated"}>
                        <IconButton onClick={handleTopRated}>
                            <StarIcon color={packag.isTopRated ? 'warning' : 'inherit'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={packag.isDisplay ? "Set Display Off" : "Set Display On"}>
                        <IconButton onClick={handleDisplay}>
                            <TvIcon color={packag.isDisplay ? 'info' : 'inherit'} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={packag.isTrending ? "Trending Off" : "Trending On"}>
                        <IconButton>
                            <TrendingUpIcon color={packag.isTrending ? 'success' : 'inherit'} />
                        </IconButton>
                    </Tooltip>
                    <Divider orientation="vertical" flexItem sx={{ py: 1 }} />
                    <Tooltip title="Edit">
                        <IconButton>
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
                    onConfirm={() => handleDelete(packag.id)}
                />
            </Box>
            <Divider sx={{ mb: 1 }} />
            <Content padding>
                <Grid container sx={{ height: "100%" }}>
                    {!loading ? (
                        <>
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                                <ImageDisplay images={packag.pictures} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={8} sx={{ px: 3 }}>

                                <Card variant="outlined">
                                    <CardContent>
                                        <Typography variant='h4'>{packag.name}</Typography>
                                        <Divider sx={{ my: 2 }} />
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <FieldValue name="Type" value={packag.type} />
                                                <FieldValue name="Price" value={formatMoney(packag.price)} />
                                                <FieldValue name="Seasonal Price" value={packag.seasonalPrice && formatMoney(packag?.seasonalPrice)} />
                                                <FieldValue name="Size" value={packag.size} />
                                                <FieldValue name="Discount Percent" value={`${packag.discountPercent}%`} />
                                                <FieldValue name="Discount Amount" value={formatMoney(packag.discountAmount)} />
                                                <FieldValue name="VAT Percent" value={packag.vat && `${product.vat}%`} />
                                                <FieldValue name="VAT Amount" value={packag.vatAmount ? formatMoney(packag.vatAmount) : ''} />
                                                <FieldValue name="Barcode" value={packag.barcode} />
                                                <FieldValue name="Stock" value={packag.stock} />
                                                <FieldValue name="Start date" value={formatDateTime(packag.countDownTimes?.start)} />
                                                <FieldValue name="End date" value={formatDateTime(packag.countDownTimes.end)} />
                                            </Grid>
                                        </Grid>
                                        <Divider sx={{ my: 2 }} />
                                        <Typography variant='h6'>Description:</Typography>
                                        <Typography >{packag.description}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={4}></Grid>
                            <Grid item xs={12} sm={12} md={6} lg={8} sx={{ px: 3, mt: 2 }}>
                                <Typography variant='h6'>Items </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <ProductList products={packag.items} />
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

export default ViewPackage

