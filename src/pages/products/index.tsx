import React, { useState } from "react"
import { styled } from '@mui/material/styles';
import authHeader from "../../utils/auth-header"
import config from "../../utils/config"
import PageBar from "../../components/PageBar";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DropDown from "../../components/DropDown"
import { Box } from "@mui/system"
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom"
import { Avatar, Chip, IconButton, InputBase, ListItem, ListItemAvatar, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import Content from "../../components/Content";
import ActionMenu from "../../components/products/ActionMenu";
import { formatMoney, truncate } from "../../helpers";
import Spinner from "../../components/spinner/Spinner"
import { useProduct } from "../../hooks/products";
import { Product } from "../../types";
import axios from "axios";
import { products } from "../../__mocks__/products"
import { blue } from "@mui/material/colors";



const Input = styled(InputBase)(({ theme }) => `
    height: 36.5px;
    text-transform: none;
    margin-left:12px;
    flex:1;
    font-size: 14px;
    :focus {
        botder-color: ${theme.palette.primary.main}
    }
`)

const CustomPaper = styled(Paper)(({ theme }) => `
    height: 36.5px;
    display: flex;
    
    border-radius:.5em;
    :hover {
        border-color: ${theme.palette.primary.main}
    }
    :active {
        border-color: ${theme.palette.primary.main}
    }
`)

const Products = () => {

    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [data, setData] = useState<Product[]>([])


    const fetchNext = () => {
        setPage(page + 1);
    }

    const fetchPrev = () => {
        setPage(page - 1);
    }


    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <CustomPaper
                        variant='outlined'
                    >
                        <Input
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Search "
                            // onKeyUp={(e) => setFilter({ ...filter, ...{ name: e.currentTarget.value } })}
                            inputProps={{ "aria-label": "search ", size: "small" }}
                        />
                        <IconButton
                            type="submit"
                            onClick={() => { }}>
                            <SearchIcon />
                        </IconButton>
                    </CustomPaper>
                    <DropDown
                        label="Sort By"
                        //  values={['latest', 'oldest', 'name ascending', 'name descending', 'price high to low', 'price low to high', 'size']}
                        values={['name', 'price', 'size']}
                        //onClick={(v) => setFilter({ ...filter, ...{ 'order-by': v } })}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                    <DropDown
                        label="Type"
                        values={['Gift', 'Rental', 'Purchase']}
                        // onClick={(v) => setFilter({ ...filter, ...{ type: v } })}
                        getMenuLabel={(i) => i}
                        defaultLabel='all'
                    />
                    {/* <DropDownCheckBox
                        label="Category"
                        // Add 
                        values={['Gift', 'Rental', 'Purchage']}
                        onClick={(v) => console.log(v)}
                        renderValue={(i) => i}
    />*/}
                </Stack>
                <Link to="/product-add" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<AddIcon />}
                    >
                        <b>Add Product</b>
                    </Button>
                </Link>
            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="category table" size="small">
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
                        {products ? <TableBody>
                            {(products && products?.length > 0) ? products?.map((product, idx) => (
                                <TableRow
                                    key={product.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b style={{ color: blue[500] }}>   #{idx + 1}</b></TableCell>

                                    <TableCell align="left" sx={{ width: '33%' }}>
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar variant="rounded" src="https://flowershopstorage.s3.us-west-2.amazonaws.com/1234bd51-daf5-4f2a-b460-98f74f42da60-flower2.jpeg" />
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
                                            onUpdate={() => { }}

                                        />
                                    </TableCell>
                                </TableRow>
                            )) :

                                <TableRow>
                                    <TableCell align="center" colSpan={7}>
                                        No Data to load
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody> : <TableBody><TableCell colSpan={6} align="center"><Spinner /></TableCell></TableBody>}
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant='outlined' disabled={page === 1} onClick={fetchPrev}>Previous</Button>
                        <Button variant='outlined' disabled={data && data?.length <= 20} onClick={fetchNext} >Next</Button>
                    </Stack>
                </Box>
            </Content>
        </>
    )
}

export default Products
