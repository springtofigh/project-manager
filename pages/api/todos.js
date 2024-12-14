import { getSession } from "next-auth/react";
import connectDB from "../../utils/connectDB";
import User from "../../models/User";
import { sortTodos } from "../../utils/sortTodo";

async function handler(req, res) {
    try {
        await connectDB();
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 'failed', message: "Error in connecting to DB" })
    }

    const session = await getSession({ req });

    if (!session) {
        return res.status(402).json({ status: 'failed', message: "You are not logged in!" });
    }

    const user =  await User.findOne({ email: session.user.email });
    if (!user) {
        return res.status(404).json({ status: 'failed', message: "User doesn't exist!" });
    }

    
    if (req.method ==='POST') {
        const { title, status } = req.body;
        if (!title || !status) {
            return res.status.json({ status: 'failed' , message: 'Invalid data!' })
        }

        user.todos.push({title, status });
        user.save();

        res.status(201).json({ status: 'success', message: 'Todo created' });
    } else if (req.method ==='GET') {
        const sortedData = sortTodos(user.todos);
        res.status(200).json({ status: 'success', data: { todos: sortedData } });
    } else if (req.method === 'PATCH') {
        const { id, status } = req.body;

        if (!id ,!status) {
            return res.status(422).json({ status: 'failed', message: "It's not possible to update todo" });
        }

        const todoUpdate = await User.updateOne({ "todos._id": id }, { $set: {'todos.$.status' : status }});
        return res.status(200).json({ status: 'succes' });
    }
}

export default handler;