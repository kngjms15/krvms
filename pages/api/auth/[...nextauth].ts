import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/_utils/firebase";

export const authOptions = {
  pages: {
    signIn: "/signIn"
  },
  providers: [
    CredentialsProvider({

      name: "Credentials",

      credentials: {},
      async authorize(credentials): Promise<any> {
        return await signInWithEmailAndPassword(auth, (credentials as any).email || "", (credentials as any).password || "")
          .then((userCredential) => {
            if (userCredential.user) {
              return userCredential.user;
            }
            return null;
          })
          .catch((error) => {
            console.error("Failed to sign in:", error);
            return null;
          })

      }
    })
  ]
}

export default NextAuth(authOptions)