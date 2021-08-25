import { ThemeProvider, Reset } from '@ds-pack/components'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Reset />
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>Notedo</title>
      </Head>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
