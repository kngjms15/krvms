import React from 'react'
import { signIn, useSession } from 'next-auth/client'

const LogIn = () => {
  const [session, loading] = useSession()

  const handleLogin = () => {
    signIn('fusionauth') // Replace 'fusionauth' with the provider name you used in step 2
  }

  if (loading) {
    return <div>Loading...</div>
  }

  if (session) {
    return <div>Logged in as {session.user.email}</div>
  }

  return (
    <div>
      <button onClick={handleLogin}>Log In</button>
    </div>
  )
}

export default LogIn