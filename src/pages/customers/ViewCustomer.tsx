import React from 'react'
import { Card, CardContent, Grid, Paper, Typography, Stack, Tabs, Tab, TabPanel, Button, Divider, Chip, CardContent, Box, Card } from "@mui/material"
import styles from "../../styles/dashboard.module.css"
import { useTheme } from "@mui/material"
import Avatar from '@mui/material/Avatar';
import ReceiptIcon from '@mui/icons-material/ReceiptRounded';
import LocalShippingIcon from '@mui/icons-material/LocalShippingRounded';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PaymentIcon from '@mui/icons-material/PaymentRounded';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCartRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { teal } from '@mui/material/colors';
//import TabPanel from '../../components/TabPanel';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Link } from 'react-router-dom';
import Content from '../../components/Content';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const ViewCustomer = () => {
    const theme = useTheme()


    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);

    }

    function createData(
        name: string,
        calories: number,
        fat: number,
        carbs: number,
        protein: number,
    ) {
        return { name, calories, fat, carbs, protein };
    }

    const rows = [
        createData('#80294', 'Today at 6:10 pm', 'Pending', '4 items', '$320.00'),
        createData('#80294', 'Today at 6:10 pm', 'Completed', '4 items', '$320.00'),
        createData('#80294', 'Today at 6:10 pm', 'Completed', '4 items', '$320.00'),
        createData('#80294', 'Today at 6:10 pm', 'Pending', '4 items', '$320.00'),
        createData('#80294', 'Today at 6:10 pm', 'Pending', '4 items', '$320.00'),
    ];

    return (
        <>
            <Content padding>
                <Grid container sx={{ height: "100%" }} spacing={2} >
                    <Grid item sm={12} md={4} lg={3}>
                        <Paper variant="outlined" elevation={0} sx={{ mt: 5, ml: 3 }} >
                            <div style={{ height: "300px", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
                                <Avatar
                                    alt="Remy Sharp"
                                    src=""
                                    sx={{ width: 86, height: 86, mb: 2 }}
                                />
                                <Typography variant="h6">Jessica Moore</Typography>
                                <Typography variant="subtitle2">jessica-moore@example.com</Typography>
                                <Typography sx={{ mb: 5 }} variant="caption">J+38 (094) 730-24-25</Typography>
                            </div>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={8} lg={9} marginTop={5}  >
                        <TableContainer component={Paper} variant="outlined" elevation={0} >
                            <Table aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell colSpan={5} size="medium">
                                            <Typography variant='h5'> Orders</Typography>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.name}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                <Link to="" style={{ color: "#2196f3", textDecoration: "none" }}> {row.name}</Link>
                                            </TableCell>
                                            <TableCell align="right">{row.calories}</TableCell>
                                            <TableCell align="right"><Chip label={row.fat} color="success" size="small" /></TableCell>
                                            <TableCell align="right">{row.carbs}</TableCell>
                                            <TableCell align="right">{row.protein}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <div style={{ textAlign: "center" }}>
                                <Button variant="text" size="small" sx={{ mt: 1 }}>
                                    View All Orders
                                </Button>
                            </div>
                        </TableContainer>
                    </Grid>
                </Grid>
                <Divider sx={{ mt: 5, mb: 5 }} />
                <Grid container sx={{ height: "100%" }} spacing={2}>
                    <Grid item sm={12} md={4} lg={6}>
                        <Paper variant="outlined" elevation={0} sx={{ mr: 2, height: 220, mb: 3 }}>

                            <Typography gutterBottom variant="h6" component="div" sx={{ ml: 2, mt: 1 }} >
                                <LocationCityIcon color="success" />  Address
                            </Typography>
                            <Divider />
                            <Typography sx={{ m: 3 }} color="text.secondary">
                                Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item sm={12} md={6} lg={6}>
                        <Paper variant="outlined" elevation={0} sx={{ mr: 2, height: 220, mb: 3 }}>
                            <Typography gutterBottom variant="h6" component="div" sx={{ ml: 2, mt: 1 }} >
                                <LocalShippingIcon color="secondary" /> Shipping Address
                            </Typography>
                            <Divider />
                            <Typography sx={{ m: 3 }} color="text.secondary">
                            Random Federation 115302, Moscow ul. Varshavskaya, 15-2-178
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Content>
        </>
    )
}

export default ViewCustomer