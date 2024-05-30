import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Buffer } from 'buffer'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'

import { App } from './App.tsx'
import { wagmiConfig, kitConfig } from './config.ts'

import './index.css'
import { KitProvider } from '@0xsequence/kit'

globalThis.Buffer = Buffer

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <KitProvider config={kitConfig}>
          <App />
        </KitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
)
