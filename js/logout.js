const logout = () => {
  localStorage.removeItem("MovieAgora");
  location.reload();
};
