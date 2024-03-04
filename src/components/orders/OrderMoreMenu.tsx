import React, { useRef, useState } from "react"
import TableMoreMenu from "../containers/TableMoreMenu"
// ----------------------------------------------------------------------

function OrderMoreMenu(props: any) {
    const viewLink = `/orders/${props.order.id}`
    return <TableMoreMenu viewLink={viewLink} id={props.order.id} />
}

export default OrderMoreMenu
