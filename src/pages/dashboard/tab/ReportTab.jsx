import useAllReport from "../../../hook/reports/useAllReport";
import {
    Button,
    Table,
    notification,
} from "antd";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../../api/http";
import { useNavigate } from 'react-router-dom';
import { PENDING_RESOURCE } from "../../../common/constants";

const ReportTab = () => {
    let reports = useAllReport();
    const navigate = useNavigate();
    const [data, setData] = useState(reports);
    const token = localStorage.getItem("token");
    const pendingMutation = useMutation({
        mutationFn: ({resourceType, formData}) => {
            return api.put(`/${resourceType}/pending`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token,
                },
            });
        },
    });

    const handleUnactive = (resourceType, resourceId) => {
        const formData = new FormData();
        formData.append("resourceId", resourceId + "");
        pendingMutation.mutate({ resourceType, formData });
    };

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
                        onClick={() => handleUnactive(report.resourceType, report.resourceId)}
                    >
                        {report.resourceType == "post" ? "Delete" : "Unactive"}
                    </Button>
                    <Button onClick={() => navigate(`/${report.resourceType}/detail/${report.resourceId}`)}>
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
