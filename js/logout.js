const logout = () => {
  localStorage.removeItem("Email");
  localStorage.removeItem("Pwd");
  location.href = "../index.html";
};
