import React, { useEffect, useState } from "react"
import PageTableData from "../../components/containers/PageTableData"
import { PackageList } from "../../components/packages/PackageList"
import Content from "../../components/Content"
import axios, { AxiosRequestConfig } from "axios"
import authHeader from "../../utils/auth-header"
import useFetch from "../../hooks/useFetch"
import config from "../../utils/config"
import { Package } from "../../types";
import { Avatar, Box, Button, Chip, Container, IconButton, InputBase, ListItem, ListItemAvatar, ListItemText, Pagination, Paper, Stack, styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import AddIcon from '@mui/icons-material/Add';
import Spinner from "../../components/spinner/Spinner"
import { Link, useNavigate } from "react-router-dom"
import { useAppSelector } from "../../store/store"
import PageBar from "../../components/PageBar"
import DropDown from "../../components/DropDown"
import DropDownCheckBox from "../../components/DropDownCheckbox"
import { formatMoney, truncate } from "../../helpers"
import ActionMenu from "../../components/packages/ActionMenu"
import useDelete from "../../hooks/useDelete"


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

const Packages = () => {

    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [packageToUpdate, setPackageToUpdate] = useState<Package>()
    const [data, setData] = useState<Package[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const [searchBy, setSearchBy] = useState("name");
    const [order, setOrder] = useState("");
    const [searchValue, setSearchValue] = useState<string>("");
    const [searchResults, setSearchResults] = useState([]);
    const [sortValue, setSortValue] = useState<string>("");
    const [sortFilterValue, setSortFilterValue] = useState("");
    const [operation, setOperation] = useState("");
    const [optType, setOptType] = useState("");
    const [page, setPage] = useState(1);

    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };


    /* const loadData = async () => {
         setIsLoading(true);
         const res = await axios.get(config.ADMIN_API + "/packages", axiosConfig)
         setData(res.data);
         setIsLoading(false);
     }*/

    const loadData = async (optType) => {

        setIsLoading(true);
        //optType
        switch (optType) {
            case "search":
                setOperation(optType);
                try {
                    const res = await axios.get(config.ADMIN_API + `/packages?${searchBy}=${searchValue}&order-by=${searchBy}&order=asc&page=${page}`, axiosConfig);
                    setData(res.data)
                    // setSearchValue("")
                    setIsLoading(false);
                } catch (error: any) {
                    console.log(error)
                }
                break;
            default:
                const res = await axios.get(config.ADMIN_API + "/packages?page=" + page, axiosConfig)
                setData(res.data);
                setIsLoading(false);

        }


    }


    useEffect(() => {
        loadData("");
    }, [])


    const fetchNext = () => {
        setPage(page + 1);
        refetch(config.ADMIN_API + "/items?page=" + page);
    }

    const fetchPrev = () => {
        setPage(page - 1);
        refetch(config.ADMIN_API + "/items?page=" + page);
    }

    const deletePackage = useDelete(authHeader());

    const handleDelete = async (packagee: Package) => {
        const { error } = await deletePackage(config.ADMIN_API + "/packages/" + packagee.id)
        if (error) {
            // display error
            return
        }
        const newData = data?.filter(d => d.id !== packagee.id);
        setData(newData);
    }

    const handleReset = () => {
        loadData("");
    }

    const handleSearch = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        loadData("search")
        /* try {
             const res = await axios.get(config.ADMIN_API + `/packages?${searchBy}=${searchValue}&order-by=${searchBy}`, axiosConfig);
             console.log(res.data)
             setData(res.data)
             setSearchValue("")
             setIsLoading(false);
             //  navigate(`/categorysearch?${searchBy}=${searchValue}`);
 
         } catch (error: any) {
             console.log(error)
         }*/

    }

    function sorting(value: any) {
        console.log(value)
    }

    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <form onSubmit={handleSearch}>
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
                                onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        </CustomPaper>
                    </form>
                    <IconButton
                        type="submit"
                        onClick={() => handleReset()}>
                        <RestartAltIcon />
                    </IconButton>
                    <DropDown
                        label="Search By"
                        values={['name', 'price', 'size']}
                        onClick={(v) => setSearchBy(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                    {/*<DropDown
                        label="Status"
                        values={['trendeing', 'available', 'unavailable', 'display on', 'display off', 'top rated', 'orderable', 'unorderable']}
                        onClick={(v) => console.log(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='all'
    />*/}
                    <DropDown
                        label="Type"
                        values={['Gift', 'Rental', 'Purchage']}
                        onClick={(v) => console.log(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='all'
                    />
                </Stack>
                <Link to="/package-add" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<AddIcon />}
                    >
                        <b>Add Package</b>
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
                        {!isLoading ? <TableBody>
                            {(data && data?.length > 0) ? data?.map((packagee, idx) => (
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
                                                <Avatar variant="rounded" src={packagee.pictures[0]} />
                                            </ListItemAvatar>
                                            <ListItemText primary={packagee.name} secondary={truncate(packagee.description, 30)} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="center">{packagee.type}</TableCell>
                                    <TableCell align="center">{formatMoney(packagee.price)}</TableCell>
                                    <TableCell align="center"><Chip label={packagee.stock} color={packagee.stock > 5 ? 'success' : 'error'} /></TableCell>
                                    <TableCell align="center">
                                        <ActionMenu
                                            packagee={packagee}
                                            onUpdate={() => {
                                                setPackageToUpdate(packagee as Package)
                                                navigate(`/package-edit/${packagee.id}`)
                                            }}
                                            onDelete={handleDelete}
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

export default Packages
