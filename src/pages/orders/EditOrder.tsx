import React from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import { orders } from "../../__mocks__/orders"
import Content from "../../components/containers/PageViewContainer"
import { Typography, Box, Divider, Grid, Stack, Paper, Button } from "@mui/material"
import { v4 as uuid } from "uuid"
import DataTableList from "../../components/containers/DataTableList"
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PaidIcon from '@mui/icons-material/Paid';

const Orders = () => {

    const { orderId } = useParams()
    const [age, setAge] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setAge(event.target.value);
    };


    const order: any = orders.find((item) => item.id === orderId)
    console.log(
        "orders are",
        orders.map((item) => item.id)
    )
    const orderItems = [
        {
            id: uuid(),
            name: "Flower 1",
            price: 123,
            qty: 2,
            total: '$246',
        },
        {
            id: uuid(),
            name: "Flower 2",
            price: 43,
            qty: 1,
            total: '$43',
        },
        {
            id: uuid(),
            name: "Flower 3",
            price: 25,
            qty: 1,
            total: '$25',
        },
    ]
    if (!order) {
        return (
            <div style={{ padding: "20px" }}>
                <div>No order found</div>
            </div>
        )
    }
    return (
        <Content>
            <div>
                <Grid container>
                    <Grid item xs={8} sm={10} md={10} lg={10}>
                        <div style={{ display: "flex", }}>
                            <CalendarTodayIcon /><Typography variant="subtitle2" sx={{ ml: 1 }}>Wed, Aug 13,2021,4:43PM</Typography>

                        </div>
                        <Typography variant="caption" sx={{ ml: 4 }}>ID:#253dgdge513</Typography>
                    </Grid>
                    <Grid item xs={4} sm={2} md={2} lg={2}>
                        <div>

                            <FormControl sx={{ m: 1, minWidth: 150, }} size="small">
                                <InputLabel id="demo-select-small">Change status</InputLabel>
                                <Select
                                    labelId="demo-select-small"
                                    id="demo-select-small"
                                    value={status}
                                    label="Status"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Pending</MenuItem>
                                    <MenuItem value={20}>Completed</MenuItem>
                                    <MenuItem value={30}>Delivered</MenuItem>
                                </Select>
                            </FormControl>

                        </div>
                    </Grid>
                </Grid>
                <Divider sx={{ my: 2 }} />
                {/* <Box sx={{ py: 1 }}>
                    <Typography variant="h6">Customer Details</Typography>
                    <Grid container>
                        <Grid item sm={6}>
                            <div>
                                Address: sd
                            </div>
                        </Grid>
                        <Grid item sm={6}>
                            <div>Order Date: {format(order.createdAt, "dd-MM-yyyy")}</div>
                        </Grid>
                        <Grid item sm={6}>
                            <div>Email:d</div>
                        </Grid>
                        <Grid item sm={6}>
                            <div>Name: {order.name}</div>
                        </Grid>
                        <Grid item sm={6}>
                            <div>Phone: w</div>
                        </Grid>
                    </Grid>
    </Box>*/}

                <Grid container marginLeft={2}>
                    <Grid item md={4} lg={4}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <AccountCircleIcon fontSize="large" color="primary" />
                            <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6">Customer</Typography>
                                <Typography color="text.secondary">John Doe</Typography  >
                                <Typography color="text.secondary">example@email.com</Typography >
                                <Typography color="text.secondary">+919876543211</Typography >
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <PaidIcon fontSize="large" color="primary" />
                            <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6">Billing Address</Typography >
                                <Typography color="text.secondary">John Doe</Typography >
                                <Typography color="text.secondary">example@email.com</Typography >
                                <Typography color="text.secondary">+919876543211</Typography >
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item md={4} lg={4}>
                        <Box sx={{ display: "flex", flexDirection: "row" }}>
                            <LocationOnIcon fontSize="large" color="primary" />
                            <Box sx={{ ml: 2, display: "flex", flexDirection: "column" }}>
                                <Typography variant="h6">Billing Address</Typography>
                                <Typography color="text.secondary">John Doe</Typography>
                                <Typography color="text.secondary">example@email.com</Typography>
                                <Typography color="text.secondary">+919876543211</Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ pt: 2, fontSize: 16 }}>

                    <DataTableList
                        data={orderItems}
                        headings={["Item ", "Price", "Quantity", "Total"]}
                        dataFields={[
                            {
                                field: "name",
                            },
                            {
                                field: "price",
                            },
                            {
                                field: "qty",
                            },
                            {
                                field: "total",
                            },
                        ]}
                    />
                    <Stack marginBottom={5} marginRight={5}>
                        <Paper elevation={0} >


                            <Divider sx={{ marginTop: "1em" }} />
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em" }}>
                                <Typography sx={{ mr: 3 }}>Subtotal:</Typography>
                                <Typography sx={{ mr: 3 }} color="inherit" >₹4999.00</Typography>
                            </div>
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em" }}>

                                <Typography sx={{ mr: 5 }}>Taxes:</Typography>
                                <Typography sx={{ mr: 3 }} color="inherit" >₹0.00</Typography>
                            </div>
                            <Divider sx={{ marginTop: "1em" }} />
                            <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", marginTop: "1em" }}>

                                <Typography sx={{ mr: 5 }}>Total:</Typography>
                                <Typography color="inherit" variant="h6">₹4999.00</Typography>
                            </div>
                        </Paper>
                    </Stack>
                </Box>
            </div>
        </Content>
    )
}

export default Orders
