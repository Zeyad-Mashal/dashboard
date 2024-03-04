import React, { useState } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { Customer } from "../../types"
import { Box } from "@mui/system"
import { Avatar, Button, IconButton, InputBase, ListItemAvatar, Stack, styled } from "@mui/material"
import {
    TableContainer,
    Table,
    TableCell, TableRow, TableHead,
    TableBody, Paper,
    ListItemText,
    ListItem, Chip, Alert,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { formatDateTime } from "../../utils/helpers";
import useDelete from "../../hooks/useDelete"
import usePatch from "../../hooks/usePatch"
import ActionMenu from "../../components/customers/ActionMenu";
import PageBar from "../../components/PageBar"
import { customers } from "../../__mocks__/customers"
import SearchField from "../../components/mui/SearchField"
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SearchIcon from "@mui/icons-material/Search";

import DropDown from "../../components/DropDown"

import Spinner from "../../components/spinner/Spinner"
import { blue } from "@mui/material/colors"


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


const Customers = () => {

    const [page, setPage] = useState(1);
    const [customerToView, setCustomerToView] = useState<Customer>()
    const [loading, setLoading] = useState<boolean>(false);
    const [searchBy, setSearchBy] = useState("name")
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchResults, setSearchResults] = useState([])

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
                            inputProps={{ "aria-label": "search ", size: "small" }}
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <IconButton
                            type="submit"
                        //</CustomPaper>onClick={searchCategories}
                        >
                            <SearchIcon />
                        </IconButton>
                    </CustomPaper>
                    <DropDown
                        label="Sort"
                        values={['active', 'blocked']}
                        onClick={(v) => console.log(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                </Stack>
            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="deliveryAgent table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                                <TableCell align="center"> Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center"> phone</TableCell>
                                <TableCell align="center">Display Name</TableCell>
                                <TableCell align="center" sx={{ width: '50px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(customers && customers?.length > 0) ? customers?.map((customer, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b style={{ color: blue[500] }}>#{idx + 1}</b></TableCell>
                                    <TableCell align="left">
                                        <ListItem>
                                            <ListItemAvatar>
                                                <Avatar src={customer.avatarUrl} />
                                            </ListItemAvatar>
                                            <ListItemText primary={customer.name} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="center">{customer.email}</TableCell>
                                    <TableCell align="center">{customer.phone}</TableCell>
                                    <TableCell align="center">{customer.address.street}</TableCell>
                                    <TableCell align="center">
                                        <ActionMenu
                                            customer={customer}

                                        />
                                    </TableCell>
                                </TableRow>
                            )) :

                                <TableRow>
                                    <TableCell align="center" colSpan={7}>
                                        Hello Now
                                    </TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant='outlined' disabled={page === 1} onClick={fetchPrev}>Previous</Button>
                        {/*<Button variant='outlined' disabled={data && data?.length <= 20} onClick={fetchNext} >Next</Button>*/}
                    </Stack>
                </Box>
            </Content>

        </>
    )
}

export default Customers
