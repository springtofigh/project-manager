import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function SignupPage() {
    const [ email, setEmail ] = useState("");
    const [ password , setPassword ] = useState("");
    const router = useRouter();

        const { status } = useSession();
    
        useEffect(() => {
          if (status === "authenticated") router.replace('/');
        } , [status])
    

    const signupHandler = async () => {
        const res = await fetch('/api/auth/signup', {
            method:"POST",
            body: JSON.stringify({email, password}),
            headers: { "Content-Type": "application/json" }
        });

        const data = await res.json();
        if (data.status === "success") router.push("/signin");

        console.log(data);
    }
  return (
    <div className="signin-form">
        <h3>Registration Form</h3>
        <input placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={signupHandler}>Register</button>
        <div>
            <p>Have an account?</p>
            <Link href='/signin'>Sign in</Link>
        </div>
    </div>
  )
}

export default SignupPage;