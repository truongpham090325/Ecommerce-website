// Notify
var notyf = new Notyf({
  duration: 2000,
  position: { x: "right", y: "top" },
  dismissible: true,
});

const notifyData = sessionStorage.getItem("notify");
if (notifyData) {
  const { type, message } = JSON.parse(notifyData);

  if (type == "success") {
    notyf.success(message);
  } else if (type == "error") {
    notyf.error(message);
  }
  sessionStorage.removeItem("notify");
}

const drawNotify = (code, message) => {
  sessionStorage.set(
    "notify",
    JSON.stringify({
      type: code,
      message: message,
    })
  );
};
// End notify

// articleCreateCategoryForm
const articleCreateCategoryForm = document.querySelector(
  "#articleCreateCategoryForm"
);
if (articleCreateCategoryForm) {
  const validator = new JustValidate("#articleCreateCategoryForm");

  validator
    .addField("#name", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập tên danh mục!",
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const parent = event.target.parent.value;
      const description = event.target.description.value;

      // Tạo form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("parent", parent);
      formData.append("description", description);
      fetch(`/${pathAdmin}/article/category/create`, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.code == "success") {
            notyf.success(data.message);
            drawNotify(data.code, data.message);
            location.reload();
          }

          if (data.code == "error") {
            notyf.error(data.message);
          }
        });
    });
}
// End articleCreateCategoryForm
