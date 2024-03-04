import React, { useEffect, useState } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { User } from "../../types"
import { Box } from "@mui/system"
import { Button, Stack } from "@mui/material"
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
import ActionMenu from "../../components/users/ActionMenu";
import CreateCouponDialog from "../../components/coupons/CreateCouponDialog"
import UpdateCouponDialog from "../../components/coupons/EditCouponDialog"
import PageBar from "../../components/PageBar"
import CreateUserDialog from "../../components/users/CreateUserDialog"
import UpdateUserDialog from "../../components/users/EditUserDialog"
import PasswordChangeDialog from "../../components/users/ChangePasswordDialog"
import axios, { AxiosRequestConfig } from "axios"
import { useAppSelector } from "../../store/store"

const Users = () => {
    const {refetch } = useFetch<User[]>(config.ADMIN_API + "/users", authHeader());
    const { accessToken } = useAppSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openPasswordChangeDialog, setOpenPasswordChangeDialog] = useState(false)
    const [userToUpdate, setUserToUpdate] = useState<User>()
    const [data, setData] = useState<User[]>([])
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
        const res = await axios.get(config.ADMIN_API + "/users", axiosConfig)
        setData(res.data);
        setIsLoading(false);
    }

    useEffect(() => {
        loadData();
    }, [])

    const fetchNext = () => {
        setPage(page + 1);
        refetch(config.ADMIN_API + "/users?page=" + page);
    }

    const fetchPrev = () => {
        setPage(page - 1);
        refetch(config.ADMIN_API + "/users?page=" + page);
    }
    const deleteUser = useDelete(authHeader());

    const handleDelete = async (user: User) => {
        const { error } = await deleteUser(config.ADMIN_API + "/users/" + user.id)
        if (error) {
            // display error
            return
        }
        const newData = data?.filter(d => d.id !== user.id);
        setData(newData);

    }

    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                    <Button
                        onClick={() => { setOpenCreateDialog(true) }}
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<AddIcon />}
                    >
                        <b>Create User</b>
                    </Button>
                </Stack>
            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="user table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="center">Username</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Phone</TableCell>
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(data && data?.length > 0) ? data?.map((user, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" sx={{ width: '70px' }}>
                                        #{idx + 1}
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '33%' }}>
                                        <ListItem>
                                            <ListItemText primary={user.name} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="center">{user.username}</TableCell>
                                    <TableCell align="center">{user.email}</TableCell>
                                    <TableCell align="center">{user.phone}</TableCell>

                                    <TableCell align="center">
                                        <ActionMenu
                                            user={user}
                                            onUpdate={() => {
                                                setUserToUpdate(user as User);
                                                setOpenUpdateDialog(true);
                                            }}
                                        onDelete={handleDelete}
                                        onPasswordChange={() => {
                                            setUserToUpdate(user as User);
                                            setOpenPasswordChangeDialog(true);
                                        }}
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
                        </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                    <Stack direction="row" spacing={2}>
                        <Button variant='outlined' disabled={page === 1} onClick={fetchPrev}>Previous</Button>
                        <Button variant='outlined' disabled={data && data?.length <= 20} onClick={fetchNext} >Next</Button>
                    </Stack>
                </Box>
            </Content>
            <CreateUserDialog loadData={loadData} open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
            <UpdateUserDialog  loadData={loadData} user={userToUpdate as User} open={openUpdateDialog} onClose={() => setOpenUpdateDialog(false)} />
            <PasswordChangeDialog user={userToUpdate as User} open={openPasswordChangeDialog} onClose={() => setOpenPasswordChangeDialog(false)} />

        </>
    )
}

export default Users
