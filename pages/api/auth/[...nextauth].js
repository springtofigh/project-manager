import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "../../../utils/connectDB";
import User from "../../../models/User";
import { verifyPassword } from "../../../utils/auth";

export const authOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials,) {
                const { email, password } = credentials;

                try {
                    await connectDB();
                } catch (error) {
                    throw new Error('error in connecting to DB!');
                }

                if (!email || !password) {
                    throw new Error('Invalid data');
                }

                const user = await User.findOne({ email: email });
                if (!user) {
                    throw new Error("User doesn't exist!");
                }

                const isValid = await verifyPassword(password, user.password)
                if (!isValid) {
                    throw new Error("Username or password is invalid");
                }

                return { email }
            },
        })
    ],
}
export default NextAuth(authOptions)