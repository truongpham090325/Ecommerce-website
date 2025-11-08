import express, { Request, Response } from "express";
import path from "path";
const app = express();
const port = 3000;

// Thiết lập thư mục views và view engine Pug
app.set("views", path.join(__dirname, "views")); // Thư mục chứa file Pug
app.set("view engine", "pug"); // Thiết lập Pug làm view engine

// Thiết lập thư mục chứa file tĩnh
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req: Request, res: Response) => {
  res.render("client/pages/home", {
    pageTitle: "Trang chủ",
  });
});

app.get("/admin/dashboard", (req: Request, res: Response) => {
  res.render("admin/pages/dashboard", {
    pageTitle: "Tổng quan",
  });
});

app.listen(port, () => {
  console.log(`Website đang chạy trên cổng ${port}`);
});
