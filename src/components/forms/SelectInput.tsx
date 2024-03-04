import React, { useState } from "react"
import { Box, FormHelperText, FormControl, InputLabel, Select, MenuItem } from "@mui/material"

export default function SelectInput({
    value,
    onChange,
    items,
    label = "Select item",
    errorText = "",
    getValue = (item: any) => item,
    getTitle = (item: any) => item,
    variant = "filled",
    size = "medium",
}: {
    value: any
    onChange: Function
    items: Array<any>
    label?: String
    errorText?: String
    getValue?: Function
    getTitle?: Function
    variant?: string
    size?: string
}) {
    const [labelId] = useState(Math.random().toString().slice(0, 5).toString())

    return (
        <Box>
            <FormControl
                size={size}
                variant={variant}
                error={!!errorText}
                sx={{ mt: 2, mb: 0, minWidth: 200, width: "100%" }}
            >
                <InputLabel id={labelId}>{label}</InputLabel>
                <Select
                    labelId={labelId}
                    id="demo-simple-select-standard"
                    value={value}
                    onChange={(e: any) => onChange(e)}
                    label={label}
                >
                    {items.map((item: any, i: number) => (
                        <MenuItem key={i} value={getValue(item)}>
                            {getTitle(item)}
                        </MenuItem>
                    ))}
                </Select>
                {!!errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
            </FormControl>
        </Box>
    )
}
