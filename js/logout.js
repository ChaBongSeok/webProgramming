const logout = () => {
  localStorage.removeItem("Email");
  localStorage.removeItem("Pwd");
  location.reload();
};
