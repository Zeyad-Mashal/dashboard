
import React from "react"
import axios, { AxiosRequestConfig } from "axios"
import ConfirmDialog from "../ConfirmDialog"
import { Link } from "react-router-dom"
import {
    TableContainer,
    Table,
    TableCell, TableRow, TableHead,
    TableBody, Paper,
    ListItemText, Menu, MenuItem, ListItemIcon,
    ListItem, ListItemAvatar, Avatar, Chip, Alert, IconButton, Typography
} from "@mui/material";

import { MoreVert, DeleteOutline, Edit, RemoveRedEye } from "@mui/icons-material";
import { formatMoney, truncate } from "../../helpers";
import { getInitials } from "../../utils/get-initials";
import { format } from "date-fns";

type PropsActionMenu = {
    order: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { order } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }

    return (
        <>
            <IconButton onClick={handleMenuClick}>
                <MoreVert />
            </IconButton>
            <Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 200, maxWidth: "100%" },
                }}
            >

                <MenuItem component={Link} to={`/order-edit/${order.id}`}>
                    <ListItemIcon>
                        <Edit color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem>
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
            </Menu>
        </>
    )
}

export const OrderList = ({ orders, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="order table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Customer</TableCell>
                        <TableCell align="center">Number</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Paid</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {orders.map((order: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{ width: '70px' }}>
                                #{idx + 1}
                            </TableCell>
                            <TableCell align="left">
                                <ListItem>
                                    <Avatar sx={{ mr: 2 }}>
                                        {getInitials(order.name)}
                                    </Avatar>
                                    <Typography color="textPrimary" variant="body1">
                                        {order.name}
                                    </Typography>
                                </ListItem>
                            </TableCell>
                            <TableCell align="center">{order.number}</TableCell>
                            <TableCell align="center">{format(order.createdAt, "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center"> {order.paid === "Yes" ? <Chip size="small" label={order.paid} color="success" /> : <Chip size="small" label={order.paid} color="error" />}</TableCell>
                            <TableCell align="center">{order.status === "Recieved" ? <Chip size="small" label={order.status} color="primary" /> : <Chip size="small" label={order.status} color="error" />}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    order={order}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}


