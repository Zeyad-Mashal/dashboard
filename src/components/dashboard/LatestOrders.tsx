import React from 'react'
import { format } from 'date-fns';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import Chip from '../mui/Chip';


const orders = [
    {
        id: 1,
        ref: 'CDD1049',
        amount: 30.5,
        customer: {
            name: 'Ekaterina Tankova'
        },
        createdAt: 1555016400000,
        status: 'pending'
    },
    {
        id: 2,
        ref: 'CDD1048',
        amount: 25.1,
        customer: {
            name: 'Cao Yu'
        },
        createdAt: 1555016400000,
        status: 'delivered'
    },
]

const LatestOrders = () => {
    return (
        <>
            <Card variant="outlined" >
                <CardHeader title="Latest Orders" />
                <Box >
                    <TableContainer component={Paper} elevation={0}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Order Ref
                                    </TableCell>
                                    <TableCell>
                                        Customer
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                      
                                         
                                                Date
                                          
                                    </TableCell>
                                    <TableCell>
                                        Status
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {orders.map((order) => (
                                    <TableRow
                                        hover
                                        key={order.id}
                                    >
                                        <TableCell>
                                            {order.ref}
                                        </TableCell>
                                        <TableCell>
                                            {order.customer.name}
                                        </TableCell>
                                        <TableCell>
                                          { format(order.createdAt, 'dd/MM/yyyy') }

                                        </TableCell>
                                        <TableCell>
                                            <Chip bgColor="green" color='' label="Delivered" />
                                            
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                   </Box>

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                    <Button
                        color="primary"
                        endIcon={<ArrowRightIcon fontSize="small" />}
                        size="small"
                        variant="text"
                    >
                        View all
                    </Button>
                </Box>
            </Card>
        </>
    )
}

export default LatestOrders