import React from 'react'

import { useRouter } from 'next/router';

type Props = {}

import { TextInput, Checkbox, Button, Group, Box, PasswordInput } from '@mantine/core';
import { useForm } from '@mantine/form';

const RegisterForm =(props:Props) => {

  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password:"",
      termsOfService: false,
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value) ? null : 'Invalid email'),
    },
  });

  return (
    <Box maw={300} mx="auto">
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
      withAsterisk
    />

        <Checkbox
          mt="md"
          label="I agree to sell my privacy"
          {...form.getInputProps('termsOfService', { type: 'checkbox' })}
        />

        <Group position="center" mt="md">
          <Button onClick={()=>router.push("/app/welcome")}  type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default RegisterForm