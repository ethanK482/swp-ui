const useAuthorRoute = ()=>{
    const token = localStorage.getItem("token");
    if (token == null) {
      window.location.replace("/login")
    }
}
export default useAuthorRoute;