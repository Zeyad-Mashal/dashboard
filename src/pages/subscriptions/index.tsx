import React from "react"
import PageTableData from "../../components/containers/PageTableData"
import { subscriptions } from "../../__mocks__/subscriptions"
import { SubscriptionList } from "../../components/subscriptions/SubscriptionList"
import Content from "../../components/Content"
import { Container } from "@mui/material"

const Subscriptions = () => {
    return (
        <>
            <Container maxWidth="lg" sx={{ py: 3 }}>
                <SubscriptionList subscriptions={subscriptions} />
            </Container>
        </>
    )
}

export default Subscriptions
