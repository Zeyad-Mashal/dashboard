import React from "react"
import DataTableList from "../containers/DataTableList"
import { format } from "date-fns"
import ReportMoreMenu from "./ReportMoreMenu"

export const ReportList = ({ reports }: any) => {
    return (
        <DataTableList
            data={reports}
            headings={[
                "Earnings($)",
                "Item Sold",
                "Orders",
                "Subscriptions",
                "Impressions",
                "Signups",
                "Created At",
                "ACTION",
            ]}
            dataFields={[
                {
                    field: "earnings",
                },
                {
                    field: "itemsSold",
                },
                {
                    field: "orders",
                },
                {
                    field: "subscriptions",
                },
                {
                    field: "impressions",
                },
                {
                    field: "signups",
                },
                {
                    field: "orders",
                },
                {
                    render: (coupon: any) => format(coupon.createdAt, "dd/MM/yyyy"),
                },
                {
                    render: (coupon: any) => <ReportMoreMenu />,
                },
            ]}
        />
    )
}
