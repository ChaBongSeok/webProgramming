const getParam = (param) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  return params.get(`${param}`);
};

console.log(getParam("genreName"));