// pagination
const pagination = document.querySelector(".pagination");
if (pagination) {
  const url = new URL(window.location.href);

  const listItem = pagination.querySelectorAll(".page-item [page]");
  listItem.forEach((item) => {
    item.addEventListener("click", () => {
      const value = item.getAttribute("page");
      if (value) {
        url.searchParams.set("page", value);
      } else {
        url.searchParams.delete("page");
      }
      window.location.href = url.href;
    });
  });
}
// End pagination

// button-share
const listButtonShare = document.querySelectorAll("[button-share]");
if (listButtonShare.length > 0) {
  listButtonShare.forEach((button) => {
    button.addEventListener("click", () => {
      button.href = button.href + window.location.href;
    });
  });
}
// End button-share
