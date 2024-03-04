import React from "react"
import PageTableData from "../../components/containers/PageTableData"
import { reports } from "../../__mocks__/reports"
import { ReportList } from "../../components/reports/ReportList"
import Content from "../../components/Content"

const FinancialReports = () => {
    return (
        <>
            <PageTableData btnTitle="New Report" btnLink="/reports-add">
            </PageTableData>
            <Content padding>
                <ReportList reports={reports} />
            </Content>
        </>
    )
}

export default FinancialReports
