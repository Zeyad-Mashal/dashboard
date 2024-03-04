import React, { useRef, useState } from "react"
import TableMoreMenu from "../containers/TableMoreMenu"
// ----------------------------------------------------------------------

function ProductMoreMenu(props) {
    const viewLink = `/product-view/${props.product.id}`
    const editLink = `/product-edit/${props.product.id}`

    return <TableMoreMenu
        viewLink={viewLink}
        editLink={editLink}
        id={props.product.id} />
}

export default ProductMoreMenu
