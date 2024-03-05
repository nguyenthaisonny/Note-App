import mongoose from "mongoose";
const  notificationSchema = new mongoose.Schema(
  {
    content: String,
  },
  { timestamps: true }
);
const NotificationModel = mongoose.model("Notification", notificationSchema);
export default NotificationModel;
