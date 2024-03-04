import React from "react"
import PageTableData from "../../components/containers/PageTableData"
import { sliders } from "../../__mocks__/sliders"
import { SliderList } from "../../components/sliders/SliderList"
import Content from "../../components/Content"
import { Container } from "@mui/material"
import PageBar from "../../components/PageBar";
import SearchField from "../../components/mui/SearchField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DropDown from "../../components/DropDown"
import DropDownCheckBox from "../../components/DropDownCheckbox"
import AddIcon from '@mui/icons-material/Add';
import { Link } from "react-router-dom"


const Sliders = () => {
    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                >
              
                </Stack>
                <Link to="/slider-add" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        disableElevation
                        startIcon={<AddIcon />}
                    >
                        <b>Add Slider</b>
                    </Button>
                </Link>
            </PageBar>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <SliderList sliders={sliders} />
            </Container>
        </>
    )
}

export default Sliders
