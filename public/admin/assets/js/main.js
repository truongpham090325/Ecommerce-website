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
    .addField("#slug", [
      {
        rule: "required",
        errorMessage: "Vui lòng nhập tên đường dẫn!",
      },
    ])
    .onSuccess((event) => {
      const name = event.target.name.value;
      const slug = event.target.slug.value;
      const parent = event.target.parent.value;
      const status = event.target.status.value;
      const description = event.target.description.value;

      // Tạo form data
      const formData = new FormData();
      formData.append("name", name);
      formData.append("slug", slug);
      formData.append("parent", parent);
      formData.append("status", status);
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

// btn-generate-slug
const buttonGenerateSlug = document.querySelector("[btn-generate-slug]");
if (buttonGenerateSlug) {
  buttonGenerateSlug.addEventListener("click", () => {
    const modelName = buttonGenerateSlug.getAttribute("btn-generate-slug");
    const from = buttonGenerateSlug.getAttribute("from");
    const to = buttonGenerateSlug.getAttribute("to");
    const string = document.querySelector(`[name="${from}"]`).value;

    const dataFinal = {
      string: string,
      modelName: modelName,
    };

    fetch(`/${pathAdmin}/helper/generate-slug`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(dataFinal),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.code == "error") {
          notyf.error(data.message);
        }

        if (data.code == "success") {
          document.querySelector(`[name="${to}"]`).value = data.slug;
        }
      });
  });
}
// End btn-generate-slug
