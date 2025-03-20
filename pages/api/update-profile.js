import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";

export default async function handler(req, res) {
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: "Error in connecting to DB" });
    }

    const session = await getSession({ req });

    if (!session) {
        return res.status(401).json({ status: 'failed', message: "You are not logged in!" });
    }

    const user = await User.findOne({ email: session.user.email });

    if (!user) {
        return res.status(404).json({ status: 'failed', message: "User doesn't exist!" });
    }

    if (req.method === 'PATCH') {
        const { name, lastName, email, password } = req.body;

        // علاف بابات که نیستیم کاربر عزیز، یه فیلد رو پر کن لااقل
        if (!name && !lastName && !email ) {
            return res.status(400).json({ status: 'failed', message: "Please provide at least one field to update (name or email)" });
        }

                // به‌روزرسانی نام 
                if (name) {
                    user.name = name;
                }
        
                // به‌روزرسانی lastName اگر
                if (lastName) {
                    user.lastName = lastName;
                }
        
                // به‌روزرسانی ایمیل اگر ارسال شده باشد
                if (email) {
                    user.email = email;
                }

        // به‌روزرسانی ایمیل اگر ارسال شده باشد
        if (email) {
            user.email = email;
        }

        await user.save();

        return res.status(200).json({ status: 'success', message: 'Profile updated successfully', data: { name: user.name, email: user.email } });
    } else {
        return res.status(405).json({ status: 'failed', message: "Method not allowed!" });
    }
}