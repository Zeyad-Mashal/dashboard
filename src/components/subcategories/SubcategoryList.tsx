import React from "react"
import DataTableList from "../containers/DataTableList"
import { format } from "date-fns"
import SubcategoryMoreMenu from "./SubcategoryMoreMenu"

export const SubcategoryList = ({ subcategories }: any) => {
    return (
        <DataTableList
            data={subcategories}
            headings={["Name", "Category", "Created At", "ACTION"]}
            dataFields={[
                {
                    field: "name",
                },
                {
                    render: (subcategory: any) => subcategory.category.name,
                },
                {
                    render: (subcategory: any) => format(subcategory.createdAt, "dd/MM/yyyy"),
                },
                {
                    render: (subcategory: any) => <SubcategoryMoreMenu />,
                },
            ]}
        />
    )
}
