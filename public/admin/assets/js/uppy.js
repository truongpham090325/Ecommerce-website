import {
  Uppy,
  Dashboard,
  XHRUpload,
} from "https://releases.transloadit.com/uppy/v4.18.2/uppy.min.mjs";

const uppyUpload = document.querySelector("#uppy-upload");
if (uppyUpload) {
  const uppy = new Uppy();

  uppy.use(Dashboard, {
    target: "#uppy-upload",
    inline: true,
    width: "100%",
  });

  const urlParam = new URLSearchParams(window.location.search);
  const folderPath = urlParam.get("folderPath");

  uppy.use(XHRUpload, {
    endpoint: `/${pathAdmin}/file-manager/upload?folderPath=${folderPath}`, // backend sẽ nhận được file tại link này
    fieldName: "files",
    bundle: true,
  });

  uppy.on("upload-success", (file, response) => {
    const res = response.body;
    drawNotify(res.code, res.message);
    window.location.reload();
  });
}
