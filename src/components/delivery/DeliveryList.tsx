
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
import { format } from "date-fns";

type PropsActionMenu = {
    delivery: any,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { delivery } = props;
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
            {/*<Menu
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                PaperProps={{
                    sx: { width: 200, maxWidth: "100%" },
                }}
            >
                <MenuItem component={Link} to={`/product-view/${delivery.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem component={Link} to={`/delivery-edit/${delivery.id}`}>
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
            </Menu>*/}
        </>
    )
}

export const DeliveryList = ({ deliveries, loading }: any) => {


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="delivery table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Country</TableCell>
                        <TableCell align="center">State</TableCell>
                        <TableCell align="center">City</TableCell>
                        <TableCell align="center">Street</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {deliveries.map((delivery: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center" sx={{ width: '70px' }}>
                                #{idx + 1}
                            </TableCell>
                            <TableCell align="center">{delivery.country}</TableCell>
                            <TableCell align="center">{delivery.state}</TableCell>
                            <TableCell align="center">{delivery.city}</TableCell>
                            <TableCell align="center">{delivery.street}</TableCell>
                            <TableCell align="center">{format(delivery.createdAt, "dd/MM/yyyy")}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    delivery={delivery}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}



/*import React from "react"
import DataTableList from "../containers/DataTableList"
import { format } from "date-fns"
import DeliveryMoreMenu from "./DeliveryMoreMenu"

export const DeliveryList = ({ deliveries }: any) => {
    return (
        <DataTableList
            data={deliveries}
            headings={["Country", "State", "City", "Street", "Created At", "ACTION"]}
            dataFields={[
                {
                    field: "country",
                },
                {
                    field: "state",
                },
                {
                    field: "city",
                },
                {
                    field: "street",
                },
                {
                    render: (delivery: any) => format(delivery.createdAt, "dd/MM/yyyy"),
                },
                {
                    render: (delivery: any) => <DeliveryMoreMenu />,
                },
            ]}
        />
    )
}*/
