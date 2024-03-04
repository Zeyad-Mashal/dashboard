
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
    ListItem, ListItemAvatar, Avatar, Chip, Alert, IconButton
} from "@mui/material";

import { MoreVert, DeleteOutline, Edit, RemoveRedEye } from "@mui/icons-material";
import { formatMoney, truncate } from "../../helpers";

type PropsActionMenu = {
    customer: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { customer } = props;
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
                <MenuItem component={Link} to={`/package-view/${customer.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem component={Link} to={`/package-edit/${customer.id}`}>
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

export const CustomerList = ({ customers, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="customer table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Location</TableCell>
                        <TableCell align="center">Phone</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {customers.map((customer: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{ width: '70px' }}>
                                #{idx + 1}
                            </TableCell>
                            <TableCell align="left" sx={{ width: '33%' }}>
                                <ListItem>
                                    <ListItemAvatar>
                                        <Avatar variant="rounded" />
                                    </ListItemAvatar>
                                </ListItem>
                            </TableCell>
                            <TableCell align="center">{customer.email}</TableCell>
                            <TableCell align="center">{customer.location}</TableCell>
                            <TableCell align="center">{customer.phone}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    customer={customer}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}
