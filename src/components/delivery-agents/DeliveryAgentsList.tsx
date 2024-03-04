
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
    deliveryAgent: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { deliveryAgent } = props;
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
                <MenuItem component={Link} to={`/agent-view/${deliveryAgent.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem component={Link} to={`/agent-edit/${deliveryAgent.id}`}>
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

export const DeliveryAgentsList = ({ deliveryAgents, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="deliveryAgent table" size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">FirstName</TableCell>
                        <TableCell align="center">LastName</TableCell>
                        <TableCell align="center">Display Name</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {deliveryAgents.map((deliveryAgent: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{ width: '70px' }}>
                                #{idx + 1}
                            </TableCell>

                            <TableCell align="center">{deliveryAgent.firstName}</TableCell>
                            <TableCell align="center">{deliveryAgent.lastName}</TableCell>
                            <TableCell align="center">{deliveryAgent.displayName}</TableCell>
                            <TableCell align="center">{deliveryAgent.email}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    deliveryAgent={deliveryAgent}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}
