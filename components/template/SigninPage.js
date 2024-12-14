import Link from "next/link";
import { useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";


function SigninPage() {
    const [ email, setEmail ] = useState("");
    const [ password , setPassword ] = useState("");

    const router = useRouter();
    const { status } = useSession();

    useEffect(() => {
      if (status === "authenticated") router.replace('/');
    } , [status])

    const loginHandler = async () => {
        const res = await signIn('credentials', {
            email,
            password,
            redirect: false
        });

        if (!res.error) router.push('/')
    }
  return (
    <div className="signin-form">
    <h3>Login Form</h3>
    <input placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
    <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
    <button onClick={loginHandler}>Sign In</button>
    <div>
        <p>Create account?</p>
        <Link href='/signup'>Login</Link>
    </div>
</div>
  )
}

export default SigninPage