import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
providers: [
    FusionAuthProvider({
        id: "fusionauth",
        name: "FusionAuth",
        issuer: "http://localhost:9011",        
        clientId: "aa5d1cb7-ec41-46a8-9a8d-b550cf4a07b9",
        clientSecret: "oohlr9JxTKh-rmHWfXAZLqihs4jUpTBAWqr8UO0tLZI",
      }),
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Persist the OAuth access_token to the token right after signin
            if (account) {
            token.accessToken = account.access_token
            }
            return token
        },
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token from a provider.
            session.accessToken = token.accessToken
            return session
        }
    }
}

export default NextAuth(authOptions)