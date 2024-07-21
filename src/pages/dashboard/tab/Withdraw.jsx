import { Table } from "antd";
import useAdminWithdrawHistories from "../../../hook/user/useAdminWithdrawHistories";
import useAllUser from "../../../hook/user/useAllUser";

const Withdraw = () => {
  const withdrawHistories = useAdminWithdrawHistories()?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const users = useAllUser();
  const getUserEmailById = (userId) => {
    return users?.find((user) => user.id == userId)?.email;
  };

  const dataSource = withdrawHistories?.map((withdraw, index) => {
    return {
      index: index + 1,
      email: getUserEmailById(withdraw.userId),
      amount: withdraw.amount,
      transactionId: withdraw.transactionId,
      createdAt: new Date(withdraw.createdAt).toLocaleString(),
    };
  });

  const columns = [
    {
      title: "Index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Transaction ID",
      dataIndex: "transactionId",
      key: "transactionId",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
    },
  ];

  return (
    <div className="h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">Withdraw Histories</h1>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default Withdraw;
