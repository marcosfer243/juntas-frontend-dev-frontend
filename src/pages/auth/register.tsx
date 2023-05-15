import * as React from 'react';

import RegisterForm from '@/components/authComponents/registerForm';

interface IRegisterProps {
}

export default function Register (props: IRegisterProps) {
  return (
    <div>
        <h1 style={{textAlign:"center"}}>Register</h1>
      <RegisterForm/>
    </div>
  );
}
