import React from "react"
import { Button, Grid, Stack } from "@mui/material"
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt"
import SearchField from "../mui/SearchField"
//import ButtonRounded from "../mui/Button";
import RouterLink from "../RouterLink"
import PageBar from "../PageBar"

const PageTableData = ({ children, btnTitle, btnLink, onClick }: any) => {
    return (
        <div style={{ flexGrow: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <PageBar>
                <form>
                    <SearchField name="keyword" sx={{ minWidth: "250px" }} />
                </form>
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{ width: "100%", display: "flex", justifyContent: "end" }}
                >
                    {
                        btnLink ? <RouterLink to={btnLink}>
                            <Button
                                onClick={onClick}
                                variant="contained"
                                color="primary"
                                disableElevation
                                startIcon={<PersonAddAltIcon />}
                            >
                                <b>{btnTitle}</b>
                            </Button>
                        </RouterLink> :

                            <Button
                                onClick={onClick}
                                variant="contained"
                                color="primary"
                                disableElevation
                                startIcon={<PersonAddAltIcon />}
                            >
                                <b>{btnTitle}</b>
                            </Button>


                    }


                </Stack>
            </PageBar>
            {/*<Grid container margin={3}>
                {children}
                </Grid>*/}
        </div>
    )
}

export default PageTableData
