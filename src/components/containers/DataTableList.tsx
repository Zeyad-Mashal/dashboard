import React from "react"
import { format } from "date-fns"
import {
    Avatar,
    Box,
    Card,
    Checkbox,
    Paper,
    Table,
    TableContainer,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
} from "@mui/material"

const DataTableList = ({ data, headings, dataFields }: any) => {
    return (
        data.length > 0 ?
            <TableContainer component={Paper} elevation={0}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            {headings.map((heading: String) => (
                                <TableCell key={heading}>
                                    <Typography>
                                        <strong>{heading}</strong>
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((dataItem: any, index: any) => (
                            <TableRow
                                hover
                                key={dataItem.id}
                                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                            >
                                {dataFields.map(
                                    (
                                        fieldItem: { render?: Function; field?: any },
                                        i: any
                                    ) => (
                                        <TableCell key={i}>
                                            {fieldItem.render
                                                ? fieldItem.render(dataItem)
                                                : dataItem[fieldItem.field]}
                                        </TableCell>
                                    )
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            :
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                    paddingTop: "20px",
                }}
            >
                "No data"
            </div>
    )
}
export default DataTableList
