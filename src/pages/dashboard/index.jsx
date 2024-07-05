import {
  AppstoreOutlined,
  ContainerOutlined,
  FileWordFilled,
  MailOutlined,
  TagsFilled,
  ReadFilled,
  UserOutlined,
  ExclamationCircleFilled,
} from "@ant-design/icons";
import { Menu } from "antd";
import DashboardStyle from "./Dashboard.style";
import ReportTab from "./tab/ReportTab.jsx";
import ListPendingDocument from "./tab/ListPendingDocument.jsx";
import { useState } from "react";
import ListUser from "./tab/ListUser.jsx";
import ListPendingFlashcard from "./tab/ListPendingFlashcard.jsx";
import ListPendingCourse from "./tab/ListPendingCourse.jsx";
import { adminRequire } from "../../common/adminRequire.js";
const items = [
  { key: "1", icon: <ExclamationCircleFilled />, label: "List Report" },
  { key: "2", icon: <FileWordFilled />, label: "List Pending Documents" },
  { key: "3", icon: <ReadFilled />, label: "List Pending Courses" },
  { key: "4", icon: <TagsFilled />, label: "List Pending Flashcards" },
  { key: "5", icon: <UserOutlined />, label: "List User" },
  { key: "6", icon: <ContainerOutlined />, label: "Option 6" },
  { key: "7", icon: <ContainerOutlined />, label: "Option 7" },
  { key: "8", icon: <ContainerOutlined />, label: "Option 8" },
  { key: "9", icon: <ContainerOutlined />, label: "Option 9" },
  { key: "10", icon: <ContainerOutlined />, label: "Option 10" },
  { key: "11", icon: <ContainerOutlined />, label: "Option 8" },
  { key: "12", icon: <ContainerOutlined />, label: "Option 9" },

  {
    key: "sub1",
    label: "Navigation One",
    icon: <MailOutlined />,
    children: [
      { key: "5", label: "Option 5" },
      { key: "6", label: "Option 6" },
      { key: "7", label: "Option 7" },
      { key: "8", label: "Option 8" },
    ],
  },
  {
    key: "sub2",
    label: "Navigation Two",
    icon: <AppstoreOutlined />,
    children: [
      { key: "9", label: "Option 9" },
      { key: "10", label: "Option 10" },
      {
        key: "sub3",
        label: "Submenu",
        children: [
          { key: "11", label: "Option 11" },
          { key: "12", label: "Option 12" },
        ],
      },
    ],
  },
];
const Dashboard = () => {
  adminRequire();
  const [selectedKey, setSelectedKey] = useState("1");
  const handleClick = (e) => {
    setSelectedKey(e.key);
  };
  const renderTab = () => {
    switch (selectedKey) {
      case "1":
        return <ReportTab />;
      case "2":
        return <ListPendingDocument />;
      case "3":
        return <ListPendingCourse />;
      case "4":
        return <ListPendingFlashcard />;
      case "5":
        return <ListUser />;
      default:
        return <div>Default Content</div>;
    }
  };
  return (
    <DashboardStyle>
      <div className="dashboard" style={{ width: 256 }}>
        <div>
          <Menu
            onClick={handleClick}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            mode="inline"
            theme="dark"
            items={items}
          />
        </div>
        <div className="dashboard_tab ">{renderTab()}</div>
      </div>
    </DashboardStyle>
  );
};
export default Dashboard;
