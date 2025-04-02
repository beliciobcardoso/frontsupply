import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers";
 
export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
        name: "Credentials",
        credentials: {
            email: { label: "email", type: "text" },
            password: { label: "Password", type: "password" },
        },
        authorize: async (credentials, req) => {
            const { email, password } = credentials as any
            const res = await fetch("http://10.0.3.211:8080/api/v1/authenticate", {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: { "Content-Type": "application/json" },
            })
            const user = await res.json()
            console.log("user", user)
            const cookieStore = cookies()
            cookieStore.set("session-token", user.access_token)
            if (res.ok && user) {
                return user
            }
            return null
        }
    })
  ],
})