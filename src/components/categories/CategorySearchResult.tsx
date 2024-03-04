
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
    ListItem, ListItemAvatar, Avatar, Chip, Alert, IconButton, Box
} from "@mui/material";

import { MoreVert, DeleteOutline, Edit, RemoveRedEye } from "@mui/icons-material";
import { formatMoney, truncate } from "../../helpers";
import Content from "../Content";
import Spinner from "../../components/spinner/Spinner"

const CategorySearchResult = ({ searchResults , loading}: any) => {

    console.log(loading)

    if(loading) {
        return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                paddingTop: "20px",
              }}
            >
              <Spinner />
            </div>
          );
    }

    return (
        <Content padding>
            <TableContainer component={Paper} elevation={0} variant="outlined">
                <Table sx={{ minWidth: 650 }} aria-label="category table" size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >#</TableCell>
                            <TableCell align="center">Name</TableCell>
                            <TableCell align="center" >Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {searchResults?.map((category:any, idx:number) => (
                            <TableRow
                                key={idx}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell align="center" >
                                    #{idx + 1}
                                </TableCell>
                                <TableCell align="center">{category.name}</TableCell>
                                <TableCell align="center">
                                    {/* <ActionMenu
                                        category={category}
                                        onUpdate={() => {
                                            setCategoryToUpdate(category as Category);
                                            setOpenUpdateDialog(true);
                                        }}
                                        onDelete={handleDelete}
                                    />*/}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                {/* <Stack direction="row" spacing={2}>
                    <Button variant='outlined' disabled={page === 1} onClick={fetchPrev}>Previous</Button>
                    <Button variant='outlined' disabled={data && data?.length <= 20} onClick={fetchNext} >Next</Button>
                    </Stack>*/}
            </Box>
        </Content>
    )

}
export default CategorySearchResult;