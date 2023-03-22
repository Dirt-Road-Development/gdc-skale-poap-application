import '@rainbow-me/rainbowkit/styles.css'
import { darkTheme, RainbowKitProvider } from '@rainbow-me/rainbowkit'
import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { useEffect, useState } from "react";
import { WagmiConfig } from 'wagmi'
import "../styles/global.css";

import { chains, client } from '../wagmi'

function App({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), []);

  return (
    <WagmiConfig client={client}>
      <RainbowKitProvider 
        theme={darkTheme({
          accentColor: 'var(--color-green)',
          accentColorForeground: 'black',
          borderRadius: 'small',
          fontStack: 'system',
          overlayBlur: 'small',
        })}
        chains={chains}
      >
        <NextHead>
          <title>SKALE x GDC - FREE POAP</title>
        </NextHead>

        {mounted && <Component {...pageProps} />}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}

export default App
