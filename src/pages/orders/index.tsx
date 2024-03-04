import React, { useState } from "react"
import PageTableData from "../../components/containers/PageTableData"
import { orders, orderStatuses } from "../../__mocks__/orders"
import { OrderList } from "../../components/orders/OrderList"
import { Stack } from "@mui/material"
import Content from "../../components/Content"

const Orders = () => {
    const [orderStatusId, setOrderStatusId] = useState()
    const handleStatusChange = (e: any) => {
        setOrderStatusId(e.target.value)
    }
    return (

        <Content padding>
            <OrderList orders={orders} />
        </Content>
    )
}

export default Orders
