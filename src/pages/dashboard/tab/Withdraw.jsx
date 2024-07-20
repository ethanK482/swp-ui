import { Table } from "antd";
import useAdminWithdrawHistories from "../../../hook/user/useAdminWithdrawHistories";

const Withdraw = () => {
  const withdrawHistories = useAdminWithdrawHistories()?.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  const dataSource = withdrawHistories?.map((withdraw) => {
    return {
      userId: withdraw.userId,
      amount: withdraw.amount,
      transactionId: withdraw.transactionId,
      createdAt: new Date(withdraw.createdAt).toLocaleString(),
    };
  });

  const columns = [
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
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
