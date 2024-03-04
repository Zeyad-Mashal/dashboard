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
import ActionMenu from "../../components/blogs/ActionMenu";
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
import { truncate } from "../../helpers"
import { Blog } from "../../types";
import { blogs } from "../../__mocks__/blogs";
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

const Blogs = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

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
                </Stack>
                <Button
                    onClick={() => navigate("/blog-add")}
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<AddIcon />}
                >
                    <b>Create Blog</b>
                </Button>

            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="deliveryAgent table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Sl No</TableCell>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Description</TableCell>
                                <TableCell align="center">User</TableCell>
                                <TableCell align="center" sx={{ width: '50px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(blogs && blogs?.length > 0) ? blogs?.map((blog, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b style={{ color: blue[500] }}>   #{idx + 1}</b></TableCell> 
                                    <TableCell align="center">{blog.title}</TableCell>
                                    <TableCell align="center">{truncate(blog.description, 30)}</TableCell>
                                    <TableCell align="center">{blog.user}</TableCell>

                                    <TableCell align="center">
                                        <ActionMenu
                                            blog={blog}
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
                        <Button variant='outlined' disabled={blogs && blogs?.length <= 20} onClick={fetchNext} >Next</Button>
                    </Stack>
                </Box>
            </Content>
        </>
    )
}

export default Blogs
