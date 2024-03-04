import React from "react";
import styles from "../../styles/totalsales.module.css";
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CircularProgress from '@mui/material/CircularProgress';

const TotalSales = () => {
  return (
    <Paper
      variant="outlined"
      elevation={0}
      className={styles.card}
    >
      <div className={styles.top}>
        <Typography color="primary" className={styles.cardTitle}>Total Revenue</Typography>
        <IconButton aria-label="settings">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className={styles.bottom}>
        <div className={styles.featuredChart}>
          <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
        </div>
        <p className={styles.title}>Total sales made today</p>
        <p className={styles.amount}>$420</p>
      </div>
    </Paper>
  );
};

export default TotalSales;