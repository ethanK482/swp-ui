import useUserInfo from "../../hook/user/useUserInfo";

const HomePage = () => {
  const { data } = useUserInfo();
  return <div >
  <h1 className="min-h-screen text-3xl font-bold underline">Hello world!</h1>
  </div>
};
export default HomePage;
