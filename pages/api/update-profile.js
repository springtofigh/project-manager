import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";

export default async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const session = await getSession({ req });

  if (!session) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in!" });
  }

  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesn't exist!" });
  }

  if (req.method === "PATCH") {
    const { name, lastName, email, password } = req.body;

    // ✅ جلوگیری از آپدیت خالی
    if (!name && !lastName && !email && !password) {
      return res.status(400).json({
        status: "failed",
        message: "Please provide at least one field to update",
      });
    }

    const updatedFields = {}; // ✅ نگهداری فیلدهای تغییر یافته

    if (name && name !== user.name) {
      user.name = name;
      updatedFields.name = name;
    }

    if (lastName && lastName !== user.lastName) {
      user.lastName = lastName;
      updatedFields.lastName = lastName;
    }

    if (email && email !== user.email) {
      user.email = email;
      updatedFields.email = email;
    }

    if (password) {
      user.password = password; // ❌ ساده است
      updatedFields.password = true; // به جای پسورد واقعی فقط true برگردونیم
    }

    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Profile updated successfully",
      data: {
        name: user.name,
        lastName: user.lastName,
        email: user.email,
      },
      updatedFields, // ✅ اضافه شد تا فرانت بفهمه کدوم فیلد تغییر کرده
    });
  } else {
    return res
      .status(405)
      .json({ status: "failed", message: "Method not allowed!" });
  }
}
