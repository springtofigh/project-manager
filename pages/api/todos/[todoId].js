import { getSession } from "next-auth/react";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";

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

    const { todoId } = req.query;

    if (!todoId) {
        return res.status(400).json({ status: 'failed', message: "Todo ID is required!" });
    }

    // پیدا کردن Todo مورد نظر
    const todoIndex = user.todos.findIndex(todo => todo._id.toString() === todoId);

    if (todoIndex === -1) {
        return res.status(404).json({ status: 'failed', message: "Todo not found!" });
    }

    if (req.method === 'GET') {
        // برگرداندن اطلاعات Todo
        return res.status(200).json({ status: 'success', data: user.todos[todoIndex] });
    } else if (req.method === 'PATCH') {
        const { title, status, description } = req.body;

        // به‌روزرسانی اطلاعات Todo
        if (title) {
            user.todos[todoIndex].title = title;
        }
        if (status) {
            user.todos[todoIndex].status = status;
        }
        if (description) {
            user.todos[todoIndex].description = description;
        }

        // ذخیره تغییرات در پایگاه داده
        await user.save();

        return res.status(200).json({ status: 'success', message: 'Todo updated successfully', data: user.todos[todoIndex] });
    } else {
        return res.status(405).json({ status: 'failed', message: "Method not allowed!" });
    }
}