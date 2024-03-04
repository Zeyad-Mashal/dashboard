import React, { useRef, useState } from "react"
import TableMoreMenu from "../containers/TableMoreMenu"
// ----------------------------------------------------------------------

function CustomerMoreMenu(props: any) {
    const editLink = `/customer-view/${props.customer.id}`;
    return <TableMoreMenu editLink={editLink} />
}

export default CustomerMoreMenu
