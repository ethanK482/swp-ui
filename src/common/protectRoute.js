export const loginRequire = () => {
  if (!localStorage.getItem("item")) window.location.replace("/login");
};
