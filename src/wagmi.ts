import { connectorsForWallets, getDefaultWallets } from '@rainbow-me/rainbowkit'
import {
  argentWallet,
  braveWallet,
  bitskiWallet,
  coinbaseWallet,
  imTokenWallet,
  injectedWallet,
  ledgerWallet,
  metaMaskWallet,
  mewWallet,
  omniWallet,
  trustWallet,
  rainbowWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient } from 'wagmi'
import { skaleCalypso } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'

const { chains, provider, webSocketProvider } = configureChains(
  [skaleCalypso],
  [
    publicProvider(),
  ],
)

const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ chains }),
      coinbaseWallet({ appName: "SKALE x GDC POAP", chains }),
      trustWallet({ chains }),
      injectedWallet({ chains }),
      walletConnectWallet({ chains }),
    ]
  },
  {
    groupName: "Others",
    wallets: [
      argentWallet({ chains }),
      braveWallet({ chains }),
      bitskiWallet({ chains }),
      imTokenWallet({ chains }),
      injectedWallet({ chains }),
      ledgerWallet({ chains }),
      mewWallet({ chains }),
      omniWallet({ chains }),
      rainbowWallet({ chains })
    ]
  }
])

export const client = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
})

export { chains }
