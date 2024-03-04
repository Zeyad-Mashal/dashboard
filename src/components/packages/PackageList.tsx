
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
    package: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { packag } = props;
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
                <MenuItem component={Link} to={`/package-view/${packag.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem component={Link} to={`/package-edit/${packag.id}`}>
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

export const PackageList = ({ packages, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="package table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Name/Description</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Size</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {packages.map((packag: any, idx: number) => (
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
                                        <Avatar variant="rounded" src={packag.pictures[0]} />
                                    </ListItemAvatar>
                                    <ListItemText primary={packag.name} secondary={truncate(packag.description, 30)} />
                                </ListItem>
                            </TableCell>
                            <TableCell align="center">{packag.type}</TableCell>
                            <TableCell align="center">{formatMoney(packag.price)}</TableCell>
                            <TableCell align="center"><Chip label={packag.stock} color={packag.stock > 5 ? 'success' : 'error'} /></TableCell>
                            <TableCell align="center"><Chip label={packag.size} color={packag.size === "small" ? 'error' : 'small'} /></TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    packag={packag}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}
