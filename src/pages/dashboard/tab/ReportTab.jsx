import useAllReport from "../../../hook/reports/useAllReport";
import {
    Button,
    Table,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";


const ReportTab = () => {
    let reports = useAllReport();
    const dataSource = reports?.map((report) => {
        return {
            resourceType: report.resourceType,
            resourceId: report.resourceId,
            reason: report.reason,
            action: (
                <>
                    <Button
                        className="mr-2"

                        style={{ color: "blue" }}
                    >
                    {report.resourceType =="post" ? "Delete" : "Unactive"} 
                    </Button>
                    <Button >
                        Detail
                    </Button>
                </>
            ),
        };
    });

    const columns = [
        {
            title: 'ResourceType',
            dataIndex: 'resourceType',
            key: 'resourceType',
        },
        {
            title: 'ResourceId',
            dataIndex: 'resourceId',
            key: 'resourceId',
        },
        {
            title: 'Reason',
            dataIndex: 'reason',
            key: 'reason',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return (
        <div className=" h-full w-full text-center px-5">

            <h1 className="mt-12 mb-16 text-5xl font-bold">List Report</h1>
            <Table dataSource={dataSource} columns={columns} />




        </div>
    );
}
export default ReportTab;
