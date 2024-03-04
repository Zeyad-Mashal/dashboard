
import React, { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import ConfirmDialog from "../ConfirmDialog"
import { Link, Navigate, useNavigate } from "react-router-dom"
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
import { Product } from "../../types";

type PropsActionMenu = {
    product: Product,
    onUpdate: (product: Product) => void
}

const ActionMenu = (props: PropsActionMenu) => {
    const { product, onUpdate } = props;
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
                <MenuItem component={Link} to={`/product-view/${product.id}`}>
                    <ListItemIcon>
                        <RemoveRedEye color="success" />
                    </ListItemIcon>
                    <ListItemText
                        primary="View"
                        primaryTypographyProps={{ variant: "body2" }}
                    />
                </MenuItem>
                <MenuItem onClick={() => onUpdate(product)}>
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

export const ProductList = ({ products }: any) => {

    console.log(products)

    const navigate = useNavigate()

    const [productToUpdate, setProductToUpdate] = useState<Product>()


    return (
        <TableContainer component={Paper} elevation={0} variant="outlined">
            <Table sx={{ minWidth: 650 }} aria-label="product table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                        <TableCell align="left">Name/Description</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Price</TableCell>
                        <TableCell align="center">Stock</TableCell>
                        <TableCell align="center">Action</TableCell>
                    </TableRow>
                </TableHead>
                 <TableBody>
                    {products?.map((product: any, idx: number) => (
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
                                        <Avatar variant="rounded" src={product.pictures[0]} />
                                    </ListItemAvatar>
                                    <ListItemText primary={product.name} secondary={truncate(product.description, 30)} />
                                </ListItem>
                            </TableCell>
                            <TableCell align="center">{product.type}</TableCell>
                            <TableCell align="center">{formatMoney(product.price)}</TableCell>
                            <TableCell align="center"><Chip label={product.stock} color={product.stock > 5 ? 'success' : 'error'} /></TableCell>
                            <TableCell align="center">
                                <ActionMenu
                                    product={product}
                                    onUpdate={() => {
                                        setProductToUpdate(product as Product)
                                        navigate(`/product-edit/${product.id}`)
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>

    )

}
