import React from "react"
import DataTableList from "../containers/DataTableList"
import { format } from "date-fns"
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
    category: any,
    handleDelete?: () => void,
    handleUpdate?: () => void,
}

const ActionMenu = (props: PropsActionMenu) => {
    const { category, handleDelete, handleUpdate } = props;
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [confirmOpen, setConfirmOpen] = React.useState(false);

    const handleMenuClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(e.currentTarget);
        setOpen(true);
    }

    const handleClose = () => {
        setAnchorEl(null);
        setOpen(false);
    }


    const deleteConactHandler = (id: any) => {
        handleDelete(id);
    };

    const updateCategoryHandler = (category) => {
        handleUpdate(category)
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
                <MenuItem
                    onClick={() => updateCategoryHandler(category)}
                >
                    <ListItemIcon>
                        <Edit color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary="Edit"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => setConfirmOpen(true)} >
                    <ListItemIcon>
                        <DeleteOutline color="error" />
                    </ListItemIcon>
                    <ListItemText primary="Delete" primaryTypographyProps={{ variant: "body2" }} />
                </MenuItem>
            </Menu>
            <ConfirmDialog
                title="Are you sure to delete"
                open={confirmOpen}
                setOpen={setConfirmOpen}
                onConfirm={() => deleteConactHandler(category.id)}
            />
        </>
    )
}

export const CategoryList = ({ categories, handleDelete, handleUpdate, loading }: any) => {

    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="category table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">#</TableCell>
                        <TableCell align="center">Name</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                {!loading ? <TableBody>
                    {categories.map((category: any, idx: number) => (
                        <TableRow
                            key={idx}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell align="center">
                                #{idx + 1}
                            </TableCell>
                            <TableCell align="center">{category.name}</TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    category={category}
                                    handleDelete={handleDelete}
                                    handleUpdate={handleUpdate}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
            </Table>
        </TableContainer>
    )

}






