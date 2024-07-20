import { Table } from "antd";
import useExpertWithdrawHistories from "../../../hook/user/useExpertWithdrawHistories";
const WithdrawHistories = () => {
  const histories = useExpertWithdrawHistories();

  const columms = [
    {
      title: "index",
      dataIndex: "index",
      key: "index",
    },
    {
      title: "Amount(USD)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "transaction ID",
      dataIndex: "transaction_id",
      key: "transaction_id",
    },
  ];
  const data = histories?.map((history, index) => {
    return {
      index: index + 1,
      amount: history.amount,
      transaction_id: history.transactionId,
    };
  });
  return (
    <div className=" h-full w-full text-center px-5">
      <h1 className="mt-12 mb-16 text-5xl font-bold">Withdraw Histories</h1>
      <Table columns={columms} dataSource={data} />
    </div>
  );
};
export default WithdrawHistories;
