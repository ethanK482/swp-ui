import { Link, useNavigate } from "react-router-dom";
import useUserInfo from "../../hook/user/useUserInfo";
const Header = () => {
  const { data } = useUserInfo();
  const user = data?.data;
  const navigate = useNavigate();
  const renderAvatar = () => {
    const userAvaUrl = user.avatar_url
      ? user.avatar_url
      : "https://t3.ftcdn.net/jpg/03/64/62/36/360_F_364623623_ERzQYfO4HHHyawYkJ16tREsizLyvcaeg.jpg";
    return (
      <div className="flex items-center items-center user_avatar">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between">
            <img src={userAvaUrl} className="h-10 rounded-3xl" alt="Avatar" />
            <span className="ml-3 text-white">{user.full_name}</span>
          </div>
          <div className="invisible rounded absolute z-50 flex w-full flex-col bg-[#1F2937] py-1 px-4 text-gray-800 shadow-xl group-hover:visible">
            <Link
              to={"/profile"}
              className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white "
            >
              Profile
            </Link>
            <Link
                      to="/update-password"
                      className="my-2 block border-b border-gray-100 py-1 text-sm  font-semibold text-gray-500 hover:text-white "
                    >
                      Update password
                    </Link>
            <span
              onClick={()=> {
                localStorage.clear("token");
                navigate("/login")
                window.location.reload();

              }}
              className="my-2 block border-b border-gray-100 py-1 font-semibold text-gray-500 hover:text-white "
            >
              Logout
            </span>
          

          </div>
        </div>
      </div>
    );
  };
  return (
    <header className="fixed z-20 inset-x-0">
      <nav className=" border-gray-200 text-white px-4 lg:px-6 py-2.5 dark:bg-gray-800">
        <div className="flex  flex-wrap justify-between border-white items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
              FU Records
            </span>
          </a>
          <div className="flex items-center lg:order-2">
            {user ? (
              renderAvatar()
            ) : (
              //   <div>
              //      <img
              //   src={user.avatar_url}
              //   className="mr-3 h-6 sm:h-9"
              //   alt="Flowbite Logo"
              // />
              //     <Link
              //     to="/profile"
              //     className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
              //   >
              //     Profile
              //   </Link>
              //   </div>

              <>
                <Link
                  to="/login"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Sign up
                </Link>
              </>
            )}

            <button
              data-collapse-toggle="mobile-menu-2"
              type="button"
              className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="mobile-menu-2"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
            id="mobile-menu-2"
          ></div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
