import React from "react"
import PageTableData from "../../components/containers/PageTableData"
import { deliveries } from "../../__mocks__/deliveries"
import { DeliveryList } from "../../components/delivery/DeliveryList"
import Content from "../../components/Content"
import PageBar from "../../components/PageBar"
import DropDown from "../../components/DropDown"
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from "react-router-dom"
import SearchField from "../../components/mui/SearchField";
import { Container, Stack } from "@mui/material"

const Delivery = () => {
    return (
        <>
            <PageBar>
                <Stack
                    direction="row"
                    spacing={2}
                >
                    <form>
                        <SearchField placeholder="delivery" name="name" sx={{ maxWidth: "100px" }} />
                    </form>
                    <DropDown
                        label="Sort"
                        values={['pending', 'active', 'blocked']}
                        onClick={(v) => console.log(v)}
                        getMenuLabel={(i) => i}
                        defaultLabel='none'
                    />
                </Stack>
            </PageBar>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <DeliveryList deliveries={deliveries} />
            </Container>
        </>
    )
}

export default Delivery
