import React from "react"
import { Box, TextField } from "@mui/material"

export default function FormInput(props: any) {
    return (
        <Box sx={{ my: 0 }}>
            <TextField sx={{ width: "100%", minWidth: "200px" }} variant="filled" {...props} />
        </Box>
    )
}
