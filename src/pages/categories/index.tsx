import React, { useState, useEffect } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { Category } from "../../types"
import { Box } from "@mui/system"
import { Button, IconButton, InputBase, Stack, styled } from "@mui/material"
import {
    TableContainer,
    Table,
    TableCell, TableRow, TableHead,
    TableBody, Paper,
    ListItemText,
    ListItem, Chip, Alert,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import { formatDateTime } from "../../utils/helpers";
import useDelete from "../../hooks/useDelete"
import usePatch from "../../hooks/usePatch"
import ActionMenu from "../../components/categories/ActionMenu";
import CreateCategoryDialog from "../../components/categories/CreateCategoryDialog"
import UpdateCategoryDialog from "../../components/categories/EditCategoryDialog"
import PageBar from "../../components/PageBar"
import DropDown from "../../components/DropDown"
import { useNavigate } from "react-router-dom"
import axios, { AxiosRequestConfig } from "axios"
import { useAppSelector } from "../../store/store"
import CategorySearchResult from "../../components/categories/CategorySearchResult"
import Spinner from "../../components/spinner/Spinner"
import AddDiscountDialog from "../../components/categories/AddDiscountDialog"
import { categories } from "../../__mocks__/categories"
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

const Categories = () => {



    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [data, setData] = useState<Category[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openAddDiscountDialog, setAddDiscountDialog] = useState(false)
    const [categoryToUpdate, setCategoryToUpdate] = useState<Category>()
    const [addDiscount, setAddDiscount] = useState<Category>()
    const [discountDialogClose, setDiscountDialogClose] = useState(false);
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
                        values={['asc', 'desc']}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                </Stack>
                <Button
                    onClick={() => { setOpenCreateDialog(true) }}
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<AddIcon />}
                >
                    <b>Create Category</b>
                </Button>

            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="category table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left" >Sl No.</TableCell>
                                <TableCell align="center">Name</TableCell>

                                <TableCell align="center" >Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(categories && categories?.length > 0) ? categories?.map((category, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b style={{ color: blue[500] }}>   #{idx + 1}</b></TableCell>

                                    <TableCell align="center">{category.name}</TableCell>

                                    <TableCell align="center">
                                        <ActionMenu
                                            category={category} 
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
            <CreateCategoryDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
            {/* <UpdateCategoryDialog loadData={loadData} category={categoryToUpdate as Category} open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} />
                        <AddDiscountDialog loadData={loadData} category={addDiscount as Category} open={openAddDiscountDialog} onClose={() => setAddDiscountDialog(false)} />*/}

        </>
    )
}

export default Categories
