import React, { useEffect, useState } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { DeliveryAgent } from "../../types"
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
import { formatDateTime } from "../../utils/helpers";
import useDelete from "../../hooks/useDelete"
import usePatch from "../../hooks/usePatch"
import ActionMenu from "../../components/delivery-agents/ActionMenu";
import CreateDeliveryAgentDialog from "../../components/delivery-agents/CreateDeliveryAgentDialog"
import UpdateDeliveryAgentDialog from "../../components/delivery-agents/EditDeliveryAgentDialog"
import PageBar from "../../components/PageBar"
import SearchField from "../../components/mui/SearchField"
import DropDown from "../../components/DropDown"
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import Spinner from "../../components/spinner/Spinner"
import { useAppSelector } from "../../store/store"
import { useNavigate } from "react-router-dom"
import axios, { AxiosRequestConfig } from "axios"


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

const DeliveryAgents = () => {
    const navigate = useNavigate();
    const { accessToken } = useAppSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [deliveryAgentToUpdate, setDeliveryAgentToUpdate] = useState<DeliveryAgent>()
    const [loading, setLoading] = useState<boolean>(false);
    const [searchBy, setSearchBy] = useState("name")
    const [searchValue, setSearchValue] = useState<string>("")
    const [searchResults, setSearchResults] = useState([])
    const [data, setData] = useState<DeliveryAgent[]>([])
    const [isLoading, setIsLoading] = useState(false);
  
    const axiosConfig: AxiosRequestConfig = {
        headers: {
            //@ts-ignore
            "Authorization": 'Bearer ' + JSON.parse(accessToken),
            "Content-Type": "application/json",
        },
    };
  

    const loadData = async () => {
        setIsLoading(true);
        const res = await axios.get(config.ADMIN_API + "/delivery-agents", axiosConfig)
        setData(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    const fetchNext = () => {
        setPage(page + 1);
        refetch(config.ADMIN_API + "/delivery-agents?page=" + page);
    }

    const fetchPrev = () => {
        setPage(page - 1);
        refetch(config.ADMIN_API + "/delivery-agents?page=" + page);
    }
    const deleteDeliveryAgent = useDelete(authHeader());
    const blockDeliveryAgent = usePatch(authHeader());

    const handleDelete = async (deliveryAgent: DeliveryAgent) => {
        const { error } = await deleteDeliveryAgent(config.ADMIN_API + "/delivery-agents/" + deliveryAgent.id)
        if (error) {
            // display error
            console.log(error)
            return
        }
        const newData = data?.filter(d => d.id !== deliveryAgent.id);
        setData(newData);

    }

    const handleBlock = async (deliveryAgent: DeliveryAgent) => {
        const { error } = await blockDeliveryAgent(
            config.ADMIN_API + "/delivery-agents/status/block",
            { id: deliveryAgent.id, isBlocked: !deliveryAgent.isBlocked }
        )
        if (error) {
            // display error
            return
        }
        const newData = data?.map(d => {
            if (d.id === deliveryAgent.id) {
                d.isBlocked = !d.isBlocked
            }
            return d;
        });
        setData(newData);
    }

    const handleReset = () => {
        loadData();
    }

    const handleSearch = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await axios.get(config.ADMIN_API + `/delivery-agents?${searchBy}=${searchValue}`, axiosConfig);
            console.log(res.data)
            setData(res.data)
            setSearchValue("")
            setLoading(false);
            //  navigate(`/categorysearch?${searchBy}=${searchValue}`);

        } catch (error: any) {
            console.log(error)
        }

    }

    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <form method="GET" onSubmit={handleSearch}>
                        <CustomPaper
                            variant='outlined'
                        >
                            <Input
                                required
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
                    </form>
                    <IconButton
                        type="submit"
                        onClick={() => handleReset()}>
                        <RestartAltIcon />
                    </IconButton>

                    <DropDown
                        label="Search By"
                        values={['name', 'email']}
                        onClick={(v) => setSearchBy(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                    <DropDown
                        label="Sort"
                        values={['pending', 'active', 'blocked']}
                        onClick={(v) => console.log(v)}
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
                    <b>Create Delivery Agent</b>
                </Button>

            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="deliveryAgent table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Display Name</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center" sx={{ width: '50px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(data && data?.length > 0) ? data?.map((deliveryAgent, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" sx={{ width: '70px' }}>
                                        #{idx + 1}
                                    </TableCell>
                                    <TableCell align="center">{deliveryAgent.firstName}</TableCell>
                                    <TableCell align="center">{deliveryAgent.lastName}</TableCell>
                                    <TableCell align="center">{deliveryAgent.email}</TableCell>
                                    <TableCell align="center">{deliveryAgent.displayName}</TableCell>
                                    <TableCell align="center"><Chip size="small" label={deliveryAgent.isBlocked ? 'Blocked' : 'Active'} color={deliveryAgent.isBlocked ? 'error' : 'success'} /></TableCell>

                                    <TableCell align="center">
                                        <ActionMenu
                                            deliveryAgent={deliveryAgent}
                                            onUpdate={() => {
                                                setDeliveryAgentToUpdate(deliveryAgent as DeliveryAgent);
                                                setOpenUpdateDialog(true);
                                            }}
                                            onDelete={handleDelete}
                                            onBlock={handleBlock}
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
            <CreateDeliveryAgentDialog loadData={loadData} open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
            <UpdateDeliveryAgentDialog loadData={loadData}  deliveryAgent={deliveryAgentToUpdate as DeliveryAgent} open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} />
        </>
    )
}

export default DeliveryAgents
