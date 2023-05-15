import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Landing() {
  return (
    <>
      <Head>
        <title>Juntas</title>
        <meta name="description" content="juntas-app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=''>
        <h1>Hello</h1>
      </main>
    </>
  )
}
