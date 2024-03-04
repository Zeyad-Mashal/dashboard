import React, { useEffect, useState } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { Coupon } from "../../types"
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
import ActionMenu from "../../components/coupons/ActionMenu";
import CreateCouponDialog from "../../components/coupons/CreateCouponDialog"
import UpdateCouponDialog from "../../components/coupons/EditCouponDialog"
import PageBar from "../../components/PageBar"
import axios, { AxiosRequestConfig } from "axios"
import { useAppSelector } from "../../store/store"
import { blue } from "@mui/material/colors"
import { coupons } from "../../__mocks__/coupons"

const Coupons = () => {
    //const { data, isLoading, refetch, setData } = useFetch<Coupon[]>(config.ADMIN_API + "/coupons", authHeader());
    const { accessToken } = useAppSelector((state) => state.auth);
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [couponToUpdate, setCouponToUpdate] = useState<Coupon>()
    const [data, setData] = useState<Coupon[]>([])
    const [isLoading, setIsLoading] = useState(false);


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
                    sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                    <Button
                        onClick={() => { setOpenCreateDialog(true) }}
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<AddIcon />}
                    >
                        <b>Create Coupon</b>
                    </Button>
                </Stack>
            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="product table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" sx={{ width: '70px' }}>#</TableCell>
                                <TableCell align="left">Details</TableCell>
                                <TableCell align="center">Code</TableCell>
                                <TableCell align="center">Discount</TableCell>
                                <TableCell align="center">Status</TableCell>
                                <TableCell align="center">Effective Period</TableCell>
                                <TableCell align="center" sx={{ width: '50px' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(coupons && coupons?.length > 0) ? coupons?.map((coupon, idx) => (
                                <TableRow
                                    key={coupon.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="left"><b style={{ color: blue[500] }}>   #{idx + 1}</b></TableCell>
                                    <TableCell align="left" sx={{ width: '33%' }}>
                                        <ListItem sx={{ pl: 0 }}>
                                            <ListItemText primary={coupon.name} secondary={`Usage limit:${coupon.maxUsage} times • Used: ${coupon.usedCount} times`} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="center"><Button variant="outlined" size="small">{coupon.code}</Button></TableCell>
                                    <TableCell align="center"><b style={{ fontSize: '16px' }}>{coupon.discountAmount}%</b></TableCell>
                                    <TableCell align="center"><Chip size="small" label={coupon.isBlocked ? 'Blocked' : 'Active'} color={coupon.isBlocked ? 'secondary' : 'primary'} /></TableCell>
                                    <TableCell align="center" sx={{ width: '45%' }}><Button size="small" variant="outlined" color="inherit">{formatDateTime(coupon.startDateTime)}</Button> - <Button size="small" variant="outlined" color="inherit">{formatDateTime(coupon.expDateTime)}</Button></TableCell>
                                    <TableCell align="center">
                                        <ActionMenu
                                            coupon={coupon}
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
            <CreateCouponDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
        </>
    )
}

export default Coupons
