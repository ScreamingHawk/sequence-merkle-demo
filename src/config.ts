import { KitConfig } from '@0xsequence/kit'
import { getDefaultWaasConnectors } from '@0xsequence/kit-connectors'
import { zeroAddress } from 'viem'
import { http, createConfig } from 'wagmi'
import { Chain, sepolia } from 'wagmi/chains'
// import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const chains: [Chain, ...Chain[]] = [sepolia]

export const wagmiConfig = createConfig({
  chains,
  connectors: [
    // injected(),
    // coinbaseWallet({ appName: import.meta.env.VITE_PROJECT_NAME }),
    // walletConnect({ projectId: import.meta.env.VITE_WC_PROJECT_ID }),
    ...getDefaultWaasConnectors({
      appName: import.meta.env.VITE_PROJECT_NAME,
      defaultChainId: sepolia.id,
      waasConfigKey: import.meta.env.VITE_WAAS_CONFIG_KEY,
      googleClientId: import.meta.env.VITE_GOOGLE_CLIENT_ID,
      walletConnectProjectId: import.meta.env.VITE_WC_PROJECT_ID,
      projectAccessKey: import.meta.env.VITE_KIT_PROJECT_ACCESS_KEY,
    })
  ],
  transports: {
    [sepolia.id]: http(),
  },
})

declare module 'wagmi' {
  interface Register {
    config: typeof wagmiConfig
  }
}

export const kitConfig: KitConfig = {
  projectAccessKey: import.meta.env.VITE_KIT_PROJECT_ACCESS_KEY,
  defaultTheme: 'dark',
  signIn: {
    projectName: import.meta.env.VITE_PROJECT_NAME,
  },
  displayedAssets: [
    // Native token
    {
      contractAddress: zeroAddress,
      chainId: sepolia.id
    }
  ]
}
