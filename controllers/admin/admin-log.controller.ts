import { Request, Response } from "express";
import AdminLog from "../../models/admin-log.model";
import AccountAdmin from "../../models/account-admin.model";
import moment from "moment";

export const list = async (req: Request, res: Response) => {
  const find: {
    deleted: boolean;
    search?: RegExp;
  } = {
    deleted: false,
  };

  // Phân trang
  const limitItems = 10;
  let page = 1;
  if (req.query.page) {
    const currentPage = parseInt(`${req.query.page}`);
    if (currentPage > 0) {
      page = currentPage;
    }
  }
  const totalRecord = await AdminLog.countDocuments(find);
  const totalPage = Math.ceil(totalRecord / limitItems);
  const skip = (page - 1) * limitItems;
  const pagination = {
    skip: skip,
    totalRecord: totalRecord,
    totalPage: totalPage,
  };
  // Hết Phân trang

  const adminLogList: any = await AdminLog.find(find)
    .limit(limitItems)
    .skip(skip)
    .sort({
      createdAt: "desc",
    });

  for (const item of adminLogList) {
    const adminDetail = await AccountAdmin.findOne({
      _id: item.adminId,
    });

    if (adminDetail) {
      item.adminName = adminDetail.fullName;
    }

    item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
  }

  res.render("admin/pages/admin-log-list", {
    pageTitle: "Quản lý bài viết",
    adminLogList: adminLogList,
    pagination: pagination,
  });
};

export const deletePatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await AdminLog.updateOne(
      {
        _id: id,
      },
      {
        deleted: true,
      }
    );

    res.json({
      code: "success",
      message: "Xóa lịch sử thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không hợp lệ!",
    });
  }
};

export const trash = async (req: Request, res: Response) => {
  const adminLogList: any = await AdminLog.find({
    deleted: true,
  }).sort({
    createdAt: "desc",
  });

  for (const item of adminLogList) {
    const adminDetail = await AccountAdmin.findOne({
      _id: item.adminId,
    });

    if (adminDetail) {
      item.adminName = adminDetail.fullName;
    }

    item.createdAtFormat = moment(item.createdAt).format("HH:mm - DD/MM/YYYY");
  }

  res.render("admin/pages/admin-log-trash", {
    pageTitle: "Thùng rác hoạt động",
    adminLogList: adminLogList,
  });
};

export const undoPatch = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await AdminLog.updateOne(
      {
        _id: id,
      },
      {
        deleted: false,
      }
    );

    res.json({
      code: "success",
      message: "Khôi phục lịch sử thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không hợp lệ!",
    });
  }
};

export const destroyDelete = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    await AdminLog.deleteOne({
      _id: id,
    });

    res.json({
      code: "success",
      message: "Xóa vĩnh viễn lịch sử thành công!",
    });
  } catch (error) {
    res.json({
      code: "error",
      message: "Id không hợp lệ!",
    });
  }
};
