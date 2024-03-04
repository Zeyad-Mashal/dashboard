import React, { useState } from "react"
import Content from "../../components/Content"
import useFetch from "../../hooks/useFetchData"
import config from "../../utils/config"
import authHeader from "../../utils/auth-header"
import { NewsLetter } from "../../types"
import { Box } from "@mui/system"
import { Button, Chip, Stack } from "@mui/material"
import {
    TableContainer,
    Table,
    TableCell, TableRow, TableHead,
    TableBody, Paper,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { formatDateTime } from "../../utils/helpers";
import useDelete from "../../hooks/useDelete"
import usePatch from "../../hooks/usePatch"
//import ActionMenu from "../../components/newsletters/ActionMenu";

import PageBar from "../../components/PageBar"

const NewsLetters = () => {
    const { data, isLoading, refetch, setData } = useFetch<NewsLetter[]>(config.ADMIN_API + "/newsletters", authHeader());
    const [page, setPage] = useState(1);
    const [openCreateDialog, setOpenCreateDialog] = useState(false)

    const fetchNext = () => {
        setPage(page + 1);
        refetch(config.ADMIN_API + "/newsletters?page=" + page);
    }

    const fetchPrev = () => {
        setPage(page - 1);
        refetch(config.ADMIN_API + "/newsletters?page=" + page);
    }


    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >   
                </Stack>
            </PageBar>
            <Content padding>
                <TableContainer component={Paper} elevation={0} variant="outlined">
                    <Table sx={{ minWidth: 650 }} aria-label="newsletter table" size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center" >#</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Subscribed</TableCell>
                                <TableCell align="center">Subscribed on</TableCell>
                            </TableRow>
                        </TableHead>
                        {!isLoading ? <TableBody>
                            {(data && data?.length > 0) ? data?.map((newsletter, idx) => (
                                <TableRow
                                    key={idx}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell align="center" >
                                        #{idx + 1}
                                    </TableCell>
                                    <TableCell align="center">{newsletter.email}</TableCell>
                                    <TableCell align="center"><Chip size="small" label={newsletter.isSubscribed ? 'Yes' : 'No'} color={newsletter.isSubscribed ? 'success' : 'error'} /></TableCell>
                                    <TableCell align="center">{formatDateTime(newsletter.createdAt)}</TableCell>
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
        </>
    )
}

export default NewsLetters
