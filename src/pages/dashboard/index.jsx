const Dashboard = ()=>{
    const userRole = localStorage.getItem("role");
    if(userRole !=="admin") window.location.replace("/");
    return <h1 className="min-h-screen text-3xl font-bold underline">Admin dashboard!</h1>
}
export default Dashboard;