import React from "react"
import Typography from "@mui/material/Typography"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Stack from "@mui/material/Stack"
import Chip from "../../components/mui/Chip"
import styles from "../../styles/dashboard.module.css"
import { useTheme } from "@mui/material"
import Chart from "../../components/Chart"
import TrendingUpIcon from "@mui/icons-material/TrendingUp"
import TrendingDownIcon from "@mui/icons-material/TrendingDown"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import IconButton from "@mui/material/IconButton"
import PageBar from "../../components/PageBar"
import Content from "../../components/Content"
import LatestOrders from "../../components/dashboard/LatestOrders"
import TotalSales from "../../components/dashboard/TotalSales"

export default () => {
    const theme = useTheme()
    return (
        <>
           
            <Content padding>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Paper
                                    elevation={0}
                                    sx={{ backgroundColor: theme.palette.primary.main + "20" }}
                                    className={styles.card}
                                >
                                    <div className={styles.cardTop}>
                                        <Typography color="primary" className={styles.cardTitle}>
                                            Sales
                                        </Typography>
                                        <Chip bgColor={theme.palette.primary.main} label="Annual" />
                                    </div>
                                    <Typography variant="h5" color="primary">
                                        34600.00
                                    </Typography>
                                    <div className={styles.cardTop}>
                                        <Stack direction="row" className={styles.trendingUp}>
                                            <TrendingUpIcon className={styles.trendingUpIcon} />
                                            <span className={styles.trendingNum}>+34%</span>
                                        </Stack>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Paper variant="outlined" elevation={0} className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <Typography className={styles.cardTitle}>
                                            Customers
                                        </Typography>
                                        <Chip bgColor={theme.palette.primary.main} label="Weekly" />
                                    </div>
                                    <Typography variant="h5">65K</Typography>
                                    <div className={styles.cardTop}>
                                        <Stack direction="row" className={styles.trendingUp}>
                                            <TrendingDownIcon className={styles.trendingDownIcon} />
                                            <span className={styles.trendingNum}>-0.34%</span>
                                        </Stack>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Paper variant="outlined" elevation={0} className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <Typography className={styles.cardTitle}>
                                            Products
                                        </Typography>
                                        <Chip bgColor={theme.palette.primary.main} label="Annual" />
                                    </div>
                                    <Typography variant="h5">11,90.00</Typography>
                                    <div className={styles.cardTop}>
                                        <Stack direction="row" className={styles.trendingUp}>
                                            <TrendingDownIcon className={styles.trendingDownIcon} />
                                            <span className={styles.trendingNum}>-8.09%</span>
                                        </Stack>
                                    </div>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                                <Paper variant="outlined" elevation={0} className={styles.card}>
                                    <div className={styles.cardTop}>
                                        <Typography className={styles.cardTitle}>
                                            Revenue
                                        </Typography>
                                        <Chip
                                            bgColor={theme.palette.primary.main}
                                            label="Monthly"
                                        />
                                    </div>
                                    <Typography variant="h5">67,90,5000.00</Typography>
                                    <div className={styles.cardTop}>
                                        <Stack direction="row" className={styles.trendingUp}>
                                            <TrendingUpIcon className={styles.trendingUpIcon} />
                                            <span className={styles.trendingNum}>+10.99%</span>
                                        </Stack>
                                    </div>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
                        <Paper className={styles.chartCard} elevation={0} variant="outlined">
                            <div className={styles.chartHeader}>
                                <Typography className={styles.cardTitle}>
                                    Income & Expenses
                                </Typography>
                                <IconButton aria-label="settings">
                                    <MoreVertIcon />
                                </IconButton>
                            </div>
                            <Chart />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={7} xl={7}>
                        <LatestOrders />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6} lg={5} xl={5}>
                        <TotalSales />
                    </Grid>
                </Grid>
            </Content>
        </>
    )
}
