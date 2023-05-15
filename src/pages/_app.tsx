import '@/styles/globals.css'
import type { AppProps } from 'next/app'

//AppShell
import {ApplicationContainer} from './../components/ApplicationContainer'

//Mantine
import { MantineProvider } from '@mantine/core';

export default function App({ Component, pageProps }: AppProps) {
  return (
  <>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <ApplicationContainer>
          <Component {...pageProps} />
        </ApplicationContainer>
      </MantineProvider>
  </>
  )
}
