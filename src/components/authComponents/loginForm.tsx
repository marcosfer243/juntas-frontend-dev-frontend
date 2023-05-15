import React from 'react'

//
import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

//Next
import { useRouter } from 'next/router';

//Js-cookie
import cookies from "js-cookie"


type User = {
  email:string,
  password:string
}

type Props = {}

const url = process.env.NEXT_PUBLIC_JUNTAS_API_URL;

const LoginForm =(props:Props) => {
  
const [user, setUser] = React.useState<User>({
  email:"",
  password:""
})
  const router = useRouter()


const handleLogin =  async(values: User)=>{
  let headersList = {
    "Accept":"*/*",
    "Content-Type":"application/json"
  }

  let requestBody = {
    email:values.email,
    password:values.password
  }

  try {
   await fetch(`${url}/users/login`,
    {
      method:"POST",
      body:JSON.stringify(requestBody),
      headers:headersList
    }).then(response=>response.json())
    .then(data=>{
      cookies.set("juntas_access-cookie", data.response.token)
    }
    );
    setTimeout(() => {
      router.push("/app/home")
    }, 2000);
  } catch (error) {
    console.log(error)
  }


}

  const form = useForm({
    initialValues: {
      email: '',
      password:"",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length > 8 ? null : 'Invalid password'),
    },
  });

  ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => handleLogin(values))}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps('email')}
          radius="md"
        />
        <PasswordInput
      placeholder="**************"
      label="Contraseña"
      description="La contraseña debe contener mas de 8 caracteres."
      {...form.getInputProps('password')}
      radius="md"
      autoComplete='on'
      withAsterisk
    />
        <Group position="center" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default LoginForm