
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
    subscription: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { subscription } = props;
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
                <MenuItem component={Link} to={`/subscription-edit/${subscription.id}`}>
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

export const SubscriptionList = ({ subscriptions, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="subscription table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Customer</TableCell>
                        <TableCell align="center">Email </TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Subscription Data</TableCell>
                        <TableCell align="center">Subscription Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {subscriptions.map((subscription: any, idx: number) => (
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
                                        {getInitials(subscription.name)}
                                    </Avatar>
                                    <Typography color="textPrimary" variant="body1">
                                        {subscription.name}
                                    </Typography>
                                </ListItem>
                            </TableCell>
                            <TableCell align="center">{subscription.email}</TableCell>
                            <TableCell align="center">{subscription.location}</TableCell>
                            <TableCell align="center">{subscription.phone}</TableCell>
                            <TableCell align="center">{format(subscription.createdAt, "dd/MM/yyyy")}</TableCell>

                            <TableCell align="center">{subscription.status === "RECEIVED" ? <Chip size="small" label={subscription.status} color="primary" /> : <Chip size="small" label={subscription.status} color="error" />}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    subscription={subscription}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}
