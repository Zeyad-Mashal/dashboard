import React from "react"
import { Button, Box } from "@mui/material"
import SaveAltIcon from "@mui/icons-material/SaveAlt"

export default function SubmitBtn({
    title = "Create",
    onClick = () => {},
    ...otherProps
}: {
    title: String
    onClick?: Function
    otherProps?: any
}) {
    return (
        <Box sx={{ my: 3 }}>
            <Button
                onClick={(e: any) => onClick(e)}
                type="submit"
                size="large"
                startIcon={<SaveAltIcon />}
                disableElevation
                variant="contained"
                {...otherProps}
            >
                {title}
            </Button>
        </Box>
    )
}
