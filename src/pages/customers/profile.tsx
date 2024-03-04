import React from "react"
import { orders } from "../../__mocks__/orders"
import { format } from "date-fns"
import { customers } from "../../__mocks__/customers"
import {
    Divider,
    Button,
    Box,
    Stack,
    Avatar,
    Card,
    Grid,
    CardContent,
    Typography,
} from "@mui/material"
import { Link, useParams } from "react-router-dom"
import Content from "../../components/containers/PageViewContainer"

const ProfilePage = () => {
    const { customerId } = useParams()
    const customer = customers.find((item) => item.id === customerId)
    return (
        <Content>
            {customer ? (
                <Stack alignItems="center" direction="column" sx={{ my: 1 }}>
                    <Avatar
                        src={customer.avatarUrl}
                        sx={{ mr: 2, width: 160, height: 160 }}
                    ></Avatar>
                    <Typography variant="h5" sx={{ my: 1 }}>
                        {customer.name}
                    </Typography>
                </Stack>
            ) : null}
            <Divider light />
            <Grid container sx={{ height: "100%" }}>
                <Grid item md={6} sx={{ p: 2, pl: 0 }}>
                    {customer ? (
                        <Box>
                            <Stack>
                                <Typography variant="h6" sx={{ pb: 2 }}>
                                    Customer Details
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <div>Zeyad</div> <div>{customer.name}</div>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <div>Email</div> <div>{customer.email}</div>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <div>Phone</div> <div>{customer.phone}</div>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between">
                                <div>Registered On</div>{" "}
                                <div>{format(customer.createdAt, "dd-MM-yyyy")}</div>
                            </Stack>
                        </Box>
                    ) : null}
                </Grid>
                <Grid item md={6} sx={{ borderLeft: "1px solid #ddd", p: 2 }}>
                    <Typography variant="h6" sx={{ pb: 2 }}>
                        Recent Orders
                    </Typography>
                    {orders.slice(0, 3).map((order) => (
                        <Box sx={{ mb: 2 }}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Typography sx={{ fontSize: "16px" }}>
                                        Order{" "}
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                display: "inline",
                                            }}
                                        >
                                            #{order.id}
                                        </Typography>
                                    </Typography>
                                    <Typography sx={{ fontSize: "16px" }}>
                                        Status{" "}
                                        <Typography
                                            sx={{
                                                fontWeight: "bold",
                                                fontSize: "16px",
                                                display: "inline",
                                            }}
                                        >
                                            {order.orderStatus}
                                        </Typography>
                                    </Typography>
                                    <Link
                                        to={`/orders/${order.id}`}
                                        style={{ textDecoration: "none" }}
                                    >
                                        <Button variant="contained" size="small" sx={{ mt: 1 }}>
                                            View Order
                                        </Button>
                                    </Link>
                                </CardContent>
                            </Card>
                        </Box>
                    ))}
                    <Link to={`/orders?customer=${customer.id}`} style={{ textDecoration: "none" }}>
                        <Button variant="text" size="small" sx={{ mt: 1 }}>
                            View All Orders
                        </Button>
                    </Link>
                </Grid>
            </Grid>
        </Content>
    )
}

export default ProfilePage
