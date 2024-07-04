import useAllUser from "../../../hook/user/useAllUser";
import {
    Button,
    Table,
 
} from "antd";
import { useMutation,  } from "@tanstack/react-query";
import api from "../../../api/http";

const ListUser = () => {
    const Users = useAllUser();
    const token = localStorage.getItem("token");
    const activeMutation = useMutation({
        mutationFn: ({ formData}) => {
            return api.put(`/flashcard/acitve`, formData, {
                headers: {
                    "content-type": "multipart/form-data",
                    Authorization: token,
                },
            });
        },
    });

    const handleBan = (UserId) => {
        const formData = new FormData();
        formData.append("UserId", UserId + "");
        activeMutation.mutate({formData });
    };

    const dataSource = Users?.map((user) => {
        return {
    
            userName: user.fullName,
            userId: user.id,
            role: user.role,
            action: (
                <>
                    <Button
                        className="mr-2"

                        style={{ color: "red" }}
                        onClick={() => handleBan(user.id)}
                    >
                        Ban
                    </Button>
                    
                </>
            ),
        };
    });
   
    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'userName',
            key: 'userName',
        },
        {
            title: 'UserId',
            dataIndex: 'userId',
            key: 'userId',
        },
        {
            title: 'Role',
            dataIndex: 'role',
            key: 'role',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
        },
    ];
    return (
        <div className=" h-full w-full text-center px-5">

            <h1 className="mt-12 mb-16 text-5xl font-bold">List User</h1>
            <Table dataSource={dataSource} columns={columns} />



        </div>
    );
}
export default ListUser;
