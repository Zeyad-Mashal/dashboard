
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

const SearchResultList = ({ searchResults }: any) => {

    console.log(searchResults)

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
                    {searchResults.map((product: any, idx: number) => (
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

                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )

}
export default SearchResultList;