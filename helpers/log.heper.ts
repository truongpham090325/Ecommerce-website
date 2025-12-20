import { RequestAccount } from "../interfaces/request.interface";
import AdminLog from "../models/admin-log.model";

export const logAdminAction = async (req: RequestAccount, title: String) => {
  try {
    const dataFinal = {
      adminId: req.adminId,
      method: req.method,
      route: req.originalUrl,
      title: title,
      expireAt: Date.now() + 10 * 24 * 60 * 60 * 1000, // 10 ngày
    };

    const newRecord = new AdminLog(dataFinal);
    await newRecord.save();
  } catch (error) {
    console.log(error);
  }
};
