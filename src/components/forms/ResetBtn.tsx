import React from "react"
import { Button, Box } from "@mui/material"
import RestartAltIcon from "@mui/icons-material/RestartAlt"

export default function ResetBtn({
    title = "Reset",
    onClick = () => {},
    ...otherProps
}: {
    title?: String
    onClick: Function
    otherProps?: any
}) {
    return (
        <Box sx={{ my: 3 }}>
            <Button
                onClick={(e: any) => onClick(e)}
                size="large"
                type="reset"
                startIcon={<RestartAltIcon />}
                variant="contained"
                color="error"
                disableElevation
                sx={{ mr: 1 }}
            >
                {title}
            </Button>
        </Box>
    )
}
