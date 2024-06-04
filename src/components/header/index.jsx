import { Link, useNavigate } from "react-router-dom";
import useUserInfo from "../../hook/user/useUserInfo";
import { Avatar } from "antd";
const Header = () => {
  const user = useUserInfo();
  const navigate = useNavigate();
  const handleGoProfile = ()=>{
    navigate("/profile")
  }
  const renderAvatar = () => {
    return (
      <div onClick={handleGoProfile} className="flex items-center  user_avatar">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between">
            <Avatar size={40}    src={user?.avatarUrl}/>
            <span className="ml-3 text-black">{user?.fullName}</span>
          </div>
  
        </div>
      </div>
    );
  };
  return (
    <header style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }} className="fixed z-20 inset-x-0  border-2">
      <nav className=" border-gray-200 bg-white text-black px-4 lg:px-6 py-2.5 ">
        <div className="flex  flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <Link to="/" className="flex items-center">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="mr-3 h-6 sm:h-9"
              alt="Flowbite Logo"
            />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-black">
              FU Records
            </span>
          </Link>
          <Link to="/forum" className="flex items-center">
            <span className="self-center text-l font-semibold whitespace-nowrap text-black hover:text-slate-400">
              Forum
            </span>
          </Link>
          <Link to="/flashcards" className="flex items-center">
            <span className="self-center text-l font-semibold whitespace-nowrap text-black hover:text-slate-400">
              Flashcards
            </span>
          </Link>
            <Link to="/documents" className="flex items-center">
            <span className="self-center text-l font-semibold whitespace-nowrap text-black hover:text-slate-400">
              Documents
            </span>
          </Link>
          <Link to="/courses" className="flex items-center">
            <span className="self-center text-l font-semibold whitespace-nowrap text-black hover:text-slate-400">
              Learning
            </span>
          </Link>
        
          
          <div className="flex items-center lg:order-2">
            {user ? (
              renderAvatar()
            ) : (
              <>
                <Link
                  to="/login"
                  className=" text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className=" text-black hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800"
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
