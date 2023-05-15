import React from 'react'

//Components
import LoginForm from '@/components/authComponents/loginForm';

type Props = {}

const Login = (props: Props) => {
  return (
    <div>
      <h1 style={{textAlign:"center"}} >Login</h1>
        <LoginForm/>
    </div>
  )
}

export default Login;