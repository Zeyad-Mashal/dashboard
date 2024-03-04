import React, { useState } from "react"
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
import PageBar from "../../components/PageBar"

const Coupons = () => {
    const { data, isLoading, refetch, setData } = useFetch<Coupon[]>(config.ADMIN_API + "/coupons", authHeader());
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    const fetchNext = () => {
        setPage(page + 1);
        refetch(config.ADMIN_API + "/coupons?page=" + page);
    }

    const deleteCoupon = useDelete(authHeader());
    const blockCoupon = usePatch(authHeader());

    const handleDelete = async (coupon: Coupon) => {
        const { error } = await deleteCoupon(config.ADMIN_API + "/coupons/" + coupon.id)
        if (error) {
            // display error
            return
        }
        const newData = data?.filter(d => d.id !== coupon.id);
        setData(newData);

    }
    const handleBlock = async (coupon: Coupon) => {
        const { error } = await blockCoupon(
            config.ADMIN_API + "/coupons/status/block",
            { id: coupon.id, isBlocked: !coupon.isBlocked }
        )
        if (error) {
            // display error
            return
        }
        const newData = data?.map(d => {
            if (d.id === coupon.id) {
                d.isBlocked = !d.isBlocked
            }
            return d;
        });
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
                                <TableCell align="center">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(data && data?.length > 0) ? data?.map((coupon, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" sx={{ width: '70px' }}>
                                        #{idx + 1}
                                    </TableCell>
                                    <TableCell align="left" sx={{ width: '33%' }}>
                                        <ListItem>
                                            <ListItemText primary={coupon.name} secondary={`Usage limit:${coupon.maxUsage} times • Used: ${coupon.usedCount} times`} />
                                        </ListItem>
                                    </TableCell>
                                    <TableCell align="center">{coupon.code}</TableCell>
                                    <TableCell align="center">{coupon.discountAmount}%</TableCell>
                                    <TableCell align="center"><Chip size="small" label={coupon.isBlocked ? 'Blocked' : 'Active'} color={coupon.isBlocked ? 'error' : 'success'} /></TableCell>
                                    <TableCell align="center"><small>{formatDateTime(coupon.startDateTime)} <br /> to <br /> {formatDateTime(coupon.expDateTime)}</small></TableCell>
                                    <TableCell align="center">
                                        <ActionMenu
                                            coupon={coupon}
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
                        </TableBody> : <TableBody><TableCell colSpan={6} align="center">Loading please wait...</TableCell></TableBody>}
                    </Table>
                </TableContainer>
                <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                    <Stack direction="row">
                        <Button disabled={page === 1}>Previous</Button>
                        <Button disabled={data && data?.length <= 20} onClick={fetchNext} >Next</Button>
                    </Stack>
                </Box>
            </Content>
            <CreateCouponDialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} />
        </>
    )
}

export default Coupons
