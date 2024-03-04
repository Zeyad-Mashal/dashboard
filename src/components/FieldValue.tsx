import React from "react";
import Typography from '@mui/material/Typography';

const Value = ({ name, value }: {name:string, value?:string|number|JSX.Element}) => (
    <div style={{display:"flex", width: "100%", padding: ".3em 0"}}>
        <Typography sx={{ width:"150px" }}>{name}</Typography>
        <Typography color="textSecondary">: {value}</Typography>
    </div>
)

export default Value;

