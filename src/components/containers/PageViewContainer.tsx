import React from "react"
import { Divider, Box, Typography } from "@mui/material"

export default function Content(props: any) {
    return (
        <Box sx={{ p: 2, fontSize: 16 }}>
            {props.title ? (
                <Box sx={{ mt: 0, mb: 2 }}>
                    <Typography variant="h6" sx={{ mt: 1, mb: 2 }}>
                        {props.title}
                    </Typography>
                    <Divider light />
                </Box>
            ) : null}
            {props.children}
        </Box>
    )
}
