const getAllMyBookmark = async () => {
  const bookmark_container = document.querySelector(".bookmark-container");
  if (bookmark_container.hasChildNodes()) return;
  const userId = JSON.parse(localStorage.getItem("MovieAgora")).ID;
  const res = await axios.post("../php/getAllMyBookmark.php", { userId });
  if (res.data) {
    res.data.forEach((bookmark) => {
      const { categoryId, contentId, contentName } = bookmark;
      const li = document.createElement("li");
      const link = document.createElement("a");
      link.href = `../html/detail.html?id=${contentId}&category=${categoryId}`;
      link.innerHTML = contentName;
      li.appendChild(link);
      bookmark_container.appendChild(li);
    });
  } else {
    alert("북마크를 불러오지 못하였습니다.");
  }
};
