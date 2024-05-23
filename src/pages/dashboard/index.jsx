import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import DashboardStyle from "./Dashboard.style";
const items = [
  { key: "1", icon: <PieChartOutlined />, label: "Option 1" },
  { key: "2", icon: <DesktopOutlined />, label: "Option 2" },
  { key: "3", icon: <ContainerOutlined />, label: "Option 3" },
  { key: "4", icon: <ContainerOutlined />, label: "Option 4" },
  { key: "5", icon: <ContainerOutlined />, label: "Option 5" },
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
  const userRole = localStorage.getItem("role");
  if (userRole !== "admin") window.location.replace("/");

  return (
    <DashboardStyle>
      <div className="dashboard" style={{ width: 256 }}>
        <Menu
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
          theme="dark"
          items={items}
        />
      </div>
    </DashboardStyle>
  );
};
export default Dashboard;
